import { ApolloClient, InMemoryCache } from '@apollo/client'

const client = new ApolloClient({
  uri: 'https://app.plural.sh/gql',
  cache: new InMemoryCache(),
})

const directusToken = process.env.DIRECTUS_ACCESS_TOKEN

export const directusClient = new ApolloClient({
  uri: `https://directus.plural.sh/graphql${
    directusToken ? `?access_token=${directusToken}` : ''
  }`,
  cache: new InMemoryCache(),
})

export default client
