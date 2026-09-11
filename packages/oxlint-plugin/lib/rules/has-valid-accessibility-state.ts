/**
 * @fileoverview Validates the shape of the accessibilityState prop.
 *
 * Reimplemented for oxlint from `eslint-plugin-react-native-a11y`'s
 * `has-valid-accessibility-state` (MIT). See `has-accessibility-hint.ts` for why
 * native `jsx-a11y` cannot serve these rules.
 */
import type { Rule } from "@oxlint/plugins";

import { getAttribute, type JSXOpeningElementLike } from "../utils/jsx.js";

const PROP_NAME = "accessibilityState";
const VALID_KEYS = ["disabled", "selected", "checked", "busy", "expanded"];

interface KeyLike {
  type: string;
  name?: string;
  value?: unknown;
  quasis?: { value?: { cooked?: string | null } }[];
  expressions?: unknown[];
}

interface PropertyLike {
  type: string;
  key?: KeyLike;
  value?: { type: string; value?: unknown };
}

/**
 * The statically known key of a property, or `undefined` when it cannot be
 * evaluated (a computed identifier, an interpolated template). Callers skip
 * the keys they cannot read rather than reporting on them: a blind
 * `String(key.value)` puts the literal text "undefined" in the message and
 * accuses a key that is very often perfectly valid.
 */
const keyName = (property: PropertyLike): string | undefined => {
  const { key } = property;
  if (!key) return undefined;

  if (key.type === "Identifier") return key.name;
  if (key.type === "Literal") {
    return typeof key.value === "string" || typeof key.value === "number"
      ? String(key.value)
      : undefined;
  }
  if (key.type === "TemplateLiteral") {
    // Only a template with no interpolation has a static value.
    if ((key.expressions ?? []).length > 0) return undefined;

    return key.quasis?.[0]?.value?.cooked ?? undefined;
  }

  return undefined;
};

export const hasValidAccessibilityStateRule: Rule = {
  meta: {
    type: "problem",
    docs: {
      description: "Enforce a valid accessibilityState prop shape",
    },
    messages: {
      notAnObject: "accessibilityState must be an object",
      invalidKey: 'accessibilityState object: "{{key}}" is not a valid key',
      checkedNotBooleanOrMixed: `accessibilityState object: "checked" value is not either a boolean or 'mixed'`,
      valueNotBoolean:
        'accessibilityState object: "{{key}}" value is not a boolean',
    },
    schema: [{ type: "object", additionalProperties: true }],
  },

  create(context) {
    return {
      JSXOpeningElement(node: never) {
        const element = node as unknown as JSXOpeningElementLike;
        const stateProp = getAttribute(element, PROP_NAME);
        if (!stateProp) return;

        const propValue = stateProp.value as
          | {
              type: string;
              expression?: { type: string; properties?: PropertyLike[] };
            }
          | undefined;
        if (!propValue) return;

        const valueType = propValue.expression?.type ?? propValue.type;

        if (valueType === "Literal" || valueType === "ArrayExpression") {
          context.report({ node, messageId: "notAnObject" });

          return;
        }

        if (valueType !== "ObjectExpression") return;

        const properties = propValue.expression?.properties ?? [];

        // Non-literal values cannot be evaluated statically, so a single
        // dynamic entry means we validate keys only, as upstream does.
        const allValuesAreLiterals = properties.every(
          (property) => property.value?.type === "Literal",
        );

        for (const property of properties) {
          const key = keyName(property);
          if (key === undefined) continue;

          if (!VALID_KEYS.includes(key)) {
            context.report({ node, messageId: "invalidKey", data: { key } });
            continue;
          }

          if (!allValuesAreLiterals) continue;

          const value = property.value?.value;

          if (key === "checked") {
            if (typeof value !== "boolean" && value !== "mixed") {
              context.report({ node, messageId: "checkedNotBooleanOrMixed" });
            }
          } else if (typeof value !== "boolean") {
            context.report({
              node,
              messageId: "valueNotBoolean",
              data: { key },
            });
          }
        }
      },
    };
  },
};
