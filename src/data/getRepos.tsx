import memoizeOne from 'memoize-one'

import client from '../apollo-client'
import { useFragment as asFragment } from '../gql/fragment-masking'

import { REPOS_QUERY, RepoFragment } from './queries/recipesQueries'

import type { RepoFragmentFragment, ReposQuery } from '../gql/graphql'

export const reposCache: {
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
