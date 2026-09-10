/**
 * @fileoverview Ensures that Touchable* components have appropriate props to
 * communicate with assistive technologies.
 *
 * Reimplemented for oxlint from `eslint-plugin-react-native-a11y`'s
 * `has-valid-accessibility-descriptors` (MIT). See `has-accessibility-hint.ts`
 * for why native `jsx-a11y` cannot serve these rules.
 */
import type { Rule } from "@oxlint/plugins";

import {
  hasAnyAttribute,
  hasSpreadAttribute,
  isTextInput,
  isTouchable,
  type JSXOpeningElementLike,
} from "../utils/jsx.js";

const DESCRIPTOR_PROPS = [
  "role",
  "accessibilityRole",
  "accessibilityLabel",
  "accessibilityActions",
  "accessible",
];

export const hasValidAccessibilityDescriptorsRule: Rule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Require accessibility descriptors on touchable components and text inputs",
    },
    messages: {
      missingDescriptors:
        "Missing a11y props. Expected one of: accessibilityRole OR role OR BOTH accessibilityLabel + accessibilityHint OR BOTH accessibilityActions + onAccessibilityAction",
    },
    schema: [
      {
        type: "object",
        properties: {
          touchables: { type: "array", items: { type: "string" } },
        },
        additionalProperties: true,
      },
    ],
    fixable: "code",
  },

  create(context) {
    const options = (context.options[0] ?? {}) as { touchables?: string[] };
    const extraTouchables = options.touchables ?? [];

    return {
      JSXOpeningElement(node: never) {
        const element = node as unknown as JSXOpeningElementLike;
        const touchable = isTouchable(element, extraTouchables);

        if (!touchable && !isTextInput(element)) return;

        // Props may arrive through a spread, which we cannot see into.
        if (hasSpreadAttribute(element)) return;
        if (hasAnyAttribute(element, DESCRIPTOR_PROPS)) return;

        context.report({
          node,
          messageId: "missingDescriptors",
          fix: (fixer) =>
            fixer.insertTextAfter(
              element.name as never,
              touchable
                ? ' accessibilityRole="button"'
                : ' accessibilityLabel="Text input field"',
            ),
        });
      },
    };
  },
};
