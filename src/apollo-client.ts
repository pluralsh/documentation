import { ApolloClient, InMemoryCache } from '@apollo/client'

const token = process.env.GRAPHQL_TOKEN

const client = new ApolloClient({
  uri: 'https://app.plural.sh/gql',
  cache: new InMemoryCache(),
  headers: { authorization: token ? `Bearer ${token}` : '' },
})

export default client
