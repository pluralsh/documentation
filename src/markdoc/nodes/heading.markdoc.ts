import { Heading } from '../../components/md/Heading'

import { Tag } from '@markdoc/markdoc'

function generateID(children: any[], attributes: { id?: unknown } = {}) {
  if (attributes?.id && typeof attributes?.id === 'string') {
    return attributes.id
  }

  return children
    .map(child => (typeof child === 'string'
      ? child
      : Array.isArray(child?.children)
        ? generateID(child.children)
        : ''))
    .join(' ')
    .replace(/[~!@#$%^&,.?:;<>()[\]@{}|=#$%]/g, ' ')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^a-zA-Z0-9_+\-*/]+/g, '')
    .toLowerCase()
}

export const heading = {
  render: Heading,
  children: ['inline'],
  attributes: {
    id: { type: String },
    level: { type: Number, required: true, default: 1 },
    className: { type: String },
  },
  transform(node, config) {
    const attributes = node.transformAttributes(config)
    const children = node.transformChildren(config)
    const id = generateID(children, attributes)

    return new Tag(this.render as any, { ...attributes, id }, children)
  },
}
