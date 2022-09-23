import { Tag } from '@markdoc/markdoc'

import { Tab, Tabs } from '../../components/md/Tabs'

export const tabs = {
  render: Tabs,
  description: 'Display horizontal tabs in a box',
  children: ['tab'],
  attributes: {},
  transform(node, config) {
    const titles = node
      .transformChildren(config)
      .filter(child => child && child.name === 'Tab')
      .map(tab => (typeof tab === 'object' ? tab.attributes.title : null))

    return new Tag(this.render as any,
      { titles },
      node.transformChildren(config))
  },
}

export const tab = {
  render: Tab,
  description: 'Display content in a tab',
  attributes: {
    title: {
      type: String,
      description: 'The title displayed on the tab',
    },
  },
}
