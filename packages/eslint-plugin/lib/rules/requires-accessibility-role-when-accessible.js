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
const isImage = require("../utils/isImage");
const isPressable = require("../utils/isPressable");
const isText = require("../utils/isText");
const isTextInput = require("../utils/isTextInput");

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    hasSuggestions: true,
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
      suggestAddingButtonRole: "Add accessibilityRole button to component",
      suggestAddingImageRole: "Add accessibilityRole image to component",
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
              if (isPressable(node)) {
                context.report({
                  node,
                  messageId: "requiresAccessibilityRoleWhenAccessible",
                  suggest: [
                    {
                      messageId: "suggestAddingButtonRole",
                      fix: (fixer) => {
                        const openingTagEnd = node.range[1];
                        return fixer.insertTextBeforeRange(
                          [
                            openingTagEnd - (node.selfClosing ? 2 : 1),
                            openingTagEnd,
                          ],
                          ` accessibilityRole="button"`
                        );
                      },
                    },
                  ],
                });
              } else if (isImage(node)) {
                context.report({
                  node,
                  messageId: "requiresAccessibilityRoleWhenAccessible",
                  suggest: [
                    {
                      messageId: "suggestAddingImageRole",
                      fix: (fixer) => {
                        const openingTagEnd = node.range[1];
                        return fixer.insertTextBeforeRange(
                          [
                            openingTagEnd - (node.selfClosing ? 2 : 1),
                            openingTagEnd,
                          ],
                          ` accessibilityRole="image"`
                        );
                      },
                    },
                  ],
                });
              } else {
                context.report({
                  node,
                  messageId: "requiresAccessibilityRoleWhenAccessible",
                });
              }
            }
          }
        }
      },
    };
  },
};
