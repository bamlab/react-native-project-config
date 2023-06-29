// @ts-check
"use strict";

const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  env: {
    node: true,
    "react-native/react-native": true,
  },
  ignorePatterns: [
    ".cache", // tsc/eslint/metro cache
    ".expo-shared",
    ".expo",
    ".yarn", // yarn 3
    "android", // react-native
    "ios", // react-native
    "coverage", // jest
    "dist", // expo updates
    "node_modules",
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime", // Disables the rules that require importing react when using JSX
    "plugin:react-native/all",
    "plugin:react-hooks/recommended",
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    ecmaFeatures: {
      jsx: true,
    },
  },
  rules: {
    "react-hooks/exhaustive-deps": "error",
    "prettier/prettier": ["error", { printWidth: 80 }],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
});
