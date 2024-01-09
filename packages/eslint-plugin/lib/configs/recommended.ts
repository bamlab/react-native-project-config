import { defineConfig } from "eslint-define-config";

export const recommendedConfig = defineConfig({
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
    "plugin:@bam.tech/import",
    "plugin:prettier/recommended", // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
  ],
  plugins: ["@bam.tech"],
  rules: {
    "no-var": "error",
    eqeqeq: "error",
    "no-constant-binary-expression": "error",
    "no-else-return": "error",
    "require-await": "error",
    "no-nested-ternary": "error",
    "@typescript-eslint/ban-ts-comment": "warn",
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/no-explicit-any": "error",
    "@typescript-eslint/no-non-null-assertion": "error",
    "typescript-eslint/no-shadow": "error",
    "no-console": ["error", { allow: ["warn", "error"] }],
    "no-return-await": "error",
    "array-callback-return": "error",
    "react-hooks/exhaustive-deps": "error",
    "react-native/no-color-literals": "off",
    "react-native/sort-styles": "off",
    "react-native/no-raw-text": "off",
    "react/no-unstable-nested-components": "error",
    "react/prop-types": "off",
    "react/no-unused-prop-types": "error",
    "react/jsx-no-useless-fragment": "error",
    // ☢️ Rules that require type information must be added to the `.ts` overrides section below
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
        "no-return-await": "off", // Disable the base rule as it can report incorrect errors
        "@typescript-eslint/return-await": "error",
        "@typescript-eslint/no-floating-promises": "error",
      },
    },
  ],
});
