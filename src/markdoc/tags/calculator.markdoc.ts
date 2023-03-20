import { PricingCalculatorExtended } from '@pluralsh/design-system'

import { Tag } from '@markdoc/markdoc'

export const calculator = {
  render: PricingCalculatorExtended,
  description: 'Display extended version of pricing calculator',
  transform() {
    return new Tag(this.render as any)
  },
}
