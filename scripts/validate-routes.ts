import fs from 'fs'
import path from 'path'

import { docRoutes } from '../src/routes/docs'

function validateRoutes() {
  const errors: string[] = []
  const pagesDir = path.join(process.cwd(), 'pages')
  
  // Check for duplicate IDs
  const ids = new Set<string>()
  Object.values(docRoutes).forEach(route => {
    if (ids.has(route.id)) {
      errors.push(`Duplicate route ID found: ${route.id}`)
    }
    ids.add(route.id)
  })

  // Check for duplicate paths
  const paths = new Set<string>()
  Object.values(docRoutes).forEach(route => {
    if (paths.has(route.path)) {
      errors.push(`Duplicate path found: ${route.path}`)
    }
    paths.add(route.path)
  })

  // Verify file existence
  Object.entries(docRoutes).forEach(([key, route]) => {
    const possiblePaths = [
      path.join(pagesDir, `${route.path}.md`),
      path.join(pagesDir, route.path, 'index.md'),
      // Handle paths that already include .md
      path.join(pagesDir, route.path),
    ]

    const fileExists = possiblePaths.some(p => fs.existsSync(p))
    if (!fileExists) {
      errors.push(`No file found for route "${key}" at path: ${route.path}`)
    }
  })

  // Report results
  if (errors.length > 0) {
    console.error('Route validation failed:')
    errors.forEach(error => console.error(`- ${error}`))
    process.exit(1)
  } else {
    console.log('Route validation passed!')
  }
}

validateRoutes() 