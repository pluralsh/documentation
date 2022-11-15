/* eslint-disable @typescript-eslint/no-var-requires */
// eslint-disable-next-line function-paren-newline
const withMarkdoc = require('@markdoc/next.js')(
  /* config: https://markdoc.io/docs/nextjs#options */ {
    schemaPath: './src/markdoc',
  })
const withTM = require('next-transpile-modules')(['@pluralsh/design-system', 'honorable', 'honorable-theme-default'],
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
          permanent: true,
        },
        {
          source: '/getting-started/getting-started',
          destination: '/getting-started/quickstart',
          permanent: true,
        },
        {
          source: '/reference/architecture-1',
          destination: '/reference/architecture',
          permanent: true,
        },
        {
          source: '/reference/workspaces/workspace-structure',
          destination: '/reference/workspaces',
          permanent: true,
        },
        {
          source: '/getting-started/getting-started-with-runbooks/runbook-yaml',
          destination: '/adding-new-application/getting-started-with-runbooks/runbook-yaml',
          permanent: true,
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
