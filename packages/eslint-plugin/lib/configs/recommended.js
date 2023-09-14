// @ts-check
"use strict";

const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
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
  plugins: ["@bam.tech", "unused-imports"],
  rules: {
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "no-console": ["error", { allow: ["warn", "error"] }],
    "no-return-await": "error",
    "array-callback-return": "error",
    "react-hooks/exhaustive-deps": "error",
    "react-native/no-color-literals": "off",
    "react-native/sort-styles": "off",
    "react/no-unstable-nested-components": "error",
    "react/prop-types": "off",
    "react/no-unused-prop-types": "error",
    "@typescript-eslint/no-unused-vars": "off",
    "unused-imports/no-unused-imports": "error",
    "unused-imports/no-unused-vars": "error",
  },
  env: {
    node: true,
    "react-native/react-native": true,
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
  overrides: [
    {
      files: ["**/*.ts?(x)"],
      parserOptions: {
        project: "tsconfig.json",
      },
      rules: {
        // Note: disable the base rule as it can report incorrect errors
        "no-return-await": "off",
        "@typescript-eslint/return-await": "error",
      },
    },
  ],
});
