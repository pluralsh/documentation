import { Tag } from '@markdoc/markdoc'
import unwrapParagraph from 'markdoc/utils/unwrapParagraphs'

import { FigCaption, Figure } from '../../components/md/Figure'

export const figure = {
  render: Figure,
  description: 'Display horizontal tabs in a box',
  children: ['tab'],
  attributes: {},
  transform(node, config) {
    const children = node
      .transformChildren(config)
      .map(child => {
        if (child.name === 'Paragraph') {
          for (const x of child.children as any[]) {
            if (x.name === 'Image') {
              x.attributes = { ...x.attributes, bareImage: true }
            }
          }

          return child.children
        }

        return child
      })
      .flat()

    return new Tag(this.render as any, {}, children)
  },
}

export const caption = {
  render: FigCaption,
  description: 'Display content in a tab',
  attributes: {
    title: {
      type: String,
      description: 'The title displayed on the tab',
    },
  },
  transform(node, config) {
    const children = node.transformChildren(config).map(unwrapParagraph).flat()

    return new Tag(this.render as any, {}, children)
  },
}
