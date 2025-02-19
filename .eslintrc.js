module.exports = {
  root: true,
  extends: ['@pluralsh/eslint-config-pluralsh'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  settings: {
    'import/resolver': {
      typescript: {
        extensions: ['.ts', '.tsx'],
      },
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
  },
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json', './scripts/tsconfig.json'],
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        ts: 'never',
        tsx: 'never',
      },
    ],
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
        pathGroupsExcludedImportTypes: ['react', '{next/*,next,@pluralsh/design-system,honorable}'],
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
      files: ['.eslintrc.js', 'next.config.js', 'index-pages.mjs'],
      parserOptions: {
        project: null,
      },
    },
  ],
}
