/** @type {import('tailwindcss').Config} */

const { styledTheme } = require('@pluralsh/design-system')

export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: styledTheme.colors,
      spacing: {
        '3xs': '2px',
        '2xs': '4px',
        xs: '8px',
        s: '12px',
        m: '16px',
        l: '24px',
        xl: '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '96px',
        '5xl': '128px',
      },
    },
  },
  plugins: [],
}
