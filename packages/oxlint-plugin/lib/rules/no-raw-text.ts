/**
 * @fileoverview Disallow text outside of a <Text> component
 *
 * Reimplemented for oxlint from `eslint-plugin-react-native`'s `no-raw-text`
 * (MIT, https://github.com/Intellicode/eslint-plugin-react-native), keeping its
 * behaviour: the element allowlist, the whitespace handling and the message
 * format. Oxlint has no native react-native plugin, and oxc has declared new
 * plugins out of scope (oxc-project/oxc#26151).
 */
import type { Rule } from "@oxlint/plugins";

import { elementName, type JSXOpeningElementLike } from "../utils/jsx.js";

interface NodeLike {
  type: string;
  parent?: NodeLike;
  openingElement?: JSXOpeningElementLike;
  value?: unknown;
  expressions?: { name?: string }[];
}

const DEFAULT_ALLOWED = ["Text", "TSpan", "StyledText", "Animated.Text"];

/** Whitespace made only of line breaks is formatting, not content. */
const hasOnlyLineBreak = (value: string): boolean =>
  /^[\r\n\t\f\v]+$/.test(value.replace(/ /g, ""));

export const noRawTextRule: Rule = {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow text outside of a <Text> component",
    },
    schema: [
      {
        type: "object",
        properties: {
          skip: { type: "array", items: { type: "string" } },
        },
        additionalProperties: false,
      },
    ],
  },

  create(context) {
    const options = (context.options[0] ?? {}) as { skip?: string[] };
    const allowedElements = DEFAULT_ALLOWED.concat(options.skip ?? []);

    /**
     * Any ancestor being a text element is enough, so text nested inside
     * further markup within a <Text> stays valid.
     */
    const hasAllowedParent = (parent: NodeLike | undefined): boolean => {
      let current = parent;

      while (current) {
        if (current.type === "JSXElement" && current.openingElement) {
          if (allowedElements.includes(elementName(current.openingElement))) {
            return true;
          }
        }
        current = current.parent;
      }

      return false;
    };

    const report = (node: NodeLike) => {
      const rawValue =
        node.type === "TemplateLiteral"
          ? `TemplateLiteral: ${node.expressions?.[0]?.name}`
          : String(node.value).trim();

      const description =
        rawValue.length > 0 ? `Raw text (${rawValue})` : "Whitespace(s)";

      context.report({
        node: node as never,
        message: `${description} cannot be used outside of a <Text> tag`,
      });
    };

    /** Text inside a prop (`title="hi"`) is not rendered text. */
    const isInsideAttribute = (node: NodeLike): boolean =>
      node.parent?.parent?.type === "JSXAttribute";

    return {
      Literal(node: never) {
        const literal = node as unknown as NodeLike;
        const parentType = literal.parent?.type;

        if (
          typeof literal.value !== "string" ||
          hasOnlyLineBreak(literal.value) ||
          !(
            parentType === "JSXExpressionContainer" ||
            parentType === "JSXElement"
          ) ||
          isInsideAttribute(literal)
        ) {
          return;
        }

        const subject =
          parentType === "JSXExpressionContainer" ? literal.parent! : literal;

        if (!hasAllowedParent(subject.parent)) report(literal);
      },

      JSXText(node: never) {
        const text = node as unknown as NodeLike;

        if (typeof text.value !== "string" || hasOnlyLineBreak(text.value)) {
          return;
        }

        if (!hasAllowedParent(text.parent)) report(text);
      },

      TemplateLiteral(node: never) {
        const template = node as unknown as NodeLike;

        if (
          template.parent?.type !== "JSXExpressionContainer" ||
          isInsideAttribute(template)
        ) {
          return;
        }

        if (!hasAllowedParent(template.parent.parent)) report(template);
      },
    };
  },
};
