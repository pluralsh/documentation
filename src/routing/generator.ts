import fs from 'fs'
import path from 'path'

import matter from 'gray-matter'

import {
  type DocRoute,
  type DocRouteMap,
  type NavItem,
  type NavMenu,
} from './types'

// Special case formatting for known acronyms and terms
const SPECIAL_CASES: Record<string, string> = {
  ai: 'AI',
  pr: 'PR',
  api: 'API',
  cli: 'CLI',
  ca: 'CA',
  rbac: 'RBAC',
  scm: 'SCM',
  oidc: 'OIDC',
  mgmt: 'Management',
  crds: 'CRDs',
} as const

// Utility to convert path to route ID
function pathToId(filePath: string): string {
  return filePath
    .replace(/^pages\//, '')
    .replace(/\.md$/, '')
    .replace(/\/index$/, '')
    .replace(/\d+-/g, '') // Remove numeric prefixes from all path segments
    .replace(/[/-]/g, '_')
    .toLowerCase()
}

// Utility to convert path to route path
function normalizeRoutePath(filePath: string): string {
  return `/${filePath
    .replace(/^pages\//, '')
    .replace(/\.md$/, '')
    .replace(/\/index$/, '')}`
}

// Get all markdown files recursively
function getAllMarkdownFiles(dir: string): string[] {
  const files: string[] = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  // First check for index.md in current directory
  const indexEntry = entries.find((e) => e.isFile() && e.name === 'index.md')

  if (indexEntry) {
    files.push(path.join(dir, 'index.md'))
  }

  // Then process other entries
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)

    if (
      entry.isDirectory() &&
      !entry.name.startsWith('_') &&
      !entry.name.startsWith('.')
    ) {
      files.push(...getAllMarkdownFiles(fullPath))
    } else if (
      entry.isFile() &&
      entry.name.endsWith('.md') &&
      entry.name !== 'index.md'
    ) {
      files.push(fullPath)
    }
  }

  return files
}

// Format title from text
function formatTitle(text: string): string {
  // Remove numeric prefixes
  text = text.replace(/^\d+[-.]/, '')

  // Split by hyphens and handle each part
  return text
    .split('-')
    .map((part) => {
      // Check for special cases first
      const lowerPart = part.toLowerCase()

      if (SPECIAL_CASES[lowerPart]) {
        return SPECIAL_CASES[lowerPart]
      }

      // Regular case: capitalize first letter of each word
      return part
        .split(' ')
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(' ')
    })
    .join(' ')
}

// Get title from frontmatter or filename
function getTitle(filePath: string, content: string): string {
  const { data } = matter(content)

  if (data.title) return data.title

  // Fall back to filename
  const basename = path.basename(filePath, '.md')

  return basename === 'index'
    ? formatTitle(path.basename(path.dirname(filePath)))
    : formatTitle(basename)
}

// Validate a route
function validateRoute(route: DocRoute): string[] {
  const errors: string[] = []

  if (!route.path) errors.push('Missing path')
  if (!route.title) errors.push('Missing title')
  if (!route.id) errors.push('Missing id')

  // Check if file exists
  const possiblePaths = [
    path.join(process.cwd(), 'pages', `${route.path}.md`),
    path.join(process.cwd(), 'pages', route.path, 'index.md'),
    path.join(process.cwd(), 'pages', route.path),
  ]

  if (!possiblePaths.some((p) => fs.existsSync(p))) {
    errors.push(`No file found for path: ${route.path}`)
  }

  return errors
}

// Generate routes from markdown files
function generateRoutes(
  pagesDir: string,
  existingRoutes: DocRouteMap = {}
): DocRouteMap {
  const files = getAllMarkdownFiles(pagesDir)
  const newRoutes: DocRouteMap = {}
  const existingRoutesByPath = new Map<string, [string, DocRoute]>()
  const existingRoutesByTitle = new Map<string, [string, DocRoute]>()
  const errors: Record<string, string[]> = {}

  // Index existing routes by path and title for quick lookup
  Object.entries(existingRoutes).forEach(([key, route]) => {
    existingRoutesByPath.set(route.path, [key, route])
    existingRoutesByTitle.set(route.title, [key, route])
  })

  // Generate new routes while preserving existing metadata
  files.forEach((file) => {
    const relativePath = path.relative(pagesDir, file)
    const routePath = normalizeRoutePath(relativePath)
    const content = fs.readFileSync(file, 'utf8')
    const title = getTitle(relativePath, content)

    // First try to find existing route by path
    let existing = existingRoutesByPath.get(routePath)

    // If not found by path, try to find by title to handle moved files
    if (!existing) {
      existing = existingRoutesByTitle.get(title)
    }

    if (existing) {
      // Update existing route with new path but preserve ID and other metadata
      const [key, route] = existing

      newRoutes[key] = {
        ...route,
        path: routePath, // Update path
        title, // Update title
      }

      // Validate existing route
      const routeErrors = validateRoute(newRoutes[key])

      if (routeErrors.length > 0) {
        errors[key] = routeErrors
      }
    } else {
      // Create new route with stable ID
      const id = pathToId(relativePath)
      const newRoute: DocRoute = {
        path: routePath,
        title,
        id,
      }

      // Validate new route
      const routeErrors = validateRoute(newRoute)

      if (routeErrors.length > 0) {
        errors[id] = routeErrors
      } else {
        newRoutes[id] = newRoute
      }
    }
  })

  // Print validation errors
  if (Object.keys(errors).length > 0) {
    console.error('\nRoute validation errors:')
    for (const [key, routeErrors] of Object.entries(errors)) {
      console.error(`\n${key}:`)
      routeErrors.forEach((error) => console.error(`  - ${error}`))
    }
    throw new Error('Invalid route configuration')
  }

  return newRoutes
}

