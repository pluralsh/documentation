import { useMemo } from 'react'

import {
  FillLevelProvider,
  GlobalStyle as PluralGlobalStyle,
  theme as honorableTheme,
  styledTheme,
} from '@pluralsh/design-system'
import { CssBaseline, ThemeProvider } from 'honorable'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'

import { SSRProvider } from '@react-aria/ssr'
import memoizeOne from 'memoize-one'
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components'

import '../src/styles/globals.css'

import client from '../src/apollo-client'
import { BreakpointProvider } from '../src/components/Breakpoints'
import DocSearchStyles from '../src/components/DocSearchStyles'
import ExternalScripts from '../src/components/ExternalScripts'
import { FullNav } from '../src/components/FullNav'
import GlobalStyles from '../src/components/GlobalStyles'
import HtmlHead from '../src/components/HtmlHead'
import MainContent from '../src/components/MainContent'
import PageFooter from '../src/components/PageFooter'
import {
  ContentContainer,
  PageGrid,
  SideCarContainer,
  SideNavContainer,
} from '../src/components/PageGrid'
import { PageHeader } from '../src/components/PageHeader'
import { PagePropsContext } from '../src/components/PagePropsContext'
import { TableOfContents } from '../src/components/TableOfContents'
import {
  DESCRIPTION,
  PAGE_TITLE_PREFIX,
  PAGE_TITLE_SUFFIX,
  ROOT_TITLE,
} from '../src/consts'
import { NavDataProvider } from '../src/contexts/NavDataContext'
import { ReposProvider } from '../src/contexts/ReposContext'
import { useFragment as asFragment } from '../src/gql/fragment-masking'
import { getNavData } from '../src/NavData'
import { REPOS_QUERY, RepoFragment } from '../src/queries/recipesQueries'

import type { FragmentType } from '../src/gql/fragment-masking'
import type { RepoFragmentFragment, ReposQuery } from '../src/gql/graphql'
import type { MarkdocNextJsPageProps } from '@markdoc/next.js'

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

const reposCache: {
  filtered: RepoFragmentFragment[]
} = {
  filtered: [],
}

const filterRepos = memoizeOne((data: ReposQuery) => data?.repositories?.edges
  ?.map(edge => edge?.node)
  .map(node => asFragment(RepoFragment, node))
  .filter((repo: RepoFragmentFragment | undefined | null): repo is RepoFragmentFragment => !!repo && !repo.private))

export async function getRepos() {
  const { data, error } = await client.query({ query: REPOS_QUERY })

  if (error) {
    throw new Error(`${error.name}: ${error.message}`)
  }
  const filteredRepos = filterRepos(data)

  if (filteredRepos && filteredRepos.length > 0) {
    reposCache.filtered = filteredRepos

    return filteredRepos || []
  }

  throw new Error('No repos found')
}

App.getInitialProps = async () => {
  try {
    return {
      repos: await getRepos(),
    }
  }
  catch (e) {
    return {
      repos: reposCache.filtered,
      apolloError: e,
    }
  }
}

export default App
