module.exports = {
  extends: ['@mate-academy/eslint-config-react-typescript', 'plugin:cypress/recommended'],
  rules: {
    'max-len': ['error', {
      ignoreTemplateLiterals: true,
      ignoreComments: true,
    }],
    'jsx-a11y/label-has-associated-control': ["error", {
      assert: "either",
    }],
  },
};
// {
//   "plugins": [
//     // ...
//     "react-hooks"
//   ],
//   "rules": {
//     // ...
//     "react-hooks/rules-of-hooks": "error", // Checks rules of Hooks
//     "react-hooks/exhaustive-deps": "warn" // Checks effect dependencies
//   }
// }

// module.exports = {
//   extends: ['@mate-academy/eslint-config-react-typescript', 'plugin:cypress/recommended'],
//   rules: {
//     'max-len': ['error', {
//       ignoreTemplateLiterals: true,
//       ignoreComments: true,
//     }],
//     'jsx-a11y/label-has-associated-control': ["error", {
//       assert: "either",
//     }],
//   },
// };
