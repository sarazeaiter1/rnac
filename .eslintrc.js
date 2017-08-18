module.exports = {
  parser: 'babel-eslint',
  env: {
    jest: true,
    browser: true,
    node: true
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:jest/recommended'
  ],
  plugins: ['react', 'jest'],
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  }
};
