module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
    commonjs: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  rules: {
    // ESLint plugin for prettier formatting
    // https://github.com/prettier/eslint-plugin-prettier
    'no-var': 'error',
    'arrow-body-style': ['off'],
    'jsx-a11y/anchor-is-valid': 'off',
    'no-script-url': 'off',
    'no-unused-vars': 'off',
  
  },
  ignorePatterns: ['public/**/*.js','craco.config.js'],
}
