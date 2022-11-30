import * as config from './config'
import * as functions from './functions'
import { getSchema } from './mdSchemaTransforms'
import * as nodes from './nodes'
import * as tags from './tags'

import type { RenderableTreeNode } from '@markdoc/markdoc'

const baseSchema = {
  nodes,
  functions,
  tags,
  ...config,
}

export default baseSchema

const { components, ...schemaConfig } = getSchema(baseSchema)

export { components, schemaConfig as config }

export type MarkdocPage = {
  content: RenderableTreeNode
  frontmatter: Record<string, any>
  file: {
    path: string
  }
}
