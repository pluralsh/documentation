import { createGlobalStyle } from 'styled-components'

const mqs = {
  twoColumn: '@media screen and (min-width: 1000px)',
  threeColumn: '@media screen and (min-width: 1280px)',
  threeColumnLoose: '@media screen and (min-width: 1280px)',
  maxWidth: '@media screen and (min-width: 1588px)',
}

const GlobalStyles = createGlobalStyle(({ theme }) => ({
  '*:focus': {
    outline: 'none',
  },
  'a:focus-visible': {
    ...theme.partials.focus.default,
  },
  ':root': {
    '--top-nav-height': '90px',
  },
  body: {
    margin: 0,
    overflowX: 'hidden',
    overflowY: 'scroll',
    color: theme.colors.text,
    backgroundColor: theme.colors['fill-zero'],
  },

  '*': {
    scrollMarginTop: `calc(var(--top-nav-height) + ${theme.spacing.medium})`,
  },
}))

export default GlobalStyles
export {
  mqs,
}
