module.exports = {
  "extends": [
    "@mate-academy/eslint-config-react",
    "plugin:@typescript-eslint/recommended"
  ],
  "plugins": [
    "@typescript-eslint",
    "react-hooks"
  ],
  "rules": {
    // typescript
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
    "@typescript-eslint/no-var-requires": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/camelcase": ["error", { "properties": "never" }],
    "no-unused-expressions": ["warn", {
      "allowShortCircuit": true,
      "allowTernary": true
    }],
    "@typescript-eslint/no-unused-vars": ["error"],

    // react
    "react/jsx-filename-extension": ["warn", {
      "extensions": [".jsx", ".tsx"]
    }],
    "react/prop-types": "off", // Incompatible with TS props type?
    "react-hooks/rules-of-hooks": "error",
    "react/no-danger": "off",
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"]
      }
    }
  },
};
