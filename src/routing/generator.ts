import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import {
  type DocRoute,
  type DocRouteMap,
  type NavItem,
  type NavMenu,
  routeSchema,
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
  return (
    '/' +
    filePath
      .replace(/^pages\//, '')
      .replace(/\.md$/, '')
      .replace(/\/index$/, '')
  )
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

// Extract section from file path
function getSection(filePath: string): string {
  const parts = filePath.replace(/^pages\//, '').split('/')
  // Use the first path segment as section, even for top-level index files
  const section = parts[0]
  return section.replace(/^\d+-/, '') // Remove numeric prefix from section
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
    path.join(process.cwd(), 'pages', route.path + '.md'),
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
  const errors: Record<string, string[]> = {}

  // Index existing routes by path for quick lookup
  Object.entries(existingRoutes).forEach(([key, route]) => {
    existingRoutesByPath.set(route.path, [key, route])
  })

  // Generate new routes while preserving existing metadata
  files.forEach((file) => {
    const relativePath = path.relative(pagesDir, file)
    const routePath = normalizeRoutePath(relativePath)
    const content = fs.readFileSync(file, 'utf8')
    const id = pathToId(relativePath)

    // Check if we have an existing route for this path
    const existing = existingRoutesByPath.get(routePath)

    if (existing) {
      // Preserve existing route with its metadata
      const [key, route] = existing
      newRoutes[key] = route

      // Validate existing route
      const routeErrors = validateRoute(route)
      if (routeErrors.length > 0) {
        errors[key] = routeErrors
      }
    } else {
      // Create new route
      const newRoute: DocRoute = {
        path: routePath,
        title: getTitle(relativePath, content),
        id,
        section: getSection(relativePath),
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
    Object.entries(errors).forEach(([key, routeErrors]) => {
      console.error(`\n${key}:`)
      routeErrors.forEach((error) => console.error(`  - ${error}`))
    })
  }

  return newRoutes
}

// Generate navigation structure from routes
function generateNavigation(routes: DocRouteMap): NavMenu {
  const nav: NavMenu = []
  const sectionMap = new Map<string, NavItem>()

  // Sort routes by path to ensure consistent ordering
  const sortedRoutes = Object.values(routes).sort((a, b) =>
    a.path.localeCompare(b.path)
  )

  sortedRoutes.forEach((route) => {
    const pathParts = route.path.split('/').filter(Boolean)
    const section = pathParts[0]

    if (!section) return // Skip root level

    // Create or get section
    if (!sectionMap.has(section)) {
      const sectionItem: NavItem = {
        title: formatTitle(section),
        href: `/${section}`,
        sections: [],
      }
      sectionMap.set(section, sectionItem)
      nav.push(sectionItem)
    }

    const sectionItem = sectionMap.get(section)!

    // Add route to section
    if (pathParts.length > 1) {
      sectionItem.sections!.push({
        title: route.title,
        href: route.path,
      })
    }
  })

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

import { z } from 'zod'
import { routeSchema, type DocRoute, type DocRouteMap } from './types'

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
  return Object.values(docRoutes).find(route => route.id === id)
}

// Get all routes in a section
export function getRoutesBySection(section: string): DocRoute[] {
  return Object.values(docRoutes).filter(route => route.section === section)
}

// Get route by path (including redirects)
export function getRouteByPath(path: string): DocRoute | undefined {
  // First try direct path match
  const directMatch = Object.values(docRoutes).find(route => route.path === path)
  if (directMatch) return directMatch

  // Then check redirects
  return Object.values(docRoutes).find(route => 
    route.redirectFrom?.includes(path)
  )
}

// Validate all routes at runtime
Object.entries(docRoutes).forEach(([key, route]) => {
  try {
    routeSchema.parse(route)
  } catch (error) {
    console.error(\`Invalid route configuration for "\${key}":\`, error)
  }
})`
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
