module.exports = {
  env: {
    browser: true,
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended'
  ],
  parserOptions: {
    ecmaFeatures: {
      experimentalObjectRestSpread: true,
      jsx: true
    },
    sourceType: "module"
  },
  plugins: [
    'react',
    'prettier'
  ],
  rules: {
    'prettier/prettier': ['error', {
      singleQuote: true
    }]
  },
  overrides: [
    {
      files: ['src/**/*.test.js'],
      plugins: ['jest'],
      env: {
        'jest/globals': true
      }
    }
  ]
};
