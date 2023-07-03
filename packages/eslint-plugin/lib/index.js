"use strict";

const requireIndex = require("requireindex");
const recommended = require("./recommended");
const tests = require("./tests");

module.exports = {
  configs: {
    recommended,
    tests,
  },
  rules: requireIndex(__dirname + "/rules"),
};
