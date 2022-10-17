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

import HtmlHead from 'components/HtmlHead'

import PageFooter from 'components/PageFooter'

import { BreakpointProvider } from 'components/Breakpoints'

import ExternalScripts from '../src/components/ExternalScripts'
import { SideNav } from '../src/components/SideNav'
import { TableOfContents } from '../src/components/TableOfContents'
import { PageHeader } from '../src/components/PageHeader'
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
    <>
      <CssBaseline />
      <PluralGlobalStyle />
      <GlobalStyles />
      <DocSearchStyles />
      <PagePropsContext.Provider value={pageProps}>
        <HtmlHead
          title={title}
          description={description}
        />
        <PageHeader />
        <Page>
          <PageGrid>
            <SideNavContainer>
              <SideNav navData={navData} />
            </SideNavContainer>
            <ContentContainer>
              <MainContent Component={Component} />
              <PageFooter />
            </ContentContainer>
            <SideCarContainer>
              <TableOfContents toc={toc} />
            </SideCarContainer>
          </PageGrid>
        </Page>
        <ExternalScripts />
      </PagePropsContext.Provider>
    </>
  )

  return (
    <SSRProvider>
      <BreakpointProvider>
        <ThemeProvider theme={honorableTheme}>
          <StyledThemeProvider theme={styledTheme}>{app}
          </StyledThemeProvider>
        </ThemeProvider>
      </BreakpointProvider>
    </SSRProvider>
  )
}

export default MyApp
