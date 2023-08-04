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
    hasSuggestions: true,
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
      suggestAddingAccessibilityLabel: "Add accessibilityLabel",
    },
  },

  create(context) {
    return {
      JSXOpeningElement(node) {
        if (isAccessible(node) && !isText(node)) {
          if (
            !hasLabelProp(node) &&
            !hasExactlyOneChildWhichIsTextOrHasALabel(node.parent)
          ) {
            context.report({
              node,
              messageId: "requiresAccessibilityLabel",
              suggest: [
                {
                  messageId: "suggestAddingAccessibilityLabel",
                  fix: (fixer) => {
                    const openingTagEnd = node.range[1];
                    return fixer.insertTextBeforeRange(
                      [
                        openingTagEnd - (node.selfClosing ? 2 : 1),
                        openingTagEnd,
                      ],
                      ` accessibilityLabel=""`
                    );
                  },
                },
              ],
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
