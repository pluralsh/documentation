/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-process-env */
import { type CodegenConfig } from '@graphql-codegen/cli'
import { loadEnvConfig } from '@next/env'

// @ts-ignore
loadEnvConfig(process.cwd())

const directusToken = process.env.DIRECTUS_ACCESS_TOKEN

const config: CodegenConfig = {
  overwrite: true,
  generates: {
    'src/generated/graphqlPlural.ts': {
      schema: 'https://app.plural.sh/gql',
      documents: './src/graph/plural/*.graphql',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
        {
          add: {
            content: '/* eslint-disable */',
          },
        },
      ],
      config: {
        scalars: {
          Map: 'Map<string, unknown>',
          UploadOrUrl: 'string',
          DateTime: 'Date',
          Yaml: 'unknown',
        },
      },
    },
    'src/generated/graphqlDirectus.ts': {
      schema: `https://directus.plural.sh/graphql${
        directusToken ? `?access_token=${directusToken}` : ''
      }`,
      documents: './src/graph/directus/*.graphql',
      plugins: [
        'typescript',
        'typescript-operations',
        'typescript-react-apollo',
        {
          add: {
            content: '/* eslint-disable */\n// prettier-ignore',
            config: null,
          },
        },
      ],
    },
  },
  hooks: {
    afterAllFileWrite: ['eslint --fix'],
  },
}

export default config
