module.exports = {
  // Add the following code to add support for __dirname
  env: {
    node: true,
  },
  root: true,
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2021,
  },
  overrides: [
    {
      files: ['*.mjs'],
      parserOptions: {
        sourceType: 'module',
      },
    },
  ],
  extends: 'eslint:recommended',
};
