/* eslint-disable @typescript-eslint/no-require-imports */

const pluginBam = require("@bam.tech/eslint-plugin");

module.exports = [
  ...pluginBam.configs.recommended,
  ...pluginBam.configs.a11y,
  {
    rules: {
      "@bam.tech/require-named-effect": "error",
    },
  },
];
