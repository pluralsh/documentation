import type { CodegenConfig } from '@graphql-codegen/cli'

const config: CodegenConfig = {
  overwrite: true,
  schema: 'https://app.plural.sh/gql',
  documents: ['src/**/*.(tsx|ts)', '!src/gql/**/*'],
  generates: {
    'src/gql/': {
      preset: 'client',
      plugins: [],
    },
  },
}

export default config
