import fs from 'fs'
import path from 'path'
import { docRoutes } from '../src/routes/docs'

type NavItem = {
  title?: string
  href?: string
  toMenu?: 'docs' | 'appCatalog' | 'plural'
  icon?: any
  sections?: NavItem[]
}

type NavMenu = NavItem[]

// List of known acronyms and special cases
const SPECIAL_CASES: Record<string, string> = {
  'ai': 'AI',
  'pr': 'PR',
  'api': 'API',
  'cli': 'CLI',
  'ca': 'CA',
  'rbac': 'RBAC',
  'scm': 'SCM',
  'oidc': 'OIDC',
  'mgmt': 'Management',
  'crds': 'CRDs',
} as const

function stripNumericPrefix(text: string): string {
  // Remove leading numbers followed by hyphen or dot (e.g., "01-", "02.", "1-", "2.")
  return text.replace(/^(\d+[-.])?/, '')
}

function formatTitle(text: string): string {
  // Strip numeric prefix first
  text = stripNumericPrefix(text)
  
  // Split by hyphens and handle each part
  return text
    .split('-')
    .map(part => {
      // Check for special cases first
      const lowerPart = part.toLowerCase()
      if (SPECIAL_CASES[lowerPart]) {
        return SPECIAL_CASES[lowerPart]
      }

      // Regular case: capitalize first letter of each word
      return part
        .split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
        .join(' ')
    })
    .join(' ')
}

function normalizePathForComparison(filePath: string): string {
  // Remove file extensions and normalize slashes
  return filePath
    .replace(/\.(md|mdoc|tsx?)$/, '')
    .replace(/\/index$/, '')
    .replace(/\\/g, '/')
    .replace(/^\/+/, '')
    .replace(/\/+$/, '')
}

function getTitle(filePath: string): string {
  // Normalize the path for comparison with docRoutes
  const normalizedPath = normalizePathForComparison(filePath)
  
  // Get title from docRoutes if available
  const route = Object.values(docRoutes).find(r => 
    normalizePathForComparison(r.path) === normalizedPath
  )
  
  if (route?.title) {
    return route.title
  }

  // Otherwise generate from path
  const basename = path.basename(filePath, path.extname(filePath))
  return basename === 'index'
    ? formatTitle(path.basename(path.dirname(filePath)))
    : formatTitle(basename)
}

function normalizeHref(href: string): string {
  // Split path into segments
  const segments = href.split('/')
  
  // Process each segment to remove numeric prefixes
  const processedSegments = segments.map(segment => {
    // Don't process empty segments or segments that start with special characters
    if (!segment || segment.startsWith('.') || segment.startsWith('_') || segment.startsWith('[')) {
      return segment
    }
    return stripNumericPrefix(segment)
  })
  
  // Rejoin the segments
  href = processedSegments.join('/')
  
  // Ensure href starts with /
  if (!href.startsWith('/')) {
    href = '/' + href
  }
  
  // Remove file extensions
  href = href.replace(/\.(md|mdoc|tsx?)$/, '')
  
  // Remove /index at the end
  href = href.replace(/\/index$/, '')
  
  // Replace backslashes with forward slashes
  href = href.replace(/\\/g, '/')
  
  // Remove any double slashes
  href = href.replace(/\/+/g, '/')
  
  // Remove trailing slash
  href = href.replace(/\/$/, '')
  
  return href
}

function validateNavItem(item: NavItem, itemPath: string): void {
  if (!item.title) {
    console.warn(`Warning: Missing title for item at ${itemPath}`)
  }
  
  if (!item.href && !item.sections) {
    console.warn(`Warning: Item at ${itemPath} has neither href nor sections`)
  }

  if (item.href === undefined) {
    console.warn(`Warning: Undefined href for item at ${itemPath}`)
  }
  
  if (item.sections) {
    item.sections.forEach((subItem, index) => {
      validateNavItem(subItem, `${itemPath} -> section[${index}]`)
    })
  }
}

function isNextSpecialFile(filename: string): boolean {
  return (
    filename.startsWith('_') ||      // Next.js special files (_app, _document, etc)
    filename === '404.tsx' ||        // Error page
    filename === '[...slug].tsx' ||  // Dynamic catch-all route
    filename === 'sitemap.xml.ts'    // Generated sitemap
  )
}

