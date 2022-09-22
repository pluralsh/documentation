import { Tag } from '@markdoc/markdoc'

import Fence from '../../components/md/Fence'

export const fence = {
  render: Fence,
  attributes: {
    content: { type: String, render: false, required: true },
    language: { type: String, render: 'data-language' },
    process: { type: Boolean, render: false, default: true },
  },
  transform(node, config) {
    const attributes = node.transformAttributes(config)
    const children = node.children.length
      ? node.transformChildren(config)
      : [node.attributes.content]

    return new Tag(this.render as any, attributes, children)
  },
}
