module.exports = {
  parserOptions: {
    project: './tsconfig.json',
  },
  extends: ['@pluralsh/eslint-config-typescript', 'prettier'],
  globals: {
    JSX: true,
  },
  rules: {
    '@typescript-eslint/consistent-type-exports': 'error',
    '@typescript-eslint/consistent-type-imports': 'error',
    'import-newlines/enforce': 'off',
    'import/order': [
      'error',
      {
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'after',
          },
          {
            pattern: '{next,next/*,@pluralsh/design-system,honorable}',
            group: 'external',
            position: 'before',
          },
        ],
        pathGroupsExcludedImportTypes: [
          'react',
          '{next/*,next,@pluralsh/design-system,honorable}',
        ],
        groups: [
          'builtin',
          'external',
          'internal',
          'parent',
          'sibling',
          'index',
          'object',
          'unknown',
          'type',
        ],
      },
    ],
  },
  overrides: [
    {
      files: ['.eslintrc.js', 'next.config.js'],
      parserOptions: {
        project: null,
      },
    },
  ],
}
