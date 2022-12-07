/*
Guide to typing fragments:
https://www.the-guild.dev/blog/unleash-the-power-of-fragments-with-graphql-codegen
https://the-guild.dev/graphql/codegen/docs/guides/react-vue#writing-graphql-fragments
*/

import { graphql } from '../../gql'

export const RepoFragment = graphql(`
  fragment RepoFragment on Repository {
    id
    name
    description
    documentation
    icon
    darkIcon
    private
    tags {
      tag
    }
  }
`)

export const RecipeFragment = graphql(`
  fragment RecipeFragment on Recipe {
    name
    description
    provider
    private
    repository {
      description
    }
    recipeSections {
      repository {
        name
      }
      configuration {
        name
        type
        optional
        documentation
        longform
      }
    }
  }
`)

export const RECIPES_QUERY = graphql(`
  query Recipes($repoName: String!) {
    recipes(repositoryName: $repoName, first: 500) {
      edges {
        node {
          ...RecipeFragment
        }
      }
    }
  }
`)

export const REPOS_QUERY = graphql(`
  query Repos {
    repositories(first: 5000) {
      edges {
        node {
          ...RepoFragment
        }
      }
    }
  }
`)
