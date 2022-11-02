import Fence from '../../components/md/Fence'

export const fence = {
  render: Fence,
  attributes: {
    content: { type: String, render: true, required: true },
    language: { type: String },
    process: { type: Boolean, render: true, default: false },
    showHeader: { type: Boolean, required: false },
    title: { type: String, required: false },
  },
}
