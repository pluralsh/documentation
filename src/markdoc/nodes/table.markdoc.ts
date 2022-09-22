import { Schema } from '@markdoc/markdoc'

export const table = {
  render: 'table',
}

export const thead: Schema = {
  render: 'thead',
  children: ['tr'],
}

export const tbody: Schema = {
  render: 'tbody',
  children: ['tr', 'tag'],
}

export const tr: Schema = {
  render: 'tr',
  children: ['th', 'td'],
}

export const td: Schema = {
  render: 'td',
  children: [
    'inline',
    'heading',
    'paragraph',
    'image',
    'table',
    'tag',
    'fence',
    'blockquote',
    'list',
    'hr',
  ],
  attributes: {
    colspan: { type: Number },
    rowspan: { type: Number },
    align: { type: String },
  },
}

export const th: Schema = {
  render: 'th',
  attributes: {
    width: { type: Number },
    align: { type: String },
  },
}
