import memoizeOne from 'memoize-one'

import client from '../apollo-client'
import { useFragment as asFragment } from '../gql/fragment-masking'

import {
  RECIPES_QUERY,
  REPOS_QUERY,
  RecipeFragment,
  RepoFragment,
} from './queries/recipesQueries'

import type { FragmentType } from '../gql/fragment-masking'
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

export const getRepo = async (repoName: string,
  repos: RepoFragmentFragment[]) => {
  const repo = repos.find(r => r.name === repoName)

  const { data: recipesData, error: recipesError } = await client.query({
    query: RECIPES_QUERY,
    variables: { repoName },
  })

  if (recipesError) {
    throw new Error(`${recipesError.name}: ${recipesError.message}`)
  }

  const recipes = (
      recipesData?.recipes?.edges?.map(edge => edge?.node) as FragmentType<
        typeof RecipeFragment
      >[]
  )
    .map(recipe => asFragment(RecipeFragment, recipe))
    .filter(r => r && !r.private) || []

  return {
    ...repo,
    recipes: recipes || [],
  }
}

export type Repo = Awaited<ReturnType<typeof getRepo>>
