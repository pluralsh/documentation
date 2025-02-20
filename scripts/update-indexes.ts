import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

function titleCase(str: string): string {
  return str
    .split('-')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

function generateDescription(title: string): string {
  return `Documentation and guides for working with ${title}.`
}

function getArticlesInSection(
  dirPath: string
): { title: string; path: string }[] {
  const files = fs.readdirSync(dirPath)
  const articles: { title: string; path: string }[] = []

  files.forEach((file) => {
    if (file === 'index.md') return

    if (file.endsWith('.md')) {
      const filePath = path.join(dirPath, file)
      const content = fs.readFileSync(filePath, 'utf8')
      const { data } = matter(content)
      const name = path.basename(file, '.md')
      const cleanName = name.replace(/^\d+-/, '')
      articles.push({
        title: data.title || titleCase(cleanName),
        path: cleanName,
      })
    }
  })

  return articles
}

function updateIndexFile(indexPath: string) {
  const dirPath = path.dirname(indexPath)
  const dirName = path.basename(dirPath).replace(/^\d+-/, '')
  let content = ''

  // Read existing content if file exists
  if (fs.existsSync(indexPath)) {
    content = fs.readFileSync(indexPath, 'utf8')
  }

  const { data: frontmatter = {}, content: mainContent = '' } = matter(content)

  // Update or add frontmatter
  if (!frontmatter.title) {
    frontmatter.title = titleCase(dirName)
  }
  if (!frontmatter.description) {
    frontmatter.description = generateDescription(frontmatter.title)
  }

  // Remove any "ARTICLES IN THIS SECTION" content and article links at the top
  let newContent = mainContent
    // Remove ARTICLES IN THIS SECTION blocks
    .replace(/\n*ARTICLES IN THIS SECTION:[\s\S]*?(?=\n\s*\n|$)/g, '')
    .replace(/\n*## ARTICLES IN THIS SECTION:[\s\S]*?(?=\n\s*\n|$)/g, '')
    // Remove article links at the start of the file
    .replace(/^\s*(?:-\s*\[.*?\]\(.*?\)\s*\n*)+/, '')
    .trim()

  // If no content remains, add a basic introduction
  if (!newContent.trim()) {
    newContent = `## Overview\n\n${frontmatter.description}`
  }

  // Write the updated content
  const updatedContent = matter.stringify(newContent, frontmatter)
  fs.writeFileSync(indexPath, updatedContent)
}

// Find all index.md files recursively
function processDirectory(dir: string) {
  const files = fs.readdirSync(dir)

  files.forEach((file) => {
    const fullPath = path.join(dir, file)
    const stat = fs.statSync(fullPath)

    if (stat.isDirectory()) {
      processDirectory(fullPath)
    } else if (file === 'index.md') {
      console.log(`Processing: ${fullPath}`)
      updateIndexFile(fullPath)
    }
  })
}

// Create scripts directory if it doesn't exist
if (!fs.existsSync('scripts')) {
  fs.mkdirSync('scripts')
}

// Start processing from pages directory
processDirectory('pages')
