/**
 * @fileoverview Disallow inline style objects inside a style array.
 *
 * The native `react-perf/jsx-no-new-object-as-prop` covers inline objects passed
 * directly as a prop (`style={{ flex: 1 }}`), which is the common case. It does
 * not look inside an array, so `style={[styles.container, { marginTop: 10 }]}`
 * goes unreported. Enabling `react-perf/jsx-no-new-array-as-prop` to close that
 * gap is not an option: it would also reject the legitimate
 * `style={[styles.container, styles.active]}`.
 *
 * This rule covers exactly that gap, so the two together replace the old
 * `@bam.tech/no-inline-style`.
 */
import type { Rule } from "@oxlint/plugins";

interface NodeLike {
  type: string;
  elements?: (NodeLike | null)[];
  consequent?: NodeLike;
  alternate?: NodeLike;
  left?: NodeLike;
  right?: NodeLike;
  properties?: unknown[];
}

interface JSXAttributeNode {
  type: string;
  name?: { name?: string };
  value?: { type: string; expression?: NodeLike };
}

export const noInlineStyleInArrayRule: Rule = {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow inline style objects inside a style array",
    },
    messages: {
      inlineStyleInArray:
        "Inline style inside a style array. Move it into a StyleSheet.",
    },
    schema: [],
  },

  create(context) {
    /**
     * Collect object literals reachable from an array element, looking through
     * the conditionals that commonly wrap a conditional style.
     */
    const collectObjects = (node: NodeLike | null): NodeLike[] => {
      if (!node) return [];

      switch (node.type) {
        case "ObjectExpression":
          // An empty object allocates but expresses nothing, and the old rule
          // ignored it too.
          return node.properties?.length ? [node] : [];
        case "ConditionalExpression":
          return [
            ...collectObjects(node.consequent ?? null),
            ...collectObjects(node.alternate ?? null),
          ];
        case "LogicalExpression":
          return [
            ...collectObjects(node.left ?? null),
            ...collectObjects(node.right ?? null),
          ];
        default:
          return [];
      }
    };

    return {
      JSXAttribute(node: never) {
        const attribute = node as unknown as JSXAttributeNode;
        const name = attribute.name?.name;

        if (!name || !name.toLowerCase().includes("style")) return;
        if (attribute.value?.type !== "JSXExpressionContainer") return;

        const { expression } = attribute.value;
        if (expression?.type !== "ArrayExpression") return;

        for (const element of expression.elements ?? []) {
          for (const object of collectObjects(element)) {
            context.report({
              node: object as never,
              messageId: "inlineStyleInArray",
            });
          }
        }
      },
    };
  },
};
