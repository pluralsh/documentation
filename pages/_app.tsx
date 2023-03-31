import type { ComponentProps } from 'react'
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

import { until } from '@open-draft/until'
import { SSRProvider } from '@react-aria/ssr'
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { SWRConfig } from 'swr'
import '../src/styles/globals.css'

import { BreakpointProvider } from '../src/components/Breakpoints'
import DocSearchStyles from '../src/components/DocSearchStyles'
import ExternalScripts from '../src/components/ExternalScripts'
import { FullNav } from '../src/components/FullNav'
import {
  GITHUB_DATA_URL,
  getGithubDataServer,
  isGithubRepoData,
} from '../src/components/GithubStars'
import GlobalStyles from '../src/components/GlobalStyles'
import { usePosthog } from '../src/components/hooks/usePosthog'
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
  META_DESCRIPTION,
  PAGE_TITLE_PREFIX,
  PAGE_TITLE_SUFFIX,
  ROOT_TITLE,
} from '../src/consts'
import { NavDataProvider } from '../src/contexts/NavDataContext'
import { ReposProvider } from '../src/contexts/ReposContext'
import { getRepos, reposCache } from '../src/data/getRepos'
import { getNavData } from '../src/NavData'

import type { Repo } from '../src/data/getRepos'
import type { MarkdocNextJsPageProps } from '@markdoc/next.js'

export type MyPageProps = MarkdocNextJsPageProps & {
  displayTitle?: string
  metaTitle?: string
  displayDescription?: string
  metaDescription?: string
  repo?: Repo
}

type MyAppProps = AppProps<MyPageProps | undefined> & {
  errors: Error[]
  repos: Repo[]
  swrConfig: ComponentProps<typeof SWRConfig>['value']
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

function App({ Component, repos = [], pageProps = {}, swrConfig }: MyAppProps) {
  usePosthog()
  const router = useRouter()
  const markdoc = pageProps?.markdoc
  const navData = useMemo(() => getNavData({ repos }), [repos])
  const { metaTitle, metaDescription } = pageProps

  const displayTitle = pageProps?.displayTitle || markdoc?.frontmatter?.title
  const displayDescription =
    pageProps?.displayDescription || markdoc?.frontmatter?.description

  const headProps = {
    title:
      metaTitle || displayTitle
        ? `${PAGE_TITLE_PREFIX}${displayTitle}${PAGE_TITLE_SUFFIX}`
        : ROOT_TITLE,
    description:
      metaDescription ||
      (router.pathname === '/'
        ? META_DESCRIPTION
        : markdoc?.frontmatter?.description || META_DESCRIPTION),
  }

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
        <HtmlHead {...headProps} />
        <PageHeader />
        <Page>
          <PageGrid>
            <SideNavContainer>
              <FullNav desktop />
            </SideNavContainer>
            <ContentContainer>
              <MainContent
                Component={Component}
                title={displayTitle}
                description={displayDescription}
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
    <SWRConfig value={swrConfig}>
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
    </SWRConfig>
  )
}

App.getInitialProps = async () => {
  const { data: repos, error: reposError } = await until(() => getRepos())
  const { data: githubData, error: githubError } = await until(() =>
    getGithubDataServer()
  )
  const swrFallback = {}

  if (isGithubRepoData(githubData)) {
    swrFallback[GITHUB_DATA_URL] = githubData
  }

  return {
    repos: repos || reposCache.filtered,
    swrConfig: {
      fallback: swrFallback,
    },
    errors: [
      ...(reposError ? [reposError] : []),
      ...(githubError ? [githubError] : []),
    ],
  }
}

export default App
