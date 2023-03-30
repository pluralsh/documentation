import path from 'path'

import { InlineCode } from '@pluralsh/design-system'
import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
} from 'next'

import client from '../../src/apollo-client'
import MarkdocComponent from '../../src/components/MarkdocContent'
import { CodeStyled } from '../../src/components/md/Fence'
import { Heading } from '../../src/components/md/Heading'
import { List, ListItem } from '../../src/components/md/List'
import Paragraph from '../../src/components/md/Paragraph'
import { getAppMetaDescription } from '../../src/consts'
import { APP_CATALOG_BASE_URL } from '../../src/consts/routes'
import { getRepos } from '../../src/data/getRepos'
import { RecipesDocument } from '../../src/generated/graphql'
import { readMdFileCached } from '../../src/markdoc/mdParser'
import { providerToProviderName } from '../../src/utils/text'

import type {
  RecipeFragment,
  RecipesQuery,
  RecipesQueryVariables,
} from '../../src/generated/graphql'
import type { MarkdocHeading, MyPageProps } from '../_app'

function collectHeadings(node: any, sections: MarkdocHeading[] = []) {
  if (node) {
    if (node?.name === 'Heading') {
      const title = node.children[0]

      if (typeof title === 'string') {
        sections.push({
          ...node.attributes,
          title,
        })
      }
    }

    if (node?.children) {
      for (const child of node.children) {
        collectHeadings(child, sections)
      }
    }
  }

  return sections as MarkdocHeading[]
}

function isRecipe(
  recipe: RecipeFragment | null | undefined
): recipe is RecipeFragment {
  return !!recipe
}

export default function Repo({
  repo,
  markdoc,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const { recipes } = repo || {}

  const headings = collectHeadings(markdoc?.content)

  const mdHasConfig = !!headings.find((heading) =>
    heading?.title?.match(/configuration/gi)
  )

  const tabs = recipes?.filter(isRecipe).map((recipe) => ({
    key: recipe.name,
    label:
      providerToProviderName[recipe?.provider?.toUpperCase() || ''] ||
      recipe.provider,
    language: 'shell',
    content: `plural bundle install ${repo?.name} ${recipe.name}`,
  }))

  const recipeSections = Array.isArray(recipes) && recipes[0]?.recipeSections

  let recipeHasConfig = false

  if (recipeSections) {
    for (const section of recipeSections) {
      if (section?.configuration?.length || 0 > 0) {
        recipeHasConfig = true
        break
      }
    }
  }

  return (
    <div>
      <Heading level={2}>Description</Heading>
      <Paragraph>
        Plural will install {repo?.displayName} in a dependency-aware manner
        onto a Plural-managed Kubernetes cluster with one CLI command.
      </Paragraph>
      <Heading level={2}>Installation</Heading>
      <Paragraph>
        We currently support {repo?.displayName} for the following providers:
      </Paragraph>
      {tabs && tabs.length > 0 && <CodeStyled tabs={tabs} />}
      {!mdHasConfig && recipeSections && recipeHasConfig && (
        <>
          <Heading level={2}>Setup Configuration</Heading>
          <List ordered={false}>
            {recipeSections.map((section) =>
              section?.configuration?.map((x, configIdx) => (
                <ListItem key={configIdx}>
                  <InlineCode>{x?.name}</InlineCode>:{' '}
                  {x?.longform || x?.documentation}
                </ListItem>
              ))
            )}
          </List>
        </>
      )}
      {markdoc && <MarkdocComponent markdoc={markdoc} />}
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
    paths: repos.map((repo) => ({ params: { repo: repo?.name } })),
    fallback: true,
  }
}

export const getStaticProps: GetStaticProps<Partial<MyPageProps>> = async (
  context
) => {
  const repoName = context?.params?.repo

  const repos = await getRepos()
  const thisRepo = repos.find((r) => r.name === repoName)

  if (!thisRepo || !repoName || typeof repoName !== 'string') {
    return { notFound: true }
  }
  const mdFilePath = path.join(
    '/pages',
    APP_CATALOG_BASE_URL,
    `${repoName}.mdpart`
  )

  const markdoc = await readMdFileCached(mdFilePath)

  const { data: recipesData, error: recipesError } = await client.query<
    RecipesQuery,
    RecipesQueryVariables
  >({
    query: RecipesDocument,
    variables: { repoName },
  })

  if (recipesError) {
    throw new Error(`${recipesError.name}: ${recipesError.message}`)
  }

  const recipes =
    recipesData?.recipes?.edges
      ?.map((edge) => edge?.node)
      .filter((r) => r && !r?.private) || []

  return {
    props: {
      ...(markdoc ? { markdoc } : {}),
      displayTitle:
        markdoc?.frontmatter?.title || `Installing ${thisRepo?.displayName}`,
      displayDescription:
        markdoc?.frontmatter?.description || thisRepo?.description,
      metaDescription: getAppMetaDescription(thisRepo.displayName),
      repo: thisRepo
        ? {
            ...thisRepo,
            recipes: recipes || [],
          }
        : undefined,
    },
    revalidate: 600,
  }
}
