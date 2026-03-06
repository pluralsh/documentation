/**
 * REST API Reference — catch-all route.
 *
 * URL structure:
 *   /api-reference/rest                → Authentication page
 *   /api-reference/rest/authentication → Authentication page
 *   /api-reference/rest/{operationId}  → Endpoint detail page
 *
 * Data is loaded at runtime via getServerSideProps and cached per-pod.
 */

import type { GetServerSideProps } from 'next'

import { RestApiReference, slugToId } from '@src/components/RestApiReference'
import { AUTH_PAGE_ID } from '@src/components/RestApiReference/SidebarNav'

import type { ApiSection, EndpointDetail } from '@src/lib/openapi-rest'

type RestPageProps = {
  apiSections: ApiSection[]
  endpointDetails: Record<string, EndpointDetail>
  selectedId: string
}

export function RestPage({
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

export const getServerSideProps: GetServerSideProps<RestPageProps> = async ({
  params,
}) => {
  const { fetchRestApiData } = await import('@src/lib/openapi-rest')
  const { apiSections, endpointDetails } = await fetchRestApiData()

  const slugId = slugToId(params?.slug)

  if (!(endpointDetails[slugId] || slugId === AUTH_PAGE_ID))
    return { notFound: true }

  return {
    props: {
      displayTitle: 'REST API Reference',
      apiSections,
      endpointDetails,
      selectedId: slugId,
    },
  }
}

export default RestPage
