"use strict";

const requireIndex = require("requireindex");

const recommended = require("./configs/recommended");
const tests = require("./configs/tests");

module.exports = {
  configs: {
    recommended,
    tests,
  },
  rules: requireIndex(__dirname + "/rules"),
};
