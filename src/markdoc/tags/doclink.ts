import { DocLink } from '../../components/DocLink'

export const doclink = {
  render: DocLink,
  attributes: {
    to: { type: String, required: true },
    fallbackText: { type: String },
  },
  description: 'Link to another documentation page using its route ID',
  example: '{% doclink to="api-ref" %}API Reference{% /doclink %}',
}
