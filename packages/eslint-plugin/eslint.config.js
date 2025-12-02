const tseslint = require("typescript-eslint");
const eslintPlugin = require("eslint-plugin-eslint-plugin");

module.exports = tseslint.config(eslintPlugin.configs["flat/recommended"], {
  ignores: ["example-app", "dist"],
  languageOptions: {
    parser: tseslint.parser,
  },
  plugins: {
    "@typescript-eslint": tseslint.plugin,
  },
  rules: {
    "eslint-plugin/require-meta-docs-description": [
      "error",
      { pattern: "^(Enforce|Require|Disallow)" },
    ],
    "eslint-plugin/require-meta-docs-url": [
      "error",
      {
        pattern:
          "https://github.com/bamlab/react-native-project-config/tree/main/packages/eslint-plugin/docs/rules/{{name}}.md",
      },
    ],
    "no-console": "error",
  },
});
