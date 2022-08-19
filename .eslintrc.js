module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: ['standard', 'prettier'],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'prettier'],
  rules: {
    indent: ['warn', 4],
    'no-console': 'warn',
    quotes: ['warn', 'single'],
    'object-curly-spacing': 'warn',
    'comma-dangle': ['warn', 'always-multiline'],
    'no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
    '@typescript-eslint/consistent-type-imports': 'warn',
    'camelcase': 0,
    'no-redeclare': 1,
    'array-callback-return': 1,
    'no-undef': 1,
    'no-use-before-define': 1,
  },
};
