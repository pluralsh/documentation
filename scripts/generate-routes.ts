import fs from 'fs'
import path from 'path'
import { docRoutes, type DocRoute } from '../src/routes/docs'
import matter from 'gray-matter'

// Utility to convert path to route ID
function pathToId(filePath: string): string {
  return filePath
    .replace(/^pages\//, '')
    .replace(/\.md$/, '')
    .replace(/\/index$/, '')
    .replace(/[/-]/g, '_')
    .toLowerCase()
}

// Utility to convert path to route path
function normalizeRoutePath(filePath: string): string {
  return '/' + filePath
    .replace(/^pages\//, '')
    .replace(/\.md$/, '')
    .replace(/\/index$/, '')
}

// Get all markdown files recursively
function getAllMarkdownFiles(dir: string): string[] {
  const files: string[] = []
  const entries = fs.readdirSync(dir, { withFileTypes: true })

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name)
    if (entry.isDirectory() && !entry.name.startsWith('_') && !entry.name.startsWith('.')) {
      files.push(...getAllMarkdownFiles(fullPath))
    } else if (entry.isFile() && entry.name.endsWith('.md')) {
      files.push(fullPath)
    }
  }

  return files
}

// Extract section from file path
function getSection(filePath: string): string {
  const parts = filePath.replace(/^pages\//, '').split('/')
  return parts.length > 1 ? parts[0] : 'overview'
}

// Get title from frontmatter or filename
function getTitle(filePath: string, content: string): string {
  const { data } = matter(content)
  if (data.title) return data.title

  // Fall back to filename
  const basename = path.basename(filePath, '.md')
  return basename
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
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
    path.join(process.cwd(), 'pages', route.path)
  ]
  
  if (!possiblePaths.some(p => fs.existsSync(p))) {
    errors.push(`No file found for path: ${route.path}`)
  }
  
  return errors
}

function generateRoutes(): Record<string, DocRoute> {
  const pagesDir = path.join(process.cwd(), 'pages')
  const files = getAllMarkdownFiles(pagesDir)
  const newRoutes: Record<string, DocRoute> = {}
  const existingRoutesByPath = new Map<string, [string, DocRoute]>()
  const errors: Record<string, string[]> = {}

  // Index existing routes by path for quick lookup
  Object.entries(docRoutes).forEach(([key, route]) => {
    existingRoutesByPath.set(route.path, [key, route])
  })

  // Generate new routes while preserving existing metadata
  files.forEach(file => {
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
        section: getSection(relativePath)
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
      routeErrors.forEach(error => console.error(`  - ${error}`))
    })
  }

  return newRoutes
}

// Generate the new routes
const newRoutes = generateRoutes()

// Convert routes object to TypeScript literal syntax
function routesToTypeScript(routes: Record<string, DocRoute>): string {
  const entries = Object.entries(routes)
  return entries.map(([key, route]) => {
    const props = Object.entries(route)
      .map(([k, v]) => {
        if (Array.isArray(v)) {
          return `    ${k}: [${v.map(item => `'${item}'`).join(', ')}],`
        }
        if (typeof v === 'string') {
          return `    ${k}: '${v}',`
        }
        return `    ${k}: ${v},`
      })
      .join('\n')
    
    return `  ${key}: {\n${props}\n  },`
  }).join('\n\n')
}

// Format the routes object as a string
const routesString = `/**
 * @file This file is auto-generated using scripts/generate-routes.ts
 * DO NOT EDIT THIS FILE DIRECTLY!
 * 
 * To update this file:
 * 1. Modify the pages directory structure as needed
 * 2. Run: npx ts-node scripts/generate-routes.ts
 * 3. Review the changes
 * 
 * The script will:
 * - Update paths to match the pages directory structure
 * - Preserve existing metadata (titles, IDs, redirects)
 * - Add any new files it finds
 * - Validate file existence
 */

import { z } from 'zod'

// Schema for route definition
const routeSchema = z.object({
  path: z.string(),
  title: z.string(),
  id: z.string(),  // Used for referencing in markdown/code
  section: z.string().optional(),
  description: z.string().optional(),
  deprecated: z.boolean().optional(),
  redirectFrom: z.array(z.string()).optional(),
})

export type DocRoute = z.infer<typeof routeSchema>

// Type for the entire route map
export type DocRouteMap = {
  [K: string]: DocRoute
}

// Central route registry
export const docRoutes: DocRouteMap = {
${routesToTypeScript(newRoutes)}
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
}

// Validate all routes at runtime
Object.entries(docRoutes).forEach(([key, route]) => {
  try {
    routeSchema.parse(route)
  } catch (error) {
    console.error(\`Invalid route configuration for "\${key}":\`, error)
  }
})`

// Write the new routes to a temporary file for comparison
fs.writeFileSync(
  path.join(process.cwd(), 'src/routes/docs.generated.ts'),
  routesString
)

console.log('\nGenerated routes file at src/routes/docs.generated.ts')
console.log('Please compare with existing docs.ts and verify the changes') 