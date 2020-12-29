module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2018,
  },
  env: {
    node: true,
    es6: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier/@typescript-eslint',
    'plugin:prettier/recommended',
  ],

  // 0: off, 1: warn, 2: error
  rules: {
    'prefer-template': 2,
    curly: [2, 'multi-line'],

    '@typescript-eslint/ban-ts-comment': 0,
  },
};
