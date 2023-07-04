"use strict";

const requireIndex = require("requireindex");

module.exports = {
  configs: requireIndex(__dirname + "/configs"),
  rules: requireIndex(__dirname + "/rules"),
};
