import { useMemo } from 'react'
import { useRouter } from 'next/router'
import { MarkdocNextJsPageProps } from '@markdoc/next.js'
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components'
import {
  FillLevelProvider,
  GlobalStyle as PluralGlobalStyle,
  theme as honorableTheme,
  styledTheme,
} from '@pluralsh/design-system'
import { CssBaseline, ThemeProvider } from 'honorable'
import { SSRProvider } from '@react-aria/ssr'
import '../src/styles/globals.css'

import { NavDataProvider } from '../src/contexts/NavDataContext'
import { getNavData } from '../src/NavData'
import { FragmentType, useFragment } from '../src/gql/fragment-masking'

import { REPOS_QUERY, RepoFragment } from '../src/queries/recipesQueries'
import { ReposProvider } from '../src/contexts/ReposContext'
import client from '../src/apollo-client'
import { BreakpointProvider } from '../src/components/Breakpoints'
import PageFooter from '../src/components/PageFooter'
import HtmlHead from '../src/components/HtmlHead'
import ExternalScripts from '../src/components/ExternalScripts'
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
  DESCRIPTION,
  PAGE_TITLE_PREFIX,
  PAGE_TITLE_SUFFIX,
  ROOT_TITLE,
} from '../src/consts'
import { PagePropsContext } from '../src/components/PagePropsContext'

import { FullNav } from '../src/components/FullNav'
import type { AppProps } from 'next/app'

type MyAppProps = AppProps & {
  pageProps?: MarkdocNextJsPageProps
  apolloError?: any
  repos: FragmentType<typeof RepoFragment>[]
}

export type MarkdocHeading = {
  id?: string
  level?: number
  title?: string
}

const docsStyledTheme = { ...styledTheme, ...{ docs: { topNavHeight: 72 } } }

function collectHeadings(node, sections: MarkdocHeading[] = []) {
  if (node) {
    if (node?.name === 'Heading') {
      const title = node.children[0]

      if (typeof title === 'string') {
        sections.push({
          ...node.attributes,
          title,
        })
      }
    }

    if (node?.children) {
      for (const child of node.children) {
        collectHeadings(child, sections)
      }
    }
  }

  return sections as MarkdocHeading[]
}

const Page = styled.div(() => ({}))

function App({
  Component,
  repos = [],
  pageProps = {},
  apolloError: _,
}: MyAppProps) {
  const router = useRouter()
  const markdoc = pageProps?.markdoc
  const navData = useMemo(() => getNavData({ repos }), [repos])

  const title = markdoc?.frontmatter?.title
    ? `${PAGE_TITLE_PREFIX}${markdoc?.frontmatter?.title}${PAGE_TITLE_SUFFIX}`
    : ROOT_TITLE
  const description
    = router.pathname === '/'
      ? DESCRIPTION
      : markdoc?.frontmatter?.description || DESCRIPTION

  const toc = pageProps?.markdoc?.content
    ? collectHeadings(pageProps?.markdoc.content)
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
              <FullNav desktop />
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
    <ReposProvider value={repos}>
      <NavDataProvider value={navData}>
        <SSRProvider>
          <BreakpointProvider>
            <ThemeProvider theme={honorableTheme}>
              <StyledThemeProvider theme={docsStyledTheme}>
                <FillLevelProvider value={0}>{app}</FillLevelProvider>
              </StyledThemeProvider>
            </ThemeProvider>
          </BreakpointProvider>
        </SSRProvider>
      </NavDataProvider>
    </ReposProvider>
  )
}

App.getInitialProps = async () => {
  try {
    const { data, error } = await client.query({ query: REPOS_QUERY })

    console.error(error)
    const repos = data?.repositories?.edges
      ?.map(edge => edge?.node)
      .filter(node => {
        const repo = useFragment(RepoFragment, node)

        return !repo?.private
      })

    return {
      repos,
    }
  }
  catch (e) {
    return {
      repos: [],
      apolloError: e,
    }
  }
}

export default App
