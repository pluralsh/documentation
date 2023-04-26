import { styledTheme } from '@pluralsh/design-system'

import { createTheme } from '@vanilla-extract/css'
import mapValues from 'lodash/mapValues'

const spacing = mapValues(styledTheme.spacing, (space) =>
  typeof space === 'number' ? `${space}px` : space
) as Record<string, string>

export const [themeClass, theme] = createTheme({
  color: {
    brand: 'blue',
  },
  font: {
    body: 'arial',
  },
  // spacing,
})
