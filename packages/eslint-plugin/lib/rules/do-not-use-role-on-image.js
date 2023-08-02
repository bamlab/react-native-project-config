/**
 * @fileoverview role prop does not work on react-native Image component
 * @author Paul Briand
 */
"use strict";

const isImage = require("../utils/isImage");

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "problem", // `problem`, `suggestion`, or `layout`
    docs: {
      description: "Disallow role prop on Image component",
      recommended: false,
      url: "https://github.com/bamlab/react-native-project-config/tree/main/packages/eslint-plugin/docs/rules/do-not-use-role-on-image.md", // URL to the documentation page for this rule
    },
    fixable: "code", // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options
    messages: {
      doNotUseRoleOnImage:
        "Use 'accessibilityRole' instead of 'role' on Image component",
    },
  },

  create(context) {
    return {
      JSXAttribute: (node) => {
        if (node.name.name === "role" && isImage(node.parent))
          context.report({
            node,
            messageId: "doNotUseRoleOnImage",
            fix: (fixer) => {
              const roleFixer = fixer.replaceTextRange(
                [node.range[0], node.range[0] + 4],
                "accessibilityRole"
              );
              if (node.value.type === "Literal" && node.value.value === "img")
                return [
                  roleFixer,
                  fixer.replaceTextRange(
                    [node.range[1] - 4, node.range[1] - 1],
                    "image"
                  ),
                ];
              return roleFixer;
            },
          });
      },
    };
  },
};
