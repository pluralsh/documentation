import { useContext } from 'react'

import { InlineCode } from '@pluralsh/design-system'

import { providerToProviderName } from '../utils/text'

import { ContentHeader } from './MainContent'
import { CodeStyled } from './md/Fence'
import { Heading } from './md/Heading'
import { List, ListItem } from './md/List'
import Paragraph from './md/Paragraph'
import { PagePropsContext } from './PagePropsContext'

import type { Repo } from '../data/repos'

type PageProps = {
  repo: Repo
  Component: any
}

export default function Repo({ repo, Component }: PageProps) {
  const tabs = repo?.recipes?.map(recipe => ({
    key: recipe.name,
    label:
      providerToProviderName[recipe?.provider?.toUpperCase() || '']
      || recipe.provider,
    language: 'shell',
    content: `plural bundle install ${repo?.name} ${recipe.name}`,
  }))
  const pageProps = useContext(PagePropsContext) || {}

  const recipeSections
    = Array.isArray(repo?.recipes) && repo?.recipes[0].recipeSections

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
        title={pageProps.markdoc?.frontmatter?.title || repo?.name}
        description={
          pageProps.markdoc?.frontmatter?.description
          || repo?.description
          || undefined
        }
        pageHasContent
      />
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

      {!Component && recipeSections && hasConfig && (
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

      {Component && <Component {...pageProps} />}
    </div>
  )
}
