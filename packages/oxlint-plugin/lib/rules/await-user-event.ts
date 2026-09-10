/**
 * @fileoverview Makes sure userEvent.press and userEvent.type are awaited
 * @author Pierre Zimmermann
 */
import type { Rule } from "@oxlint/plugins";

export const awaitUserEventRule: Rule = {
  meta: {
    type: "problem",
    docs: {
      description: "Enforce awaiting userEvent calls",
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
          "name" in node.callee.object &&
          node.callee.object.name === "userEvent" &&
          node.parent.type !== "AwaitExpression"
        ) {
          context.report({
            node,
            messageId: "missingAwait",
            fix: (fixer) => fixer.insertTextBefore(node, "await "),
          });
        }
      },
    };
  },
};
