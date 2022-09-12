const withMarkdoc = require('@markdoc/next.js')

module.exports = withMarkdoc(
  /* config: https://markdoc.io/docs/nextjs#options */ {
    schemaPath: './markdoc',
  })({
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'md', 'mdoc'],
  async redirects() {
    return [
      { source: '/getting-started/readme', destination: '/', permanent: false },
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
