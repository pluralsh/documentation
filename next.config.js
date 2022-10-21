/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line function-paren-newline
const withMarkdoc = require('@markdoc/next.js')(
  /* config: https://markdoc.io/docs/nextjs#options */ {
    schemaPath: './src/markdoc',
  })
const withTM = require('next-transpile-modules')(['pluralsh-design-system', 'honorable', 'honorable-theme-default'],
  {
    debug: false,
  })

module.exports = () => {
  const plugins = [withMarkdoc, withTM]

  return plugins.reduce((acc, next) => next(acc), {
    reactStrictMode: true,
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
      return [
        {
          source: '/getting-started/readme',
          destination: '/',
          permanent: false,
        },
        {
          source: '/getting-started/getting-started',
          destination: '/getting-started/quickstart',
          permanent: false,
        },
        {
          source: '/reference/architecture-1',
          destination: '/reference/architecture',
          permanent: false,
        },
      ]
    },
    // webpack: (config) => {
    //   config.module.rules.push({
    //     test: /\.md$/,
    //     use: 'raw-loader',
    //   });
    //   return config;
    // },
  })
}
