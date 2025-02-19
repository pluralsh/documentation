import fs from 'fs'
import path from 'path'
import { docRoutes } from '../src/routes/docs.generated'

// Regular expression to find markdown links
const MARKDOWN_LINK_REGEX = /\[([^\]]+)\]\(([^)]+)\)/g
const ABSOLUTE_LINK_REGEX = /^https?:\/\//
const IMAGE_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.gif', '.svg']

// Create a map of paths to route IDs for quick lookup
const pathToId = new Map<string, string>()
Object.values(docRoutes).forEach(route => {
  // Add main path
  pathToId.set(route.path, route.id)
  
  // Add redirects
  route.redirectFrom?.forEach(redirect => {
    pathToId.set(redirect, route.id)
  })

  // Handle paths with and without .md extension
  if (route.path.endsWith('.md')) {
    pathToId.set(route.path.slice(0, -3), route.id)
  } else {
    pathToId.set(route.path + '.md', route.id)
  }
  
  // Handle paths with and without leading slash
  if (route.path.startsWith('/')) {
    pathToId.set(route.path.slice(1), route.id)
  } else {
    pathToId.set('/' + route.path, route.id)
  }
})

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

function replaceLinks() {
  const pagesDir = path.join(process.cwd(), 'pages')
  const mdFiles = getAllMarkdownFiles(pagesDir)
  const results: Array<{ file: string, changes: number }> = []

  mdFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8')
    let changes = 0
    
    // Replace markdown links with doclink components
    content = content.replace(MARKDOWN_LINK_REGEX, (match, text, url) => {
      // Skip external links
      if (ABSOLUTE_LINK_REGEX.test(url)) {
        return match
      }

      // Skip anchor links in the same file
      if (url.startsWith('#')) {
        return match
      }

      // Skip image links
      if (IMAGE_EXTENSIONS.some(ext => url.toLowerCase().endsWith(ext))) {
        return match
      }

      // Remove anchor from URL for route lookup
      const [baseUrl] = url.split('#')
      const normalizedUrl = baseUrl.startsWith('/') ? baseUrl : '/' + baseUrl

      const routeId = pathToId.get(normalizedUrl)
      if (routeId) {
        changes++
        return `{% doclink to="${routeId}" %}${text}{% /doclink %}`
      }

      // If no route found, keep original link but log it
      console.log(`No route found for link in ${file}: [${text}](${url})`)
      return match
    })

    if (changes > 0) {
      fs.writeFileSync(file, content)
      results.push({ file: path.relative(pagesDir, file), changes })
    }
  })

  // Print results
  console.log('\nReplacement Results:')
  console.log('===================')
  results.forEach(({ file, changes }) => {
    console.log(`${file}: ${changes} link(s) replaced`)
  })
}

replaceLinks() 