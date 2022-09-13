// pages/_document.js
import {
  Head, Html, Main, NextScript,
} from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <link
          rel="preconnect"
          href={`https://${process.env.NEXT_PUBLIC_ALGOLIA_APP_ID}-dsn.algolia.net`}
          crossOrigin=""
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
