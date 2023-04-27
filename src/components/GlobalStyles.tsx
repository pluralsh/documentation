import mapKeys from 'lodash/mapKeys'
import { createGlobalStyle } from 'styled-components'

import { mqs } from './Breakpoints'

const fillAvailable = (prop) => ({
  [`${prop} `]: '-webkit-fill-available',
  [`${prop}  `]: '-moz-available',
  [`${prop}   `]: '-fill-available',
})

// Judo to get around specificity of emotion styles set by honorable
// and also allow tailwind classes to override
const textStyleWrap = (selector) =>
  `body :is(div, h1, h2, h3, h4, h5, h6, p, *):where(${selector})`

const GlobalStyles = createGlobalStyle(({ theme }) => {
  const marketingTextStyles = mapKeys(
    theme.partials.marketingText,
    (value, key) => textStyleWrap(`.${key}`)
  )

  return {
    'h1, h2, h3, h4, h5, h6': {
      margin: 0,
    },
    //  Text Styles
    ...marketingTextStyles,
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
  }
})

export default GlobalStyles
export { fillAvailable }