function isContentFile(filename: string): boolean {
  return (
    filename.endsWith('.md') ||
    filename.endsWith('.mdoc') ||
    (filename.endsWith('.tsx') && filename !== '[...slug].tsx' && !isNextSpecialFile(filename))
  )
}

function buildNavStructure(dirPath: string, basePath: string = ''): NavItem[] {
  const items: NavItem[] = []
  const entries = fs.readdirSync(dirPath, { withFileTypes: true })

  // Sort entries to process index files first
  const sortedEntries = entries.sort((a, b) => {
    if (a.name === 'index.md' || a.name === 'index.mdoc' || a.name === 'index.tsx') return -1
    if (b.name === 'index.md' || b.name === 'index.mdoc' || b.name === 'index.tsx') return 1
    return a.name.localeCompare(b.name)
  })

  // Check if directory has an index file
  const hasIndex = sortedEntries.some(entry => 
    entry.isFile() && (entry.name === 'index.md' || entry.name === 'index.mdoc' || entry.name === 'index.tsx')
  )

  for (const entry of sortedEntries) {
    // Skip hidden files, Next.js special files, and non-content files
    if (entry.name.startsWith('.') || isNextSpecialFile(entry.name)) {
      continue
    }

    const fullPath = path.join(dirPath, entry.name)
    const relativePath = path.join(basePath, entry.name)

    if (entry.isDirectory()) {
      const subItems = buildNavStructure(fullPath, relativePath)
      // Create directory item even if it only has an index file
      const dirItem: NavItem = {
        title: getTitle(relativePath),
        href: normalizeHref(relativePath)
      }
      
      if (subItems.length > 0) {
        dirItem.sections = subItems
      }
      
      items.push(dirItem)
    } else if (isContentFile(entry.name)) {
      // Skip index files as they're handled with directories
      if (entry.name === 'index.md' || entry.name === 'index.mdoc' || entry.name === 'index.tsx') {
        continue
      }

      const item: NavItem = {
        title: getTitle(relativePath),
        href: normalizeHref(relativePath)
      }

      // Extra validation to catch undefined hrefs
      if (!item.href) {
        console.warn(`Warning: Generated undefined href for ${relativePath}`)
      }

      items.push(item)
    }
  }

  return items
}

function generateNavData() {
  const pagesDir = path.join(process.cwd(), 'pages')
  const navStructure = buildNavStructure(pagesDir)

  // Validate the entire structure
  navStructure.forEach((item, index) => {
    validateNavItem(item, `root[${index}]`)
  })

  // Debug output of the structure
  console.log('Generated nav structure:', JSON.stringify(navStructure, null, 2))

  const output = `import type { ReactElement } from 'react'
import deepFreeze from 'deep-freeze'
import { APP_CATALOG_BASE_URL } from './consts/routes'
import type { Repo } from './data/getRepos'

export type NavMenuId = 'docs' | 'appCatalog'
export type MenuId = NavMenuId | 'plural'
export type NavData = Record<NavMenuId, NavMenu>

export type NavItem = {
  title?: string
  href?: string
  toMenu?: MenuId
  icon?: ReactElement
  sections?: NavItem[]
}

export type NavMenu = NavItem[]

export function findNavItem(
  test: (arg: NavItem) => boolean,
  section: NavMenu
): NavItem | null {
  for (const item of section) {
    if (test(item)) {
      return item
    }

    const search = findNavItem(test, item.sections || [])

    if (search) {
      return search
    }
  }

  return null
}

const rootNavData: NavMenu = deepFreeze(${JSON.stringify(navStructure, null, 2)})

export const getNavData = ({ repos }: { repos: Repo[] }): NavData => ({
  docs: rootNavData,
  appCatalog: [
    {
      title: 'Application Catalog',
      href: APP_CATALOG_BASE_URL,
      sections: [
        { title: 'Catalog Overview', href: APP_CATALOG_BASE_URL },
        ...repos.map((repo) => ({
          title: repo.displayName,
          href: \`\${APP_CATALOG_BASE_URL}/\${repo.name}\`,
        })),
      ],
    },
  ],
})
`

  fs.writeFileSync(path.join(process.cwd(), 'src/NavData.tsx'), output)
  console.log('Successfully generated NavData.tsx')
}

generateNavData() 