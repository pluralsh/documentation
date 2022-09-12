import React from 'react'
import Head from 'next/head'
import { MarkdocNextJsPageProps } from '@markdoc/next.js'

// import Link from 'next/link'
// import { styledTheme } from "pluralsh-design-system";
import styled from 'styled-components'

import 'prismjs'
// Import other Prism themes here
import 'prismjs/components/prism-bash.min'
import 'prismjs/themes/prism.css'

import '../public/globals.css'

import type { AppProps } from 'next/app'

import { SideNav } from '../components/SideNav'
import { TableOfContents } from '../components/TableOfContents'
import { TopNav } from '../components/TopNav'

type AppPropsPlusMd = AppProps & { pageProps: MarkdocNextJsPageProps }

const TITLE = 'Plural Documentation'
const DESCRIPTION
  = 'Plural empowers you to build and maintain production-ready applications on Kubernetes in minutes with no management overhead.'

function collectHeadings(node, sections: any[] = []) {
  if (node) {
    if (node.name === 'Heading') {
      const title = node.children[0]

      if (typeof title === 'string') {
        sections.push({
          ...node.attributes,
          title,
        })
      }
    }

    if (node.children) {
      for (const child of node.children) {
        collectHeadings(child, sections)
      }
    }
  }

  return sections
}

const Page = styled.div`
  position: fixed;
  top: var(--top-nav-height);
  display: flex;
  width: 100vw;
  flex-grow: 1;
  main {
    overflow: auto;
    height: calc(100vh - var(--top-nav-height));
    flex-grow: 1;
    font-size: 16px;
    padding: 0 2rem 2rem;
  }
`

const MyApp = styled(({ Component, pageProps }: AppPropsPlusMd) => {
  const { markdoc } = pageProps
  // console.log("markdoc", markdoc);

  let title = TITLE
  let description = DESCRIPTION

  if (markdoc) {
    if (markdoc.frontmatter.title) {
      title = markdoc.frontmatter.title
    }
    if (markdoc.frontmatter.description) {
      description = markdoc.frontmatter.description
    }
  }

  const toc = pageProps.markdoc?.content
    ? collectHeadings(pageProps.markdoc.content)
    : []

  const app = (
    <>
      <Head>
        <title>{title}</title>
        <link
          rel="preconnect"
          href={`https://${process.env.NEXT_PUBLIC_ALGOLIA_APP_ID}-dsn.algolia.net`}
          crossOrigin=""
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        />
        <meta
          name="referrer"
          content="strict-origin"
        />
        <meta
          name="title"
          content={title}
        />
        <meta
          name="description"
          content={description}
        />
        <link
          rel="shortcut icon"
          href="/favicon.ico"
        />
        <link
          rel="icon"
          href="/favicon.ico"
        />
      </Head>
      <TopNav>{/* <Link href="/docs">Docs</Link> */}</TopNav>
      <Page>
        <SideNav />
        <main className="flex column">
          <Component {...pageProps} />
        </main>
        <TableOfContents toc={toc} />
      </Page>
    </>
  )

  return app

  // return <ThemeProvider >{app}</ThemeProvider>;
})``

export default MyApp
