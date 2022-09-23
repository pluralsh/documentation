import Head from 'next/head'
import { MarkdocNextJsPageProps } from '@markdoc/next.js'
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components'
import {
  GlobalStyle as PluralGlobalStyle,
  styledTheme,
  theme,
} from 'pluralsh-design-system'
import { CssBaseline, ThemeProvider, mergeTheme } from 'honorable'
import { SSRProvider } from '@react-aria/ssr'
import { useRouter } from 'next/router'
import '../public/globals.css'
import type { AppProps } from 'next/app'
import { DocSearch } from '@docsearch/react'

import { SideNav } from '../src/components/SideNav'
import { TableOfContents } from '../src/components/TableOfContents'
import { TopNav } from '../src/components/TopNav'
import {
  ContentContainer,
  PageGrid,
  SideCarContainer,
  SideNavContainer,
} from '../src/components/PageGrid'
import GlobalStyle from '../src/components/GlobalStyles'
import MainContent from '../src/components/MainContent'
import { DESCRIPTION, TITLE } from '../src/consts'

import { PagePropsContext } from '../src/components/PagePropsContext'

const honorableTheme = mergeTheme(theme, {
  // global: [
  //   // This provides the mp spacing props to honorable
  //   // DEPRECATED in favor of the semantic spacing system
  //   mpRecipe(),
  // ],
})

type AppPropsPlusMd = AppProps & { pageProps: MarkdocNextJsPageProps }

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
  /* display: flex;
  flex-grow: 1; */
`

function MyApp({ Component, pageProps }: AppPropsPlusMd) {
  const { markdoc } = pageProps
  const router = useRouter()

  const title = markdoc?.frontmatter?.title || TITLE
  const description = markdoc?.frontmatter?.description || DESCRIPTION

  const toc = pageProps.markdoc?.content
    ? collectHeadings(pageProps.markdoc.content)
    : []

  const app = (
    <SSRProvider>
      <ThemeProvider theme={honorableTheme}>
        <StyledThemeProvider theme={styledTheme}>
          <CssBaseline />
          <PluralGlobalStyle />
          <GlobalStyle />
          <PagePropsContext.Provider value={pageProps}>
            <Head>
              <title>{title}</title>
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
            <TopNav>
              <DocSearch
                appId={process.env.NEXT_PUBLIC_ALGOLIA_APP_ID || ''}
                indexName={process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME || ''}
                apiKey={process.env.NEXT_PUBLIC_ALGOLIA_APP_ID_KEY || ''}
                placeholder="Search Plural docs"
                navigator={{
                  navigate: ({ itemUrl }) => {
                    router.push(itemUrl)
                  },
                }}
                getMissingResultsUrl={({ query }) => `https://github.com/pluralsh/documentation/issues/new?title=${query}`}
              />
            </TopNav>
            <Page>
              <PageGrid>
                <SideNavContainer>
                  <SideNav />
                </SideNavContainer>
                <ContentContainer>
                  <MainContent Component={Component} />
                </ContentContainer>
                <SideCarContainer>
                  <TableOfContents toc={toc} />
                </SideCarContainer>
              </PageGrid>
            </Page>
          </PagePropsContext.Provider>
        </StyledThemeProvider>
      </ThemeProvider>
    </SSRProvider>
  )

  return app
}

export default MyApp
