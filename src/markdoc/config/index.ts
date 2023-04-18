import { defaultSchema } from '@pluralsh/design-system/dist/markdoc'
import merge from 'lodash/merge'

const config = merge(defaultSchema, {
  variables: { docsGlobalTextVar: 'Docs global content' },
})

export default config
