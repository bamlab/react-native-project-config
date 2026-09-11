/**
 * @fileoverview An accessibility hint helps users understand what will happen
 * when they perform an action on the accessibility element, when that result is
 * not apparent from the accessibility label.
 *
 * Reimplemented for oxlint from `eslint-plugin-react-native-a11y`'s
 * `has-accessibility-hint` (MIT, https://github.com/FormidableLabs/eslint-plugin-react-native-a11y).
 * Oxlint's native `jsx-a11y` plugin cannot serve this: its rules match lowercase
 * DOM tag names and ARIA attributes, so they never fire on React Native
 * components or on `accessibility*` props.
 */
import type { Rule } from "@oxlint/plugins";

import { hasAttribute, type JSXOpeningElementLike } from "../utils/jsx.js";

export const hasAccessibilityHintRule: Rule = {
  meta: {
    type: "suggestion",
    docs: {
      description:
        "Require an accessibilityHint alongside an accessibilityLabel",
    },
    messages: {
      missingHint: "has accessibilityLabel prop but no accessibilityHint",
    },
    schema: [{ type: "object", additionalProperties: true }],
  },

  create(context) {
    return {
      JSXOpeningElement(node: never) {
        const element = node as unknown as JSXOpeningElementLike;

        if (
          hasAttribute(element, "accessibilityLabel") &&
          !hasAttribute(element, "accessibilityHint")
        ) {
          context.report({ node, messageId: "missingHint" });
        }
      },
    };
  },
};
