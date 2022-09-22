import { Paragraph } from '../../components/md/Typography'

/* Use this file to export your markdoc nodes */
export * from './fence.markdoc'
export * from './heading.markdoc'
export * from './link.markdoc'
export * from './code.markdoc'
export * from './list.markdoc'

export const paragraph = {
  render: Paragraph,
  children: ['inline'],
}
