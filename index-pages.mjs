import { execSync } from 'child_process'
import { readdir, writeFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

const ignore = [
  // sitemaps
  /^sitemap\.xml.*/,
  // _nextjs templates
  // .hidden_files
  // [nextjs_dynamic_pages]
  // 404 and 500 error pages
  /^([_.[]|404|500).*$/,
  /^__components\/.*/,
]

const pageFilter = (file) => {
  for (const ig of ignore) {
    if (file.name.match(ig)) {
      return false
    }
  }

  if (file?.isDirectory()) {
    return true
  }

  // Only include markdown files
  return file.name.match(/\.(md|mdoc)$/)
}

// Function to strip numeric prefixes from path segments
function stripNumericPrefixes(pathStr) {
  return pathStr
    .split('/')
    .map((segment) => segment.replace(/^\d+-/, ''))
    .join('/')
}

// Function to get the last git modification date of a file
function getGitLastModified(filePath) {
  try {
    // Get the last commit date that modified this file in UTC
    const date = execSync(`git log -1 --format="%cI" -- "${filePath}"`, {
      encoding: 'utf-8',
    }).trim()

    if (!date) {
      return new Date().toISOString()
    }

    // Convert to UTC and format as ISO string
    return new Date(date).toISOString()
  } catch (error) {
    // Fallback to current date if git command fails
    return new Date().toISOString()
  }
}

const rootDir = __dirname

const PAGES_PATH = '/pages'

async function crawlPages(filePath = '/') {
  const fullPath = path.join(rootDir, PAGES_PATH, filePath)
  const files = await readdir(fullPath, { withFileTypes: true })

  const filteredFiles = files.filter(pageFilter)

  const pages = []

  for (const file of filteredFiles) {
    if (file.isDirectory()) {
      pages.push(...(await crawlPages(path.join(filePath, file.name))))
    } else {
      let pathname = file.name.split('.').slice(0, -1).join('.')

      pathname = path.join(filePath, pathname.replace(/(^|\/)index$/g, ''))
      // Strip numeric prefixes from the entire path
      pathname = stripNumericPrefixes(pathname)

      // Get git modification time
      const fullFilePath = path.join(fullPath, file.name)
      const lastmod = getGitLastModified(fullFilePath)

      pages.push({
        path: pathname,
        lastmod,
      })
    }
  }

  return pages
}

const pagesObj = await crawlPages()
const pages = JSON.stringify(pagesObj, null, '  ')

writeFile(path.join(rootDir, 'src/generated/pages.json'), pages)

export default {}
