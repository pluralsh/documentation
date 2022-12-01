import capitalize from 'lodash/capitalize'
import memoizeOne from 'memoize-one'

import client from '../apollo-client'
import { useFragment as asFragment } from '../gql/fragment-masking'

import { REPOS_QUERY, RepoFragment } from './queries/recipesQueries'

import type { RecipeFragmentFragment, RepoFragmentFragment, ReposQuery } from '../gql/graphql'

const REMOVE_LIST = ['bootstrap', 'test-harness', 'gcp-config-connector']

export type Repo = {
  displayName?: string
  recipes?: RecipeFragmentFragment[]
} & RepoFragmentFragment

export const reposCache: {
  filtered: Repo[]
} = {
  filtered: [],
}

const replacements = {
  nvidia: 'NVIDIA',
  oauth: 'OAuth',
  sql: 'SQL',
  db: 'DB',
}

const nameMap = {
  console: 'Plural Console',
  'renovate-on-prem': 'Renovate on Prem',
  nocodb: 'NocoDB',
  rabbitmq: 'RabbitMQ',
  n8n: 'n8n',
  mlflow: 'MLflow',
  postgres: 'PostgreSQL',
}

function fakeDisplayName(name = '') {
  let displayName: string
    = nameMap[name]
    || name
      .split('-')
      .map(word => capitalize(word))
      .join(' ')

  Object.entries(replacements).forEach(([s, r]) => {
    displayName = displayName.replace(RegExp(s, 'i'), r)
  })

  return displayName
}

function inRemoveList(repoName: string) {
  return !!REMOVE_LIST.find(name => name === repoName)
}

function repoFilter(repo: Repo | undefined | null): repo is Repo {
  return !!(repo && !repo.private && !inRemoveList(repo.name))
}

function filterRepos(data: ReposQuery): Repo[] {
  return data?.repositories?.edges
    ?.map(edge => edge?.node)
    .map(node => {
      const repo = asFragment(RepoFragment, node)

      if (!repo) return null

      return {
        ...repo,
        displayName:
          ((repo as any).displayName as string) || fakeDisplayName(repo?.name),
      }
    })
    .filter(repoFilter) as Repo[]
}

const filterReposMemoized = memoizeOne(filterRepos)

export async function getRepos() {
  const { data, error } = await client.query({ query: REPOS_QUERY })

  if (error) {
    throw new Error(`${error.name}: ${error.message}`)
  }
  const filteredRepos = filterReposMemoized(data)

  if (filteredRepos && filteredRepos.length > 0) {
    reposCache.filtered = filteredRepos

    return filteredRepos || []
  }

  throw new Error('No repos found')
}
