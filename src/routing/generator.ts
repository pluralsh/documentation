import fs from 'fs'
import path from 'path'
import { type DocRoute } from './types'
import {
  pathToId,
  normalizeRoutePath,
  getSection,
  getTitle,
  validateRoute,
} from './utils'

// Get all markdown files recursively
function getAllMarkdownFiles(dir: string): string[] {
  const files: string[] = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (
      entry.isDirectory() &&
      !entry.name.startsWith('_') &&
      !entry.name.startsWith('.')
    ) {
      files.push(...getAllMarkdownFiles(fullPath))
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath)
    }
  }

  return files
}

export function generateRoutes(): string {
  const pagesDir = path.join(process.cwd(), 'pages')
  const files = getAllMarkdownFiles(pagesDir)
  const newRoutes: Record<string, DocRoute> = {}
  const existingRoutesByPath = new Map<string, [string, DocRoute]>()
  const errors: Record<string, string[]> = {}

  // Load existing routes if available
  try {
    const { docRoutes } = require('./registry')
    Object.entries(docRoutes).forEach(([key, route]) => {
      existingRoutesByPath.set(route.path, [key, route as DocRoute])
    })
  } catch (error) {
    // No existing routes file
  }

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

  // Convert routes object to TypeScript
  const routesString = `/**
 * @file This file is auto-generated. DO NOT EDIT DIRECTLY!
 * To update, modify the pages directory structure and run the route generator.
 */

import { type DocRoute, type DocRouteMap } from './types'

export const docRoutes: DocRouteMap = {
${Object.entries(newRoutes)
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
  .join('\n\n')}
} as const

// Type-safe route getter
export function getRoute(id: keyof typeof docRoutes): DocRoute {
  return docRoutes[id]
}

// Get route by ID (alias)
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
}`

  return routesString
}
