/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line function-paren-newline
const withMarkdoc = require('@markdoc/next.js')(
  /* config: https://markdoc.io/docs/nextjs#options */ {
    schemaPath: './src/markdoc',
  }
)
const withTM = require('next-transpile-modules')(
  ['@pluralsh/design-system', 'honorable', 'honorable-theme-default'],
  {
    debug: false,
  }
)

module.exports = () => {
  const plugins = [withMarkdoc, withTM]

  return plugins.reduce((acc, next) => next(acc), {
    reactStrictMode: false,
    compiler: {
      // https://nextjs.org/docs/advanced-features/compiler#styled-components
      styledComponents: true,
      emotion: true,
    },
    i18n: {
      locales: ['en-US'],
      defaultLocale: 'en-US',
    },
    pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdoc'],
    async redirects() {
      return []
    },
  })
}
