/**
 * @fileoverview Makes sure userEvent.press and userEvent.type are awaited
 * @author Pierre Zimmermann
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Enforces awaiting userEvent calls",
      category: "Possible Errors",
      recommended: true,
      url: "https://github.com/bamlab/react-native-project-config/tree/main/packages/eslint-plugin/docs/rules/await-user-event.md",
    },
    messages: {
      missingAwait: "userEvent calls should be preceded by 'await'.",
    },
    schema: [],
    fixable: "code",
  },

  create(context) {
    return {
      CallExpression(node) {
        if (
          node.callee.type === "MemberExpression" &&
          node.callee.object.name === "userEvent"
        ) {
          // Check if the parent is not an AwaitExpression
          if (node.parent.type !== "AwaitExpression") {
            context.report({
              node,
              messageId: "missingAwait",
              fix(fixer) {
                return fixer.insertTextBefore(node, "await ");
              },
            });
          }
        }
      },
    };
  },
};
