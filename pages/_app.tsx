import { MarkdocNextJsPageProps } from '@markdoc/next.js'
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components'
import {
  GlobalStyle as PluralGlobalStyle,
  styledTheme,
  theme,
} from 'pluralsh-design-system'
import { CssBaseline, ThemeProvider, mergeTheme } from 'honorable'
import { SSRProvider } from '@react-aria/ssr'
import '../src/styles/globals.css'
import type { AppProps } from 'next/app'

import PageHead from 'components/PageHead'

import ExternalScripts from '../src/components/ExternalScripts'
import { SideNav } from '../src/components/SideNav'
import { TableOfContents } from '../src/components/TableOfContents'
import { TopNav } from '../src/components/TopNav'
import {
  ContentContainer,
  PageGrid,
  SideCarContainer,
  SideNavContainer,
} from '../src/components/PageGrid'
import GlobalStyles from '../src/components/GlobalStyles'
import DocSearchStyles from '../src/components/DocSearchStyles'
import MainContent from '../src/components/MainContent'
import {
  DESCRIPTION, PAGE_TITLE_PREFIX, PAGE_TITLE_SUFFIX, ROOT_TITLE,
} from '../src/consts'

import { PagePropsContext } from '../src/components/PagePropsContext'
import navData from '../src/NavData'

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

const Page = styled.div(() => ({}))

function MyApp({ Component, pageProps }: AppPropsPlusMd) {
  const { markdoc } = pageProps

  const title = markdoc?.frontmatter?.title ? `${PAGE_TITLE_PREFIX}${markdoc?.frontmatter?.title}${PAGE_TITLE_SUFFIX}` : ROOT_TITLE
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
          <GlobalStyles />
          <DocSearchStyles />
          <PagePropsContext.Provider value={pageProps}>
            <PageHead
              title={title}
              description={description}
            />
            <TopNav />
            <Page>
              <PageGrid>
                <SideNavContainer>
                  <SideNav navData={navData} />
                </SideNavContainer>
                <ContentContainer>
                  <MainContent Component={Component} />
                </ContentContainer>
                <SideCarContainer>
                  <TableOfContents toc={toc} />
                </SideCarContainer>
              </PageGrid>
            </Page>
            <ExternalScripts />

          </PagePropsContext.Provider>
        </StyledThemeProvider>
      </ThemeProvider>
    </SSRProvider>
  )

  return app
}

export default MyApp
