import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/router'
import { InlineCode } from '@pluralsh/design-system'
import { RECIPES_QUERY, RecipeFragment, RepoFragment } from '../../src/queries/recipesQueries'
import { CodeStyled } from '../../src/components/md/Fence'
import { Heading } from '../../src/components/md/Heading'
import { List, ListItem } from '../../src/components/md/List'
import Paragraph from '../../src/components/md/Paragraph'
import { useRepos } from '../../src/contexts/ReposContext'

import { ContentHeader } from '../../src/components/MainContent'

import { FragmentType, useFragment } from '../../src/gql/fragment-masking'
import client from '../../src/apollo-client'
import { providerToProviderName } from '../../src/utils/text'

type PageProps = {
  recipes: FragmentType<typeof RecipeFragment>[]
}

export default function Repo({
  recipes,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
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
            {recipeSections.map((section, i) => section?.configuration?.map(x => (
              <ListItem key={i}>
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

export const getServerSideProps: GetServerSideProps<
  PageProps
> = async context => {
  console.log('context?.query?.repo', context.query.repo)
  try {
    const { data: recipesData, error: _recipesError } = await client.query({
      query: RECIPES_QUERY,
      variables: { repoName: (context?.query?.repo || '') as string },
    })

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
    }
  }
  catch (err) {
    const e = err as any

    if (e.graphQLErrors) {
      for (const gqlError of e.graphQLErrors) {
        console.error('gqlError', gqlError)
      }
    }

    return {
      props: {
        recipes: [],
      },
    }
  }
}
