import { defineFlatConfig } from "eslint-define-config";
import simpleImportSort from "eslint-plugin-simple-import-sort";

// @ts-ignore
import { flatConfigs } from "eslint-plugin-import";
import unusedImports from "eslint-plugin-unused-imports";

export const importConfig = defineFlatConfig([
  flatConfigs.recommended,
  {
    plugins: {
      "simple-import-sort": simpleImportSort,
      "unused-imports": unusedImports,
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
      "@typescript-eslint/no-unused-vars": "off",
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": "error",

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
