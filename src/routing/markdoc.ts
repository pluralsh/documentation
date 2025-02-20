import { DocLink } from './components'

export const doclink = {
  render: DocLink,
  attributes: {
    to: { type: String, required: true },
    fallbackText: { type: String },
  },
  description: 'Link to another documentation page using its route ID or key',
  example: '{% doclink to="api-ref" %}API Reference{% /doclink %}',
}
