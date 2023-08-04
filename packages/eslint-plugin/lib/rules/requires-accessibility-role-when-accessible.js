/**
 * @fileoverview Enforces accessibilityRole or role when component is accessible
 * @author Paul Briand
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------
const isAccessible = require("../utils/isAccessible");
const isButton = require("../utils/isButton");
const isText = require("../utils/isText");
const isTextInput = require("../utils/isTextInput");

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "problem", // `problem`, `suggestion`, or `layout`
    docs: {
      description:
        "Enforces accessibilityRole or role when component is accessible",
      recommended: false,
      url: "https://github.com/bamlab/react-native-project-config/tree/main/packages/eslint-plugin/docs/rules/requires-accessibility-role-when-accessible.md", // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
    messages: {
      requiresAccessibilityRoleWhenAccessible:
        "Requires accessibilityRole when accessible",
    },
  },

  create(context) {
    return {
      JSXOpeningElement(node) {
        if (isAccessible(node)) {
          if (
            !node.attributes.some(
              (attribute) =>
                attribute.name.name === "accessibilityRole" ||
                attribute.name.name === "role"
            )
          ) {
            if (
              !(
                isTextInput(node) ||
                isText(node) ||
                isButton(node) ||
                node.name.name === "ExpoImage"
              )
            ) {
              context.report({
                node,
                messageId: "requiresAccessibilityRoleWhenAccessible",
              });
            }
          }
        }
      },
    };
  },
};
