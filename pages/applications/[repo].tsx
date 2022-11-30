import path from 'path'

import { InlineCode } from '@pluralsh/design-system'
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'

import client from '../../src/apollo-client'
import { ContentHeader } from '../../src/components/MainContent'
import MarkdocComponent from '../../src/components/MarkdocContent'
import { CodeStyled } from '../../src/components/md/Fence'
import { Heading } from '../../src/components/md/Heading'
import { List, ListItem } from '../../src/components/md/List'
import Paragraph from '../../src/components/md/Paragraph'
import { APP_CATALOG_BASE_URL } from '../../src/consts/routes'
import { useRepos } from '../../src/contexts/ReposContext'
import { getRepos } from '../../src/data/getRepos'
import { RECIPES_QUERY, RecipeFragment, RepoFragment } from '../../src/data/queries/recipesQueries'
import { useFragment as asFragment } from '../../src/gql/fragment-masking'
import { readMdFileCached } from '../../src/markdoc/mdParser'
import { providerToProviderName } from '../../src/utils/text'

import type { FragmentType } from '../../src/gql/fragment-masking'
import type { RecipeFragmentFragment } from '../../src/gql/graphql'
import type { MarkdocPage } from '../../src/markdoc/mdSchema'
import type { MyPageProps } from '../_app'

export default function Repo({
  repo,
  markdoc,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { recipes } = repo || {}

  const tabs = recipes?.map(recipe => ({
    key: recipe.name,
    label:
        providerToProviderName[recipe?.provider?.toUpperCase() || '']
        || recipe.provider,
    language: 'shell',
    content: `plural bundle install ${repo?.name} ${recipe.name}`,
  }))

  const recipeSections
    = Array.isArray(recipes)
    && asFragment(RecipeFragment, recipes[0])?.recipeSections

  let hasConfig = false

  if (recipeSections) {
    for (const section of recipeSections) {
      if (section?.configuration?.length || 0 > 0) {
        hasConfig = true
        break
      }
    }
  }

  return (
    <div>
      <Heading level={2}>Description</Heading>
      <Paragraph>
        Plural will install {repo?.name} in a dependency-aware manner onto a
        Plural-managed Kubernetes cluster with one CLI command.
      </Paragraph>
      <Heading level={2}>Installation</Heading>
      <Paragraph>
        We currently support {repo?.name} for the following providers:
      </Paragraph>
      {tabs && tabs.length > 0 && <CodeStyled tabs={tabs} />}
      {/* {markdoc && <MarkdocComponent markdoc={markdoc} />} */}
      {!markdoc && recipeSections && hasConfig && (
        <>
          <Heading level={2}>Setup configuration</Heading>
          <List ordered={false}>
            {recipeSections.map(section => section?.configuration?.map((x, configIdx) => (
              <ListItem key={configIdx}>
                <InlineCode>{x?.name}</InlineCode>:{' '}
                {x?.longform || x?.documentation}
              </ListItem>
            )))}
          </List>
        </>
      )}
    </div>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  if (process.env.NODE_ENV === 'development') {
    return {
      paths: [],
      fallback: 'blocking',
    }
  }

  const repos = (await getRepos()) || []

  return {
    paths: repos.map(repo => ({ params: { repo: repo?.name } })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<
  Partial<MyPageProps>
> = async context => {
  const repoName = context?.params?.repo

  const repos = getRepos()
  const thisRepo = (await repos).find(r => r.name === repoName)

  if (!repoName || typeof repoName !== 'string') {
    return { notFound: true }
  }
  const mdFilePath = path.join('/pages',
    APP_CATALOG_BASE_URL,
    `${repoName}.partial.md`)

  const markdoc = await readMdFileCached(mdFilePath)

  const { data: recipesData, error: recipesError } = await client.query({
    query: RECIPES_QUERY,
    variables: { repoName },
  })

  if (recipesError) {
    throw new Error(`${recipesError.name}: ${recipesError.message}`)
  }

  const recipes: RecipeFragmentFragment[]
    = (
      recipesData?.recipes?.edges?.map(edge => edge?.node) as FragmentType<
        typeof RecipeFragment
      >[]
    )
      .map(r => asFragment(RecipeFragment, r))
      .filter(r => r && !r?.private) || []

  return {
    props: {
      markdoc,
      title: markdoc?.frontmatter?.title || repoName,
      description: markdoc?.frontmatter?.description || thisRepo?.description,
      repo: {
        ...thisRepo,
        recipes: recipes || [],
      },
    },
    revalidate: 600,
  }
}
