import { until } from '@open-draft/until'

import { getRepos } from '@src/data/getRepos'

import pages from '../src/generated/pages.json'

const S_MAXAGE = 1 * 60 * 60 // 1s * 60s/m * 60m/h = 1 hour
const STALE_WHILE_REVALIDATE = S_MAXAGE * 2

function urlTag({
  location,
  lastMod,
  priority = '0.5',
}: {
  location: string
  lastMod: string
  priority?: string | number
}) {
  return `  <url>
    <loc>${process.env.NEXT_PUBLIC_ROOT_URL}${location}</loc>
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

function generateSiteMap({
  repos,
}: {
  repos?: Awaited<ReturnType<typeof getRepos>>
} = {}) {
  const lastMod = new Date().toISOString()

  // We generate the XML sitemap with the posts data
  const sitemap = wrapSiteMap(`${pages
    ?.map((page) => urlTag({ location: `${page.path}`, lastMod }))
    .join('\n')}
  ${repos
    ?.map((repo) => urlTag({ location: `/applications/${repo.name}`, lastMod }))
    .join('\n')}`)

  return sitemap
}

let cachedSiteMap: string = generateSiteMap()

export async function getServerSideProps({ res }) {
  // We make an API call to gather the URLs for our site
  const { data: repos, error: reposError } = await until(() => getRepos())

  let sitemap: string = cachedSiteMap

  if (!reposError) {
    sitemap = await generateSiteMap({ repos })
    cachedSiteMap = sitemap
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
