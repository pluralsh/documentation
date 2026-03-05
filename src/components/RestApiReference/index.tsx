/**
 * REST API Reference - main composition.
 * Composes SidebarNav, ParameterTable, ResponsePanel, MethodBadge.
 * Data passed as props; no fetching.
 */

import { useCallback, useMemo, useState } from 'react'
import { useRouter } from 'next/router'
import styled from 'styled-components'

import {
  Breadcrumbs,
  CheckIcon,
  CopyIcon,
  GitHubLogoIcon,
  Tab,
} from '@pluralsh/design-system'

import { useCopyText } from '@src/hooks/useCopyText'
import type { ApiSection, EndpointDetail } from '@src/lib/openapi-rest'

import { MethodBadge } from './MethodBadge'
import { ParameterTable } from './ParameterTable'
import { ResponsePanel } from './ResponsePanel'
import { ResponseSchemaView } from './ResponseSchemaView'
import { AUTH_PAGE_ID, SidebarNav } from './SidebarNav'

type TabId = 'query' | 'responses'

// ─── Layout ──────────────────────────────────────────────────────────────────

const PageContainer = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  height: 'calc(100vh - var(--top-nav-height))',
  overflow: 'hidden',
  background: theme.colors['fill-zero'],
}))

const MainArea = styled.main({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
})

const MainScrollArea = styled.div(({ theme }) => ({
  flex: 1,
  overflowY: 'auto',
  padding: `${theme.spacing.xlarge}px ${theme.spacing.xlarge}px`,
}))

const BreadcrumbsWrapper = styled.div(({ theme }) => ({
  marginBottom: theme.spacing.large,
}))

const PageDescription = styled.p(({ theme }) => ({
  ...theme.partials.marketingText.body1,
  color: theme.colors['text-light'],
  margin: 0,
  marginBottom: theme.spacing.xlarge,
  maxWidth: 760,
}))

const TabBar = styled.div(({ theme }) => ({
  display: 'flex',
  gap: 0,
  marginBottom: theme.spacing.xlarge,
}))

const ContentGrid = styled.div(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gap: theme.spacing.xlarge,
  alignItems: 'start',
  '@media (max-width: 900px)': {
    gridTemplateColumns: '1fr',
  },
}))

const EndpointTitleRow = styled.div(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing.small,
  marginBottom: theme.spacing.large,
}))

const EndpointName = styled.h2(({ theme }) => ({
  ...theme.partials.text.title2,
  margin: 0,
  color: theme.colors.text,
}))

const PathGroup = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing.xsmall,
}))

const EndpointPath = styled.span(({ theme }) => ({
  ...theme.partials.text.body2,
  color: theme.colors['text-light'],
  fontFamily: 'Monument Semi-Mono, monospace',
}))

const CopyIconButton = styled.button(({ theme }) => ({
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: 24,
  height: 24,
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  color: theme.colors['text-xlight'],
  padding: 0,
  borderRadius: theme.borderRadiuses.medium,
  '&:hover': {
    color: theme.colors.text,
    background: theme.colors['fill-one'],
  },
}))

const CopyIconWrapper = styled.span<{ $visible: boolean }>(({ $visible }) => ({
  position: 'absolute',
  inset: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  opacity: $visible ? 1 : 0,
  transform: $visible ? 'scale(1)' : 'scale(0.5)',
  transition:
    'opacity 0.3s ease-in-out, transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
  pointerEvents: 'none',
}))

const EditOnGithubRow = styled.div(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing.small,
  marginTop: theme.spacing.xxxlarge,
  paddingTop: theme.spacing.xlarge,
  borderTop: theme.borders.default,
  ...theme.partials.text.body2,
  color: theme.colors['text-xlight'],
  a: {
    display: 'flex',
    alignItems: 'center',
    gap: theme.spacing.xsmall,
    color: theme.colors['text-xlight'],
    textDecoration: 'none',
    '&:hover': { color: theme.colors.text, textDecoration: 'underline' },
  },
}))

const AuthContent = styled.div(({ theme }) => ({
  maxWidth: 760,
}))

const AuthTitle = styled.h1(({ theme }) => ({
  ...theme.partials.text.title1,
  margin: 0,
  marginBottom: theme.spacing.medium,
  color: theme.colors.text,
}))

const AuthBody = styled.div(({ theme }) => ({
  ...theme.partials.text.body1,
  color: theme.colors['text-light'],
  lineHeight: 1.7,
  p: {
    margin: `${theme.spacing.medium}px 0`,
  },
  ol: {
    paddingLeft: theme.spacing.xlarge,
    margin: `${theme.spacing.medium}px 0`,
  },
  li: {
    marginBottom: theme.spacing.xsmall,
  },
  code: {
    ...theme.partials.text.inlineCode,
    backgroundColor: theme.colors['fill-two'],
    padding: `2px ${theme.spacing.xxsmall}px`,
    borderRadius: theme.borderRadiuses.medium,
  },
  a: {
    color: theme.colors['action-link-inline'],
    textDecoration: 'none',
    '&:hover': { textDecoration: 'underline' },
  },
}))

