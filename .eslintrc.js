module.exports = {
  root: true,
  extends: ['@pluralsh/eslint-config-pluralsh'],
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: ['./tsconfig.json', './scripts/tsconfig.json'],
  },
}
