module.exports = {
    extends: ['airbnb', '@mate-academy/eslint-config'],
    parserOptions: {
        "sourceType": "module"
    },
    env: {
        browser: true,
      es6: true
    },
    rules: {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        'no-console': 'off',
        'no-param-reassign': 0,
        "import/no-named-as-default": 0,
        "import/no-unresolved": 0,
        'linebreak-style': ["error", "windows"]
    }
};
