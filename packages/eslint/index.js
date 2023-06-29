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
    "plugin:react-native/all",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: "latest",
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: "detect",
    },
  },
});