// ─── Main component ────────────────────────────────────────────────────────────

export type RestApiReferenceProps = {
  apiSections: ApiSection[]
  endpointDetails: Record<string, EndpointDetail>
  selectedId: string
}

function slugToId(slug: string | string[] | undefined): string {
  const s = Array.isArray(slug) ? slug[0] : slug
  if (!s || s === 'authentication') return AUTH_PAGE_ID
  return s
}

export default function RestApiReference({
  apiSections = [],
  endpointDetails = {},
  selectedId: initialSelectedId,
}: RestApiReferenceProps) {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState<TabId>('query')

  const selectedId = router.query.slug
    ? slugToId(router.query.slug)
    : initialSelectedId

  const isAuthPage = selectedId === AUTH_PAGE_ID
  const detail = !isAuthPage ? endpointDetails[selectedId] : null
  const { copied: pathCopied, handleCopy: handleCopyPath } = useCopyText(
    detail?.path ?? ''
  )

  const handleSelect = useCallback(
    (id: string) => {
      const slug = id === AUTH_PAGE_ID ? 'authentication' : id
      router.push(`/api-reference/rest/${slug}`, undefined, { shallow: true })
      setActiveTab('query')
    },
    [router]
  )

  const currentLabel = isAuthPage
    ? 'Authentication'
    : detail?.operationName ?? selectedId

  const breadcrumbs = useMemo(
    () => [
      { label: 'Docs' },
      { label: 'API Reference', url: '/api-reference' },
      { label: 'REST API Reference', url: '/api-reference/rest' },
      { label: currentLabel },
    ],
    [currentLabel]
  )

  return (
    <PageContainer>
      <SidebarNav
        sections={apiSections}
        selectedId={selectedId}
        onSelect={handleSelect}
      />

      <MainArea>
        <MainScrollArea>
          <BreadcrumbsWrapper>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
          </BreadcrumbsWrapper>

          {isAuthPage && (
            <AuthContent>
              <AuthTitle>Authentication</AuthTitle>
              <AuthBody>
                <p>To authenticate to the REST API, just do the following:</p>
                <ol>
                  <li>
                    Create an access token (simple way is{' '}
                    <code>cmd + k → access tokens</code>)
                  </li>
                  <li>
                    Add an{' '}
                    <code>Authorization: Token {'<your-access-token>'}</code>{' '}
                    header.
                  </li>
                </ol>
                <p>
                  In addition, we offer a number of typed clients here:{' '}
                  <a
                    href="https://github.com/pluralsh/rest-clients"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    https://github.com/pluralsh/rest-clients
                  </a>
                </p>
              </AuthBody>
            </AuthContent>
          )}

          {!isAuthPage && detail && (
            <ContentGrid>
              <div>
                <EndpointTitleRow>
                  <EndpointName>{detail.operationName}</EndpointName>
                  <PathGroup>
                    <MethodBadge method={detail.method} />
                    <EndpointPath>{detail.path}</EndpointPath>
                    <CopyIconButton
                      onClick={() => handleCopyPath()}
                      type="button"
                      title={pathCopied ? 'Copied' : 'Copy path'}
                    >
                      <CopyIconWrapper $visible={!pathCopied}>
                        <CopyIcon size={16} />
                      </CopyIconWrapper>
                      <CopyIconWrapper $visible={pathCopied}>
                        <CheckIcon size={16} />
                      </CopyIconWrapper>
                    </CopyIconButton>
                  </PathGroup>
                </EndpointTitleRow>

                {detail.description && (
                  <PageDescription>{detail.description}</PageDescription>
                )}

                <TabBar>
                  <Tab
                    active={activeTab === 'query'}
                    onClick={() => setActiveTab('query')}
                  >
                    {(detail.parameters ?? []).some((p) => p.kind === 'body')
                      ? 'Body parameters'
                      : 'Query parameters'}
                  </Tab>
                  <Tab
                    active={activeTab === 'responses'}
                    onClick={() => setActiveTab('responses')}
                  >
                    Responses
                  </Tab>
                </TabBar>

                {activeTab === 'query' && (
                  <ParameterTable parameters={detail.parameters} />
                )}

                {activeTab === 'responses' && (
                  <ResponseSchemaView schemas={detail.responseSchemas ?? []} />
                )}
              </div>

              <ResponsePanel detail={detail} />
            </ContentGrid>
          )}

          <EditOnGithubRow>
            <a
              href="https://github.com/pluralsh/documentation"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GitHubLogoIcon size={20} />
              Edit on Github
            </a>
          </EditOnGithubRow>
        </MainScrollArea>
      </MainArea>
    </PageContainer>
  )
}
