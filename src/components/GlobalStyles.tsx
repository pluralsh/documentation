import { createGlobalStyle } from 'styled-components'

const mqs = {
  twoColumn: '@media screen and (min-width: 1000px)',
  fullHeader: '@media screen and (min-width: 1000px)',
  fullHeaderLoose: '@media screen and (min-width: 1180px)',
  threeColumn: '@media screen and (min-width: 1280px)',
  threeColumnLoose: '@media screen and (min-width: 1280px)',
  maxWidth: '@media screen and (min-width: 1588px)',
}

const fillAvailable = prop => ({
  [`${prop} `]: '-webkit-fill-available',
  [`${prop}  `]: '-moz-available',
  [`${prop}   `]: '-fill-available',
})

const GlobalStyles = createGlobalStyle(({ theme }) => ({
  '::selection': {
    background: theme.colors['text-primary-accent'],
    color: theme.colors['fill-one'],
  },
  '*:focus': {
    outline: 'none',
  },
  'a:focus-visible': {
    ...theme.partials.focus.default,
  },
  ':root': {
    '--top-nav-height': '72px',
  },
  html: {
    ...fillAvailable('height'),
  },
  body: {
    margin: 0,
    overflowX: 'hidden',
    overflowY: 'scroll',
    color: theme.colors.text,
    backgroundColor: theme.colors['fill-zero'],
    ...fillAvailable('minHeight'),
  },
  '*': {
    scrollMarginTop: `calc(var(--top-nav-height) + ${theme.spacing.medium}px)`,
    scrollPaddingTop: `calc(var(--top-nav-height) + ${theme.spacing.xlarge}px)`,
  },
  [mqs.twoColumn]: {
    ':root': {
      '--top-nav-height': '80px',
    },
  },
}))

export default GlobalStyles
export { mqs, fillAvailable }
