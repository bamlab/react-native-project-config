// @ts-check

"use strict";

const { defineConfig } = require("eslint-define-config");
const recommended = require("./recommended");

module.exports = {
  configs: {
    recommended,
  },
};
