// allows us to read the redirects object from the ts file
require('ts-node').register({
  compilerOptions: {
    module: 'commonjs',
    target: 'es2017',
  },
})

const { redirects } = require('./src/routing/docs-structure')

/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: [
    '@pluralsh/design-system',
    'honorable',
    'honorable-theme-default',
    'honorable-recipe-mapper',
  ],
  reactStrictMode: false,
  compiler: {
    // https://nextjs.org/docs/advanced-features/compiler#styled-components
    styledComponents: true,
    emotion: true,
  },
  pageExtensions: ['js', 'jsx', 'ts', 'tsx'],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.md$/,
      use: 'raw-loader',
    })

    return config
  },
  async redirects() {
    return redirects
  },
}

module.exports = nextConfig
