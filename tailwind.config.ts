import { type Config } from 'tailwindcss'
import { styledTheme } from '@pluralsh/design-system'

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: styledTheme.colors,
    extend: {},
  },
  plugins: [],
} satisfies Config
