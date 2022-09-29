import Callout from '../../components/md/Callout'

export const callout = {
  render: Callout,
  description: 'Display the enclosed content in a callout box',
  children: ['paragraph', 'tag', 'list'],
  attributes: {
    style: {
      type: String,
      description: '"info", "warning", "success", or "danger"',
    },
    size: {
      type: String,
      description: '"full" or "compact"',
    },
    title: {
      type: String,
      description: 'The title displayed at the top of the callout',
    },
  },
}
