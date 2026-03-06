/**
 * REST API Reference - main composition.
 * Composes SidebarNav, ParameterTable, ResponsePanel, MethodBadge.
 * Data passed as props; no fetching.
 */

import { useCallback, useMemo, useState } from 'react'

import { Breadcrumbs, CheckIcon, CopyIcon, Tab } from '@pluralsh/design-system'
import { useRouter } from 'next/router'

import PageFooter, { EditOnGitHubLink } from '@src/components/PageFooter'
import { useCopyText } from '@src/hooks/useCopyText'

import { AuthPageContent } from './AuthPageContent'
import { MethodBadge } from './MethodBadge'
import { ParameterTable } from './ParameterTable'
import { ResponsePanel } from './ResponsePanel'
import { ResponseSchemaView } from './ResponseSchemaView'
import {
  BreadcrumbsWrapper,
  ContentGrid,
  CopyIconButton,
  CopyIconWrapper,
  EndpointName,
  EndpointPath,
  EndpointTitleRow,
  FooterSection,
  MainArea,
  MainScrollArea,
  PageContainer,
  PageDescription,
  PathGroup,
  TabBar,
} from './RestApiReference.styles'
import { AUTH_PAGE_ID, SidebarNav } from './SidebarNav'

import type { ApiSection, EndpointDetail } from '@src/lib/openapi-rest'

type TabId = 'query' | 'responses'

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

          {isAuthPage && <AuthPageContent />}

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

          <FooterSection>
            {isAuthPage && (
              <EditOnGitHubLink
                href="https://github.com/pluralsh/documentation/blob/main/src/components/RestApiReference/AuthPageContent.tsx"
                target="_blank"
                rel="noopener noreferrer"
              />
            )}
            <PageFooter />
          </FooterSection>
        </MainScrollArea>
      </MainArea>
    </PageContainer>
  )
}
