module.exports = {
  env: { browser: true, es2020: true },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended', 'plugin:vue/vue3-recommended'],
  parser: '@typescript-eslint/parser',
  files: ['**/*.ts'],
  plugins: ['import'],
  settings: {
    react: { version: 'detect' },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx']
    },
    'import/resolver': {
      typescript: { alwaysTryTypes: true }
    }
  },
  parserOptions: { ecmaVersion: 'latest', sourceType: 'module' },
  rules: {
    'prettier/prettier': ['error', {}, { usePrettierrc: true }]
  }
};
