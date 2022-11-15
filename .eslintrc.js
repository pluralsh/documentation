module.exports = {
  extends: [
    '@pluralsh/eslint-config-typescript',
  ],
  globals: {
    JSX: true,
  },
  rules: {
    'import/order': [
      'error',
      {
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'type',
          'unknown',
        ],
      },
    ],
  },
}
