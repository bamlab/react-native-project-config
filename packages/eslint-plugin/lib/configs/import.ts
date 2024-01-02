import { defineConfig } from "eslint-define-config";

export const importConfig = defineConfig({
  extends: ["plugin:import/typescript"],
  plugins: ["simple-import-sort", "import", "unused-imports"],
  settings: {
    "import/resolver": {
      typescript: true,
      node: true,
    },
  },
  rules: {
    /*
     * Standardized import syntax
     */
    "@typescript-eslint/consistent-type-imports": "error", // use "import type" for types. Optimize import readability, bundle size, avoid circular dependencies
    "@typescript-eslint/no-require-imports": "error",
    "@typescript-eslint/no-var-requires": "off", // it's mostly a duplicate of no-require-imports

    /*
     * Auto-remove unused imports
     */
    "@typescript-eslint/no-unused-vars": "off", // eslint-plugin-unused-imports replaces this rule
    "unused-imports/no-unused-imports": "error", // Automatically remove unused imports on save
    "unused-imports/no-unused-vars": "error",

    /*
     * Import sorting
     */
    "simple-import-sort/imports": [
      "error",
      {
        groups: [
          ["^\\u0000"], // side effect imports
          ["^@?\\w"], // packages
          ["^#"], // internal absolute imports
          ["^[^.]"], // everything else
          ["^\\."], // relative imports
        ],
      },
    ],
    "simple-import-sort/exports": "error",
    "import/first": "error",
    "import/newline-after-import": "error",
    "import/no-duplicates": "error",

    /*
     * Bug prevention
     */
    "import/no-unresolved": "error", // especially useful for "asset imports" in React Native projects
  },
  overrides: [
    {
      files: ["*.js"],
      rules: {
        "@typescript-eslint/no-require-imports": "off",
      },
    },
  ],
});