// Get title from index file if it exists
function getTitleFromIndex(
  currentPath: string,
  routes: DocRouteMap
): string | null {
  // Check if there's a matching route with /index
  const indexRoute = Object.values(routes).find(
    (route) =>
      route.path === currentPath || route.path === `${currentPath}/index`
  )

  return indexRoute?.title || null
}

// Generate navigation structure from routes
function generateNavigation(routes: DocRouteMap): NavMenu {
  const nav: NavMenu = []

  // Helper to strip numeric prefixes from path parts
  const stripNumericPrefix = (path: string) =>
    path
      .split('/')
      .map((part) => part.replace(/^\d+-/, ''))
      .join('/')

  // Sort routes by original path (with numeric prefixes) to ensure correct ordering
  const sortedRoutes = Object.values(routes).sort((a, b) =>
    a.path.localeCompare(b.path)
  )

  // First pass: build nested structure
  sortedRoutes.forEach((route) => {
    const pathParts = route.path.split('/').filter(Boolean)

    // Skip empty paths
    if (pathParts.length === 0) return

    let currentLevel = nav
    let currentPath = ''
    let sortPath = '' // Keep original path for sorting

    // Iterate through path parts to build nested structure
    for (let i = 0; i < pathParts.length; i++) {
      const part = pathParts[i]

      sortPath = sortPath ? `${sortPath}/${part}` : `/${part}`
      currentPath = currentPath
        ? `${currentPath}/${stripNumericPrefix(part)}`
        : `/${stripNumericPrefix(part)}`

      // Find or create section at current level
      let section = currentLevel.find((item) => item.href === currentPath)

      if (!section) {
        // Get title from index file or use formatted directory name
        const title =
          i === pathParts.length - 1
            ? route.title // Use route title for leaf nodes
            : getTitleFromIndex(sortPath, routes) ||
              formatTitle(part.replace(/^\d+-/, ''))

        section = {
          title,
          href: currentPath,
          sortPath, // Store original path for sorting
          sections: [],
        }
        currentLevel.push(section)
      }

      // Move to next level
      currentLevel = section.sections!
    }
  })

  // Second pass: clean up sections with only index files
  const cleanupSections = (items: NavItem[]) => {
    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i]

      if (item.sections) {
        // Recursively clean up nested sections first
        cleanupSections(item.sections)

        // Check if this section only contains itself (index) or no items
        const sectionPath = item.href
        const hasOtherFiles = sortedRoutes.some((route) => {
          const cleanRoute = `/${stripNumericPrefix(route.path.slice(1))}`

          return (
            cleanRoute.startsWith(`${sectionPath}/`) &&
            cleanRoute !== sectionPath &&
            cleanRoute !== `${sectionPath}/index`
          )
        })

        // If it has no other files besides index, remove the sections array
        if (!hasOtherFiles) {
          delete item.sections
        }
        // If sections array is empty after cleanup, remove it
        else if (item.sections.length === 0) {
          delete item.sections
        }
      }
    }
  }

  // Sort and clean up the navigation
  const sortNavLevel = (items: NavItem[]) => {
    items.sort((a, b) =>
      (a.sortPath || a.href).localeCompare(b.sortPath || b.href)
    )
    items.forEach((item) => {
      if (item.sections && item.sections.length > 0) {
        sortNavLevel(item.sections)
        // Clean up sortPath after sorting
        delete item.sortPath
      }
    })
  }

  sortNavLevel(nav)
  cleanupSections(nav)

  return nav
}

// Generate TypeScript code for routes
function generateRouteCode(routes: DocRouteMap): string {
  const routeEntries = Object.entries(routes)
    .map(([key, route]) => {
      const props = Object.entries(route)
        .map(([k, v]) => {
          if (Array.isArray(v)) {
            return `    ${k}: [${v.map((item) => `'${item}'`).join(', ')}],`
          }
          if (typeof v === 'string') {
            return `    ${k}: '${v}',`
          }

          return `    ${k}: ${v},`
        })
        .join('\n')

      return `  ${key}: {\n${props}\n  },`
    })
    .join('\n\n')

  return `/**
 * @file This file is auto-generated. DO NOT EDIT DIRECTLY!
 */

import { type DocRoute, type DocRouteMap, routeSchema } from '../routing/types'

// Central route registry
export const docRoutes: DocRouteMap = {
${routeEntries}
} as const

// Type-safe route getter
export function getRoute(id: keyof typeof docRoutes): DocRoute {
  return docRoutes[id]
}

// Get route by ID
export function getRouteById(id: string): DocRoute | undefined {
  return Object.values(docRoutes).find((route) => route.id === id)
}

// Get route by path (including redirects)
export function getRouteByPath(path: string): DocRoute | undefined {
  // First try direct path match
  const directMatch = Object.values(docRoutes).find(
    (route) => route.path === path
  )

  if (directMatch) return directMatch

  // Then check redirects
  return Object.values(docRoutes).find(
    (route) => route.redirectFrom?.includes(path)
  )
}

// Validate all routes at runtime
Object.entries(docRoutes).forEach(([key, route]) => {
  try {
    routeSchema.parse(route)
  } catch (error) {
    console.error(\`Invalid route configuration for "\${key}":\`, error)
  }
})
`
}

// Main export: Generate both routes and navigation
export function generateRoutingData(
  pagesDir: string = path.join(process.cwd(), 'pages'),
  existingRoutes: DocRouteMap = {}
) {
  const routes = generateRoutes(pagesDir, existingRoutes)
  const navigation = generateNavigation(routes)
  const routeCode = generateRouteCode(routes)

  return {
    routes,
    navigation,
    routeCode,
  }
}
