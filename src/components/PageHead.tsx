import Head from 'next/head'

const FAVICON_SIZES = [16, 32, 128, 180, 192]

function Favicons() {
  return (
    <>
      {FAVICON_SIZES.map(size => (
        <link
          rel="icon"
          href={`/favicon-${size}.png`}
          sizes={`${size}x${size}`}
        />
      ))}
      <link
        rel="shortcut icon"
        href="/favicon.ico"
      />
      <link
        rel="icon"
        href="/favicon.ico"
      />
    </>
  )
}

function PageHead({ title, description }) {
  return (
    <Head>
      <title>{title}</title>
      <meta
        name="title"
        content={title}
      />
      <meta
        name="description"
        content={description}
      />
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1.0"
      />
      <meta
        name="referrer"
        content="strict-origin"
      />
      <Favicons />
      <link
        rel="preconnect"
        href="https://fonts.googleapis.com"
      />
      <link
        rel="preconnect"
        href="https://fonts.gstatic.com"
        crossOrigin=""
      />
      <link
        rel="preconnect"
        href={`https://${process.env.NEXT_PUBLIC_ALGOLIA_APP_ID}-dsn.algolia.net`}
        crossOrigin=""
      />
    </Head>
  )
}

export default PageHead
