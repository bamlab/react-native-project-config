import { defineFlatConfig } from "eslint-define-config";
import simpleImportSort from "eslint-plugin-simple-import-sort";

import { flatConfigs } from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";
import tseslint from "typescript-eslint";

export const importConfig = defineFlatConfig([
  flatConfigs.recommended,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
      "@typescript-eslint": tseslint.plugin,
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
    },
    settings: {
      "import/resolver": {
        typescript: true,
        node: true,
      },
    },
    rules: {
      // Standardized import syntax
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/no-require-imports": "error",
      "@typescript-eslint/no-var-requires": "off",

      // Auto-remove unused imports
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": "error",

      // We disable the base rule because it doesn't work well with TypeScript
      // https://typescript-eslint.io/rules/no-unused-vars/
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": "error",

      // Import sorting
      "simple-import-sort/imports": [
        "error",
        {
          groups: [["^\\u0000"], ["^@?\\w"], ["^#"], ["^[^.]"], ["^\\."]],
        },
      ],
      "simple-import-sort/exports": "error",
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",

      // Bug prevention
      "import/no-unresolved": "error",
    },
  },
  {
    files: ["*.js"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
]);
