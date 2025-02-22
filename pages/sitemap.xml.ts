import pages from '../src/generated/pages.json'

const S_MAXAGE = 1 * 60 * 60 // 1s * 60s/m * 60m/h = 1 hour
const STALE_WHILE_REVALIDATE = S_MAXAGE * 2

function urlTag({ location, lastmod }: { location: string; lastmod?: string }) {
  return `  <url>
    <loc>${process.env.NEXT_PUBLIC_ROOT_URL}${location}</loc>${
      lastmod
        ? `
    <lastmod>${lastmod}</lastmod>`
        : ''
    }
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

interface PageInfo {
  path: string
  lastmod: string
}

function generateSiteMap() {
  const sitemap = wrapSiteMap(
    (pages as PageInfo[])
      ?.map((page) => urlTag({ location: page.path, lastmod: page.lastmod }))
      .join('\n')
  )

  return sitemap
}

export async function getServerSideProps({ res }) {
  const sitemap = generateSiteMap()

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
