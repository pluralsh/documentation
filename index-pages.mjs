import { Dirent } from 'fs'
import { readdir, writeFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)

const __dirname = path.dirname(__filename)

function writeUrl({ location, lastMod, priority = '0.5' }) {
  return `  <url>
    <loc>${process.env.NEXT_PUBLIC_ROOT_URL}/${location}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority || '0.5'}</priority>
  </url>`
}

function wrapSiteMap(content) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${content}
</urlset>
`
}

const ignore = [
  // sitemaps
  /^sitemap\.xml.*/,
  // _nextjs templates
  // .hidden_files
  // [nextjs_dynamic_pages]
  // 404 and 500 error pages
  /^([_.[]|404|500).*$/,
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
  return file.name.match(/\.(ts|tsx|js|jsx|md|mdoc)$/)
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
      pages.push({ path: pathname })
    }
  }

  return pages
}

const pagesObj = await crawlPages()
const pages = JSON.stringify(pagesObj, null, '  ')

writeFile(path.join(rootDir, 'src/generated/pages.json'), pages)

export default {}
