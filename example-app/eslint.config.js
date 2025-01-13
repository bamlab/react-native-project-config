const pluginBam = require("@bam.tech/eslint-plugin");

module.exports = [
  ...pluginBam.configs.recommended,
  ...pluginBam.configs.a11y,
  ...pluginBam.configs.import,
  ...pluginBam.configs.tests,
  {
    rules: {
      "@bam.tech/require-named-effect": "error",
    },
  },
];
