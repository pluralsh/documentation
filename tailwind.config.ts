import { type Config } from 'tailwindcss'
import { styledTheme } from '@pluralsh/design-system'
import mapValues from 'lodash/mapValues'

const spacing = mapValues(styledTheme.spacing, (space) => {
  return typeof space === 'number' ? `${space}px` : space
}) as Record<string, string>

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: styledTheme.colors,
    spacing: spacing,
    extend: {},
  },
  plugins: [],
} satisfies Config
