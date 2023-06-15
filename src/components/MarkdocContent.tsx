import React from 'react'

import { renderers } from '@markdoc/markdoc'

import { type MarkdocPage, components } from '../markdoc/mdSchema'

export default function MarkdocComponent({
  markdoc,
  components: userComponents = {},
}: {
  markdoc: MarkdocPage
  components?: any
}) {
  if (!markdoc) {
    return null
  }

  const node = renderers.react(markdoc.content, React, {
    components: {
      ...components,
      // Allows users to override default components
      ...userComponents,
    },
  })

  // eslint-disable-next-line react/jsx-no-useless-fragment
  return <>{node}</>
}
