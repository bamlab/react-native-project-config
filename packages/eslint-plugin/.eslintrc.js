"use strict";

module.exports = {
  root: true,
  extends: [
    "eslint:recommended",
    "plugin:eslint-plugin/recommended",
    "plugin:node/recommended",
  ],
  rules: {
    "eslint-plugin/require-meta-docs-description": [
      2,
      { pattern: "^(Enforce|Require|Disallow)" },
    ],
    "eslint-plugin/require-meta-docs-url": [
      "error",
      {
        pattern:
          "https://github.com/bamlab/react-native-project-config/tree/main/packages/eslint-plugin/docs/rules/{{name}}.md",
      },
    ],
    "no-console": ["error", { allow: ["warn", "error"] }],
  },
  env: {
    node: true,
  },
  ignorePatterns: ["example-app"],
};
