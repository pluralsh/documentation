import capitalize from 'lodash/capitalize'
import memoizeOne from 'memoize-one'

import client from '../apollo-client'
import { ReposDocument } from '../generated/graphql'

import type {
  RecipeFragment,
  RepoFragment,
  ReposQuery,
  ReposQueryVariables,
} from '../generated/graphql'

const REMOVE_LIST = ['bootstrap', 'test-harness', 'gcp-config-connector']

export type Repo = Exclude<RepoFragment, null | undefined> & {
  displayName?: string
  recipes?: (RecipeFragment | undefined | null)[]
}

export const reposCache: {
  filtered: Repo[]
} = {
  filtered: [],
}

const replacements = {
  nvidia: 'NVIDIA',
  oauth: 'OAuth',
  sql: 'SQL',
}

const nameMap = {
  console: 'Plural Console',
  'renovate-on-prem': 'Renovate on Prem',
  nocodb: 'NocoDB',
  mongodb: 'MongoDB',
  rabbitmq: 'RabbitMQ',
  n8n: 'n8n',
  mlflow: 'MLflow',
  postgres: 'PostgreSQL',
  'argo-cd': 'Argo CD',
}

function fakeDisplayName(name = '') {
  let displayName: string =
    nameMap[name] ||
    name
      .split('-')
      .map((word) => capitalize(word))
      .join(' ')

  Object.entries(replacements).forEach(([s, r]) => {
    displayName = displayName.replace(RegExp(s, 'i'), r)
  })

  return displayName
}

function inRemoveList(repoName: string) {
  return !!REMOVE_LIST.find((name) => name === repoName)
}

const normalizeRepos = memoizeOne(
  (data: ReposQuery) =>
    data?.repositories?.edges?.flatMap((edge) => {
      const repo = edge?.node

      return repo && !inRemoveList(repo.name)
        ? {
            ...repo,
            displayName:
              ((repo as any).displayName as string) ||
              fakeDisplayName(repo?.name),
          }
        : []
    }) || []
)

export async function getRepos(): Promise<Repo[]> {
  const { data, error } = await client.query<ReposQuery, ReposQueryVariables>({
    query: ReposDocument,
  })

  if (error) {
    throw new Error(`${error.name}: ${error.message}`)
  }
  const filteredRepos = normalizeRepos(data)

  if (filteredRepos && filteredRepos.length > 0) {
    reposCache.filtered = filteredRepos

    return filteredRepos || []
  }

  throw new Error('No repos found')
}
