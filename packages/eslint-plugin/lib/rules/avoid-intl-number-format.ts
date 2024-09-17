import type { Rule } from "eslint";

// Custom Rule: No Intl.NumberFormat Usage
export const avoidIntlNumberFormatRule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow the use of `Intl.NumberFormat` due to potential performance issues.",
      category: "Possible Errors",
      recommended: true,
      url: "https://github.com/bamlab/react-native-project-config/tree/main/packages/eslint-plugin/docs/rules/no-intl-numberformat.md",
    },
    messages: {
      noIntlNumberFormat:
        "Avoid using `Intl.NumberFormat` as it can lead to performance issues. Consider using a lightweight formatting alternative or memoizing the formatter instance.",
    },
    schema: [],
  },

  create(context) {
    return {
      NewExpression(node) {
        if (
          node.callee.type === "MemberExpression" &&
          node.callee.object.type === "Identifier" &&
          node.callee.object.name === "Intl" &&
          node.callee.property.type === "Identifier" &&
          node.callee.property.name === "NumberFormat"
        ) {
          context.report({
            node,
            messageId: "noIntlNumberFormat",
          });
        }
      },
    };
  },
};
