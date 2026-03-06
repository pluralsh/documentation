/**
 * REST API Reference — catch-all route.
 *
 * URL structure:
 *   /api-reference/rest                → Authentication page
 *   /api-reference/rest/authentication → Authentication page
 *   /api-reference/rest/{operationId}  → Endpoint detail page
 */

import type { GetStaticPaths, GetStaticProps } from 'next'

import RestApiReference from '@src/components/RestApiReference'
import { AUTH_PAGE_ID } from '@src/components/RestApiReference/SidebarNav'

import type { ApiSection, EndpointDetail } from '@src/lib/openapi-rest'

type RestPageProps = {
  apiSections: ApiSection[]
  endpointDetails: Record<string, EndpointDetail>
  selectedId: string
}

function RestPage({
  apiSections = [],
  endpointDetails = {},
  selectedId,
}: RestPageProps) {
  return (
    <RestApiReference
      apiSections={apiSections}
      endpointDetails={endpointDetails}
      selectedId={selectedId}
    />
  )
}

RestPage.customLayout = true

export const getStaticPaths: GetStaticPaths = async () => {
  const { fetchRestApiData } = await import('@src/lib/openapi-rest')
  const { endpointDetails } = await fetchRestApiData()

  const paths = [
    { params: { slug: [] } },
    { params: { slug: ['authentication'] } },
    ...Object.keys(endpointDetails).map((id) => ({
      params: { slug: [id] },
    })),
  ]

  return { paths, fallback: 'blocking' }
}

export const getStaticProps: GetStaticProps<RestPageProps> = async ({
  params,
}) => {
  const { fetchRestApiData } = await import('@src/lib/openapi-rest')
  const { apiSections, endpointDetails } = await fetchRestApiData()

  const slug = (params?.slug as string[] | undefined)?.[0]

  let selectedId: string

  if (!slug || slug === 'authentication') {
    selectedId = AUTH_PAGE_ID
  } else if (endpointDetails[slug]) {
    selectedId = slug
  } else {
    return { notFound: true }
  }

  return {
    props: {
      displayTitle: 'REST API Reference',
      apiSections,
      endpointDetails,
      selectedId,
    },
  }
}

export default RestPage
