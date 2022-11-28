module.exports = {
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: ['@pluralsh/eslint-config-typescript'],
  globals: {
    JSX: true,
  },
  rules: {
    '@typescript-eslint/consistent-type-exports': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
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
  overrides: [
    {
      files: ['.eslintrc.js'],
      parserOptions: {
        project: null,
      },
    },
  ],
  ignorePatterns: ['src/gql/**/*'],
}
