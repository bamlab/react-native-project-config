/**
 * @fileoverview Requires accessible prop when accessibility props
 * @author Paul Briand
 */
"use strict";

const { isAccessible, hasPropAccessible } = require("../utils/isAccessible");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "problem", // `problem`, `suggestion`, or `layout`
    docs: {
      description:
        "Requires accessible prop when accessibility props are defined",
      recommended: false,
      url: "https://github.com/bamlab/react-native-project-config/tree/main/packages/eslint-plugin/docs/rules/accessibility-props-require-accessible.md", // URL to the documentation page for this rule
    },
    fixable: "code", // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
    messages: {
      roleRequiresAccessible:
        "Requires accessible prop when role prop is defined",
      labelRequiresAccessible:
        "Requires accessible prop when label prop is defined",
    },
  },

  create(context) {
    return {
      JSXOpeningElement(node) {
        if (!isAccessible(node)) {
          if (
            node.attributes.some((attribute) =>
              ["role", "accessibilityRole"].includes(attribute.name.name)
            )
          ) {
            if (!hasPropAccessible(node)) {
              context.report({
                node,
                messageId: "roleRequiresAccessible",
                fix: (fixer) => {
                  const openingTagEnd = node.range[1];
                  return fixer.insertTextBeforeRange(
                    [openingTagEnd - (node.selfClosing ? 2 : 1), openingTagEnd],
                    " accessible"
                  );
                },
              });
            } else {
              context.report({
                node,
                messageId: "roleRequiresAccessible",
              });
            }
          }

          if (!isAnyParentAccessible(node)) {
            if (
              node.attributes.some((attribute) =>
                [
                  "accessibilityLabel",
                  "accessibilityHint",
                  "accessibilityLabelledBy",
                  "aria-label",
                  "aria-labelledby",
                ].includes(attribute.name.name)
              )
            ) {
              if (!hasPropAccessible(node)) {
                context.report({
                  node,
                  messageId: "labelRequiresAccessible",
                  fix: (fixer) => {
                    const openingTagEnd = node.range[1];
                    return fixer.insertTextBeforeRange(
                      [
                        openingTagEnd - (node.selfClosing ? 2 : 1),
                        openingTagEnd,
                      ],
                      " accessible"
                    );
                  },
                });
              } else {
                context.report({
                  node,
                  messageId: "labelRequiresAccessible",
                });
              }
            }
          }
        }
      },
    };
  },
};

const isAnyParentAccessible = (node) => {
  /* function applied to a JSXOpeningElement, its parent is the JSXElement.
  We have to look for the parent of the parent  */
  if (node.parent.parent && node.parent.parent.type === "JSXElement") {
    if (isAccessible(node.parent.parent.openingElement)) return true;

    return isAnyParentAccessible(node.parent.parent.openingElement);
  }
};
