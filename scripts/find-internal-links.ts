import fs from 'fs'
import path from 'path'
import { docRoutes } from '../src/routes/docs'

// Regular expression to find markdown links
const MARKDOWN_LINK_REGEX = /\[([^\]]+)\]\(([^)]+)\)/g
const ABSOLUTE_LINK_REGEX = /^https?:\/\//

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

function findInternalLinks() {
  const pagesDir = path.join(process.cwd(), 'pages')
  const mdFiles = getAllMarkdownFiles(pagesDir)
  const results: Array<{ file: string, links: Array<{ text: string, url: string }> }> = []

  // Create a map of paths to route IDs for quick lookup
  const pathToId = new Map<string, string>()
  Object.values(docRoutes).forEach(route => {
    pathToId.set(route.path, route.id)
    // Also map with and without .md extension
    if (route.path.endsWith('.md')) {
      pathToId.set(route.path.slice(0, -3), route.id)
    } else {
      pathToId.set(route.path + '.md', route.id)
    }
  })

  mdFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8')
    const links: Array<{ text: string, url: string }> = []
    let match

    while ((match = MARKDOWN_LINK_REGEX.exec(content)) !== null) {
      const [, text, url] = match
      // Only include internal links (not external URLs)
      if (!ABSOLUTE_LINK_REGEX.test(url)) {
        links.push({ text, url })
      }
    }

    if (links.length > 0) {
      const relativePath = path.relative(pagesDir, file)
      results.push({ file: relativePath, links })
    }
  })

  // Print results
  console.log('Internal links found:')
  console.log('=====================')
  results.forEach(({ file, links }) => {
    console.log(`\nFile: ${file}`)
    links.forEach(({ text, url }) => {
      const normalizedUrl = url.startsWith('/') ? url : `/${url}`
      const routeId = pathToId.get(normalizedUrl)
      console.log(`- [${text}](${url})${routeId ? ` -> id: ${routeId}` : ' -> NO MATCHING ROUTE'}`)
    })
  })
}

findInternalLinks() 