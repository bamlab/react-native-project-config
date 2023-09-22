// @ts-check
"use strict";

const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  extends: ["plugin:react-native-a11y/all"],
  rules: {
    "react-native-a11y/has-accessibility-hint": "off",
  },
});
