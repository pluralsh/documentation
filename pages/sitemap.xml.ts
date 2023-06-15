import { promises as fs } from 'fs'
import path from 'path'

import { until } from '@open-draft/until'
import { getStacks } from '@src/data/getStacks'

import { getRepos } from '@src/data/getRepos'

const S_MAXAGE = 1 * 60 * 60 // 1s * 60s/m * 60m/h = 1 hour
const STALE_WHILE_REVALIDATE = S_MAXAGE * 2

function writeUrl({
  location,
  lastMod,
  priority = '0.5',
}: {
  location: string
  lastMod: string
  priority?: string | number
}) {
  return `  <url>
    <loc>${process.env.NEXT_PUBLIC_ROOT_URL}/${location}</loc>
    <lastmod>${lastMod}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${priority || '0.5'}</priority>
  </url>`
}

function wrapSiteMap(content: string) {
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${content}
</urlset>
`
}

export default function SiteMap() {
  // getServerSideProps will do the heavy lifting
}

const ignore = [/^sitemap\.xml.*$/, /^([_.[]|404|500).*$/]

const pageFilter = (name: string) => {
  for (const ig of ignore) {
    if (name.match(ig)) {
      return false
    }
  }

  return name.match(/\.(ts|tsx|js|jsx|md|mdoc)$/)
}

async function crawlPages(filePath = '/pages') {
  const fullPath = path.join(process.cwd(), filePath)
  const files = await fs.readdir(fullPath, { withFileTypes: true })

  return files
    .filter((file) => pageFilter(file.name))
    .flatMap((file) => {
      if (file.isDirectory()) {
        return crawlPages(path.join(filePath, file.name))
      }
      let pathname = file.name.split('.').slice(0, -1).join('.')

      pathname = pathname.replace(/(^|\/)index$/g, '')

      return pathname
    })
    .sort()
}

async function generateSiteMap({
  repos,
  stacks,
}: {
  repos: Awaited<ReturnType<typeof getRepos>>
  stacks: Awaited<ReturnType<typeof getStacks>>
}) {
  const lastMod = new Date().toISOString()
  const pages = await crawlPages()

  // We generate the XML sitemap with the posts data
  const sitemap = wrapSiteMap(
    `${pages
      ?.map((page) => writeUrl({ location: `${page}`, lastMod }))
      .join('\n')}
${stacks
  ?.map((stack) =>
    writeUrl({ location: `plural-stacks/${stack.name}`, lastMod })
  )
  .join('\n')}
  ${repos
    ?.map((repo) =>
      writeUrl({ location: `applications/${repo.name}`, lastMod })
    )
    .join('\n')}`
  )

  return sitemap
}

let cachedSiteMap: string

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const { data: repos, error: reposError } = await until(() => getRepos())
  const { data: stacks, error: stacksError } = await until(() => getStacks())

  let sitemap: string = cachedSiteMap

  if (!reposError && !stacksError) {
    sitemap = await generateSiteMap({ repos, stacks })
  }

  res.setHeader('Content-Type', 'text/xml')
  res.setHeader(
    'Cache-Control',
    `public, s-maxage=${S_MAXAGE}, stale-while-revalidate=${STALE_WHILE_REVALIDATE}`
  )
  // we send the XML to the browser
  res.write(sitemap)
  res.end()

  return {
    props: {},
  }
}
