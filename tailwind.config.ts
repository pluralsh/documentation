import { type Config } from 'tailwindcss'

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    colors: {
      red: 'red',
    },
    extend: {},
  },
  plugins: [],
} satisfies Config
