module.exports = {
  extends: [
    '@mate-academy/eslint-config-react-typescript',
    'plugin:cypress/recommended',
    'prettier',
  ],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {},
};
