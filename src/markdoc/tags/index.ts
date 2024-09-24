import * as designSystemTags from '@pluralsh/design-system/dist/markdoc/tags'

import { htmlTag } from './htmlTag.markdoc'
import { comment, head, link, script } from './nextjs.markdoc'

export const tags = {
  ...designSystemTags,
  comment,
  head,
  script,
  link,
  'html-tag': htmlTag,
}
