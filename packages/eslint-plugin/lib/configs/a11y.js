// @ts-check
"use strict";

const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  extends: ["plugin:react-native-a11y/all"],
  rules: {
    "react-native-a11y/has-accessibility-hint": "off",
    "@bam.tech/image-requires-accessible-prop": "error",
    "@bam.tech/do-not-use-role-on-image": "error",
    "@bam.tech/accessibility-props-require-accessible": "error",
    "@bam.tech/requires-accessibility-role-when-accessible": "error",
    "@bam.tech/requires-accessibility-label": "error",
  },
});
