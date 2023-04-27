import { type Config } from 'tailwindcss'
import { styledTheme } from '@pluralsh/design-system'
import mapValues from 'lodash/mapValues'

const spacing = {
  ...mapValues(styledTheme.spacing, (space) => {
    return typeof space === 'number' ? `${space}px` : space
  }),
  '0': '0',
}

console.log('spacing', spacing)
const colors = {
  ...styledTheme.colors,
  jerry: 'red',
}
console.log('colors', colors)

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: colors,
    spacing: spacing,
    extend: {},
  },
  plugins: [],
} satisfies Config
