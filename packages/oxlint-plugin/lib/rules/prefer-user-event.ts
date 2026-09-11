/**
 * @fileoverview Forces usage of userEvent.press over fireEvent.press and
 * userEvent.type over fireEvent.changeText
 * @author Pierre Zimmermann
 */
import type { Rule } from "@oxlint/plugins";

import { isCallAwaited } from "../utils/await.js";

const REPLACEMENTS = {
  press: { messageId: "replacePress", method: "press" },
  changeText: { messageId: "replaceChangeText", method: "type" },
} as const;

export const preferUserEventRule: Rule = {
  meta: {
    type: "problem",
    docs: {
      description: "Enforce usage of userEvent over fireEvent in tests",
    },
    messages: {
      replacePress: "Replace `fireEvent.press` with `await userEvent.press.`",
      replaceChangeText:
        "Replace `fireEvent.changeText` with `await userEvent.type.`",
    },
    fixable: "code",
    schema: [],
  },

  create(context) {
    return {
      MemberExpression(node) {
        if (!("name" in node.object) || node.object.name !== "fireEvent")
          return;
        if (!("name" in node.property)) return;

        const replacement =
          REPLACEMENTS[node.property.name as keyof typeof REPLACEMENTS];
        if (!replacement) return;

        // Re-adding `await` to an already-awaited call would produce
        // `await await userEvent.press(...)`.
        const replacementObject = isCallAwaited(node)
          ? "userEvent"
          : "await userEvent";

        context.report({
          node: node.property,
          messageId: replacement.messageId,
          fix: (fixer) => [
            fixer.replaceText(node.object, replacementObject),
            fixer.replaceText(node.property, replacement.method),
          ],
        });
      },
    };
  },
};
