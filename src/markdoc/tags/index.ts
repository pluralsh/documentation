/* Use this file to export your markdoc tags */

import { defaultSchema } from '@pluralsh/design-system/dist/markdoc'

export { comment, head, script, link } from './nextjs.markdoc'

const {
  callout,
  calculator,
  embed,
  tabs,
  figure,
  caption,
  button,
  buttonGroup,
  codetabs,
} = defaultSchema.tags

export {
  callout,
  calculator,
  embed,
  tabs,
  figure,
  caption,
  button,
  buttonGroup,
  codetabs,
}

// export * from './callout.markdoc'
// export * from './calculator.markdoc'
// export * from './embed.markdoc'
// export * from './tabs.markdoc'
// // export * from '../nodes/link.markdoc'
// export { figure, caption } from './figure.markdoc'
// export { button, buttonGroup } from './button.markdoc'
// export * from './codetabs.markdoc'
