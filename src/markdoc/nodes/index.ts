/* Markdoc nodes must be exported from this file to work with markdoc/nextjs plugin */

import { Tag } from '@markdoc/markdoc'
import { Table } from '@pluralsh/design-system/dist/markdoc/components'
import * as designSystemNodes from '@pluralsh/design-system/dist/markdoc/nodes'
import { isTag } from '@pluralsh/design-system/dist/markdoc/types'

export const nodes = {
  ...designSystemNodes,
  // slight fork of old DS version
  table: {
    render: Table,
    description: 'Display horizontal tabs in a box',
    children: ['tab'],
    attributes: {},
    transform(node, config) {
      const children = node.transformChildren(config)

      const thead = children
        .find(
          (child): child is Tag =>
            isTag(child) && child?.name.toLowerCase() === 'thead'
        )
        ?.children.find(
          (tr): tr is Tag => isTag(tr) && tr?.name.toLowerCase() === 'tr'
        )
        ?.children.filter(
          (th): th is Tag => isTag(th) && th?.name.toLowerCase() === 'th'
        )
        .map((th) => th.children)

      const tbody = children
        .find(
          (child): child is Tag =>
            isTag(child) && child?.name.toLowerCase() === 'tbody'
        )
        ?.children.filter(
          (tr): tr is Tag => isTag(tr) && tr?.name.toLowerCase() === 'tr'
        )
        ?.map((tr) =>
          tr.children
            .filter(
              (trChild): trChild is Tag =>
                isTag(trChild) && trChild?.name.toLowerCase() === 'td'
            )
            .map((td) => td.children)
        )

      return new Tag(
        this.render as any,
        { thead, tbody, children },
        node.transformChildren(config)
      )
    },
  },
}
