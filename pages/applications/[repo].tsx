import { InlineCode } from '@pluralsh/design-system'
import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next'
import { useRouter } from 'next/router'

import client from '../../src/apollo-client'
import { ContentHeader } from '../../src/components/MainContent'
import { CodeStyled } from '../../src/components/md/Fence'
import { Heading } from '../../src/components/md/Heading'
import { List, ListItem } from '../../src/components/md/List'
import Paragraph from '../../src/components/md/Paragraph'
import { useRepos } from '../../src/contexts/ReposContext'
import { useFragment } from '../../src/gql/fragment-masking'
import { RECIPES_QUERY, RecipeFragment, RepoFragment } from '../../src/queries/recipesQueries'
import { providerToProviderName } from '../../src/utils/text'
import { getRepos } from '../_app'

import type { FragmentType } from '../../src/gql/fragment-masking'

type PageProps = {
  recipes: FragmentType<typeof RecipeFragment>[]
}

export default function Repo({
  recipes,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter()
  const { repo: repoName } = router.query
  const repos = useRepos()
  const thisRepo = useFragment(RepoFragment,
    // eslint-disable-next-line react-hooks/rules-of-hooks
    repos.find(r => useFragment(RepoFragment, r).name === repoName))

  const tabs = recipes.map(r => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const recipe = useFragment(RecipeFragment, r)

    return {
      key: recipe.name,
      label:
        providerToProviderName[recipe?.provider?.toUpperCase() || '']
        || recipe.provider,
      language: 'shell',
      content: `plural bundle install ${thisRepo?.name} ${recipe.name}`,
    }
  })

  const recipeSections = useFragment(RecipeFragment, recipes[0])?.recipeSections

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
      <ContentHeader
        title={thisRepo?.name}
        description={thisRepo?.description || undefined}
        pageHasContent
      />
      <Heading level={2}>Description</Heading>
      <Paragraph>
        Plural will install {thisRepo?.name} in a dependency-aware manner onto a
        Plural-managed Kubernetes cluster with one CLI command.
      </Paragraph>
      <Heading level={2}>Installation</Heading>
      <Paragraph>
        We currently support {thisRepo?.name} for the following providers:
      </Paragraph>
      {tabs.length > 0 && <CodeStyled tabs={tabs} />}

      {recipeSections && hasConfig && (
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

export const getStaticProps: GetStaticProps<PageProps> = async context => {
  const { data: recipesData, error: recipesError } = await client.query({
    query: RECIPES_QUERY,
    variables: { repoName: (context?.params?.repo || '') as string },
  })

  if (recipesError) {
    throw new Error(`${recipesError.name}: ${recipesError.message}`)
  }

  const recipes: FragmentType<typeof RecipeFragment>[]
    = (
      recipesData?.recipes?.edges?.map(edge => edge?.node) as FragmentType<
        typeof RecipeFragment
      >[]
    ).filter(r => r && !useFragment(RecipeFragment, r)?.private) || []

  return {
    props: {
      recipes: recipes || [],
    },
    revalidate: 60,
  }
}
