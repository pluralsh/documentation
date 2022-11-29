import Fence from '../../components/md/Fence'

export const fence = {
  render: Fence,
  attributes: {
    content: { type: String, render: true, required: true },
    language: { type: String },
    process: { type: Boolean, render: true, default: false },
    showHeader: {
      type: Boolean,
      required: false,
      render: true,
    },
    title: { type: String, required: false },
    validate: (node, arg2) => {
      console.log('node', node)
      console.log('arg2', arg2)

      return [{ id: 'stuff', level: 'critical', message: 'Hey, its a message' }]
    },
  },
}
