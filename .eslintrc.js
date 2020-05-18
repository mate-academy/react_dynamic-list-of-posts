module.exports = {
  extends: '@mate-academy/eslint-config-react-typescript',
  rules: {
    'no-unused-expressions': 'off',
    '@typescript-eslint/no-unused-expressions': ['error', {
      'allowShortCircuit': true,
      'allowTernary': true,
    }],
    'arrow-body-style': 0,
    'object-curly-newline': [2, {
      'ObjectExpression': {
        'consistent': true,
        'minProperties': 5,
      },
    }],
  }
};
