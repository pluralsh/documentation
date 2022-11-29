import { useMemo } from 'react'

import {
  FillLevelProvider,
  GlobalStyle as PluralGlobalStyle,
  theme as honorableTheme,
  styledTheme,
} from '@pluralsh/design-system'
import { CssBaseline, ThemeProvider } from 'honorable'
import type { AppContext, AppProps } from 'next/app'
import type { Router } from 'next/router'
import { useRouter } from 'next/router'

import { SSRProvider } from '@react-aria/ssr'
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components'

import '../src/styles/globals.css'

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
import { APP_CATALOG_BASE_URL } from '../src/consts/routes'
import { NavDataProvider } from '../src/contexts/NavDataContext'
import { ReposProvider } from '../src/contexts/ReposContext'
import { getRepo, getRepos, reposCache } from '../src/data/repos'
import { getNavData } from '../src/NavData'
import { getBarePathFromPath, isAppCatalogRoute } from '../src/utils/text'

import type { RepoFragmentFragment } from '../src/gql/graphql'
import type { MarkdocNextJsPageProps } from '@markdoc/next.js'

type DocsInitialProps = {
  repos: RepoFragmentFragment[]
  repo?: any
}

type DocsAppProps = AppProps<MarkdocNextJsPageProps> & DocsInitialProps

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

function DocsApp({
  Component, pageProps, repos, repo,
}: DocsAppProps) {
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
              <MainContent
                Component={Component}
                repo={repo}
              />
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

function getAppName(router: Router) {
  const pathname = getBarePathFromPath(router.asPath)

  const appName = isAppCatalogRoute(pathname)
    ? pathname.replace(RegExp(`^${APP_CATALOG_BASE_URL}/`), '').split('/')[0]
    : null

  return appName
}

DocsApp.getInitialProps = async (context: AppContext) => {
  let repos: RepoFragmentFragment[] | undefined
  let repo: Awaited<ReturnType<typeof getRepo>> | undefined
  let apolloError: any | undefined

  try {
    repos = await getRepos()
  }
  catch (e) {
    apolloError = e
    repos = reposCache.filtered
  }
  try {
    const repoName = getAppName(context.router)

    repo = repoName ? await getRepo(repoName, repos) : undefined
  }
  catch (e) {
    apolloError = e
  }

  return {
    repos,
    repo,
    apolloError,
  }
}

export default DocsApp
