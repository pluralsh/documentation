import { createGlobalStyle } from 'styled-components'

import { mqs } from './Breakpoints'

const fillAvailable = (prop) => ({
  [`${prop} `]: '-webkit-fill-available',
  [`${prop}  `]: '-moz-available',
  [`${prop}   `]: '-fill-available',
})

const GlobalStyles = createGlobalStyle(({ theme }) => ({
  //  Text Styles
  '.hero1': {
    ...theme.partials.marketingText.hero1,
  },
  '.hero2': {
    ...theme.partials.marketingText.hero2,
  },
  '.body1': {
    ...theme.partials.marketingText.body1,
  },
  '.body2': {
    ...theme.partials.marketingText.body2,
  },
  '.body1Bold': {
    ...theme.partials.marketingText.body1Bold,
  },
  '.body2Bold': {
    ...theme.partials.marketingText.body2Bold,
  },
  '.bigHeader': {
    ...theme.partials.marketingText.bigHeader,
  },
  '.componentLink': {
    ...theme.partials.marketingText.componentLink,
  },
  '.componentLinkSmall': {
    ...theme.partials.marketingText.componentLinkSmall,
  },
  '.componentText': {
    ...theme.partials.marketingText.componentText,
  },
  '.inlineLink': {
    ...theme.partials.marketingText.inlineLink,
  },
  '.label': {
    ...theme.partials.marketingText.label,
  },
  '.navLink': {
    ...theme.partials.marketingText.navLink,
  },
  '.standaloneLink': {
    ...theme.partials.marketingText.standaloneLink,
  },
  '.subtitle1': {
    ...theme.partials.marketingText.subtitle1,
  },
  '.subtitle2': {
    ...theme.partials.marketingText.subtitle2,
  },
  '.title1': {
    ...theme.partials.marketingText.title1,
  },
  '.title2': {
    ...theme.partials.marketingText.title2,
  },
  // /* End Text Styles */

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
    '--menu-extra-bpad': '0px',
  },
  'a:any-link': {
    color: 'unset',
    textDecoration: 'unset',
  },
  html: {
    ...fillAvailable('height'),
  },
  body: {
    margin: 0,
    overflowX: 'hidden',
    color: theme.colors.text,
    backgroundColor: theme.colors['fill-zero'],
    ...fillAvailable('minHeight'),
  },
  '*': {
    scrollPaddingTop: 'var(--top-nav-height)',
    scrollMarginTop: `${theme.spacing.large}px`,
  },
  [mqs.twoColumn]: {
    ':root': {
      '--top-nav-height': '80px',
    },
  },
}))

export default GlobalStyles
export { fillAvailable }
