/**
 * @fileoverview Enforces label when component accessible
 * @author Paul Briand
 */
"use strict";

const hasLabelProp = require("../utils/hasLabelProp");
const isAccessible = require("../utils/isAccessible");
const isText = require("../utils/isText");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "problem", // `problem`, `suggestion`, or `layout`
    docs: {
      description: "Enforces label when component accessible",
      recommended: false,
      url: "https://github.com/bamlab/react-native-project-config/tree/main/packages/eslint-plugin/docs/rules/requires-accessibility-label.md", // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
    messages: {
      requiresAccessibilityLabel: "Requires accessibilityLabel",
    },
  },

  create(context) {
    return {
      JSXOpeningElement(node) {
        if (isAccessible(node) && !isText(node)) {
          if (
            !node.attributes.some((attribute) =>
              ["accessibilityLabel", "aria-label", "alt"].includes(
                attribute.name.name
              )
            ) &&
            !hasExactlyOneChildWhichIsTextOrHasALabel(node.parent)
          ) {
            context.report({
              node,
              messageId: "requiresAccessibilityLabel",
            });
          }
        }
      },
    };
  },
};

const hasExactlyOneChildWhichIsTextOrHasALabel = (node) => {
  if (node.type === "JSXElement") {
    return (
      node.children.filter(
        (child) =>
          child.type === "JSXElement" &&
          (isText(child.openingElement) || hasLabelProp(child.openingElement))
      ).length === 1
    );
  }
};
