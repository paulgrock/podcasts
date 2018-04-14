module.exports = {
    "parser": "babel-eslint",
    "parserOptions": {
      "ecmaVersion": 6,
      "sourceType": "module"
    },
    "env": {
      "browser": true,
      "node": true,
      "jest": true
    },
    "extends": [
      "eslint:recommended",
      "plugin:react/recommended",
      "prettier",
      "prettier/react"
    ],
    "plugins": [
      "react",
      "prettier"
    ],
    "rules": {
      "prettier/prettier": "error",
      "camelcase": "warn",
      "curly": ["error", "all"],
      "eqeqeq": "error",
      "no-console": "error",
      "no-multi-assign": "error",
      "no-nested-ternary": "error",
      "no-unneeded-ternary": "error",
      "one-var": ["error", { initialized: "never" }],
      "spaced-comment": ["warn", "always"],

      // node
      "handle-callback-err": "warn",
      "no-mixed-requires": "error",
      "no-new-require": "error",
      "no-path-concat": "error",

      // react
      "react/jsx-indent-props": ["warn", "tab"],
      "react/require-extension": "off"
    }
  }