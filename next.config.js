const withPlugins = require('next-compose-plugins')
const withMarkdoc = require('@markdoc/next.js')(
  /* config: https://markdoc.io/docs/nextjs#options */ {
    schemaPath: './markdoc',
  }
)
const withTM = require('next-transpile-modules')(
  ['pluralsh-design-system', 'honorable', 'honorable-theme-default'],
  {
    debug: true,
  }
)

module.exports = () => {
  const plugins = [withMarkdoc, withTM]
  return plugins.reduce(
    (acc, next) => {
      return next(acc)
    },
    {
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
        ]
      },
      // webpack: (config) => {
      //   config.module.rules.push({
      //     test: /\.md$/,
      //     use: 'raw-loader',
      //   });
      //   return config;
      // },
    }
  )
}
