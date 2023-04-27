import { createGlobalStyle } from 'styled-components'
import mapValues from 'lodash/mapValues'

import { mqs } from './Breakpoints'

const fillAvailable = (prop) => ({
  [`${prop} `]: '-webkit-fill-available',
  [`${prop}  `]: '-moz-available',
  [`${prop}   `]: '-fill-available',
})

// Judo to get around specificity of emotion styles set by honorable
// and also allow tailwind classes to override
const textStyleWrap = (selector) => {
  return `body :is(div, h1, h2, h3, h4, h5, h6, p, *):where(${selector})`
}

const GlobalStyles = createGlobalStyle(({ theme }) => {
  const mText = theme.partials.marketingText
  return {
    'h1, h2, h3, h4, h5, h6': {
      margin: 0,
    },
    //  Text Styles
    [textStyleWrap('.hero1')]: {
      ...mText.hero1,
    },
    [textStyleWrap('.hero2')]: {
      ...mText.hero2,
    },
    [textStyleWrap('.body1')]: {
      ...mText.body1,
    },
    [textStyleWrap('.body2')]: {
      ...mText.body2,
    },
    [textStyleWrap('.body1Bold')]: {
      ...mText.body1Bold,
    },
    [textStyleWrap('.body2Bold')]: {
      ...mText.body2Bold,
    },
    [textStyleWrap('.bigHeader')]: {
      ...mText.bigHeader,
    },
    [textStyleWrap('.componentLink')]: {
      ...mText.componentLink,
    },
    [textStyleWrap('.componentLinkSmall')]: {
      ...mText.componentLinkSmall,
    },
    [textStyleWrap('.componentText')]: {
      ...mText.componentText,
    },
    [textStyleWrap('.inlineLink')]: {
      ...mText.inlineLink,
    },
    [textStyleWrap('.label')]: {
      ...mText.label,
    },
    [textStyleWrap('.navLink')]: {
      ...mText.navLink,
    },
    [textStyleWrap('.standaloneLink')]: {
      ...mText.standaloneLink,
    },
    [textStyleWrap('.subtitle1')]: {
      ...mText.subtitle1,
    },
    [textStyleWrap('.subtitle2')]: {
      ...mText.subtitle2,
    },
    [textStyleWrap('.title1')]: {
      ...mText.title1,
    },
    [textStyleWrap('.title2')]: {
      ...mText.title2,
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
  }
})

export default GlobalStyles
export { fillAvailable }
