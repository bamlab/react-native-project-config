import globals from "globals";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import reactNativePlugin from "eslint-plugin-react-native";
import react from "eslint-plugin-react";
import reactHookPlugin from "eslint-plugin-react-hooks";
import { noDifferentDisplaynameRule } from "../rules/no-different-displayname";
import { requireNamedEffectRule } from "../rules/require-named-effect";
import { preferUserEventRule } from "../rules/prefer-user-event";
import { awaitUserEventRule } from "../rules/await-user-event";
import { noInlineStyleRule } from "../rules/no-inline-style";
const eslintPluginPrettierRecommended = require("eslint-plugin-prettier/recommended");

// @TODO Add the @bam.tech/import plugins

export const recommendedConfig = tseslint.config(
  tseslint.configs.recommended,
  eslint.configs.recommended,
  eslintPluginPrettierRecommended,
  {
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
      "@typescript-eslint/no-shadow": "error",
      "no-console": ["error", { allow: ["warn", "error"] }],
      "no-return-await": "error",
      "array-callback-return": ["error"],
      "react-hooks/exhaustive-deps": "error",
      "react-native/no-color-literals": "off",
      "react-native/sort-styles": "off",
      "react-native/no-raw-text": "error",
      "react/no-unstable-nested-components": "error",
      "react/prop-types": "off",
      "react/no-unused-prop-types": "error",
      "react/jsx-no-useless-fragment": "error",
      "@bam.tech/no-different-displayname": "error",
      "@bam.tech/require-named-effect": "error",
      "@bam.tech/no-inline-style": "error",
      // ☢️ Rules that require type information must be added to the `.ts` overrides section below
    },
    plugins: {
      react,
      "react-native": reactNativePlugin,
      "react-hooks": reactHookPlugin,
      "@bam.tech": {
        rules: {
          "no-different-displayname": noDifferentDisplaynameRule,
          "require-named-effect": requireNamedEffectRule,
          "prefer-user-event": preferUserEventRule,
          "await-user-event": awaitUserEventRule,
          "no-inline-style": noInlineStyleRule,
        },
      },
    },
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
      },
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2020,
      },
    },
    ignores: [
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
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["**/*.ts?(x)"],
    languageOptions: {
      parserOptions: {
        project: "tsconfig.json",
      },
    },
    rules: {
      "no-return-await": "off", // Disable the base rule as it can report incorrect errors
      "@typescript-eslint/return-await": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "@typescript-eslint/no-unnecessary-condition": "error",
    },
  },
);
