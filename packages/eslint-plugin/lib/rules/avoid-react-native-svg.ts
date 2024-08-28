import type { Rule } from "eslint";

// Custom Rule: No react-native-svg Import
export const avoidReactNativeSvgImportRule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow importing the `react-native-svg` package.",
      category: "Possible Errors",
      recommended: true,
      url: "https://github.com/bamlab/react-native-project-config/tree/main/packages/eslint-plugin/docs/rules/no-react-native-svg-import.md",
    },
    messages: {
      noReactNativeSvgImport:
        "Do not import `react-native-svg`. Consider using an alternative method for SVG handling or ensure it's necessary for your use case.",
    },
    schema: [],
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        if (node.source.value === "react-native-svg") {
          context.report({
            node,
            messageId: "noReactNativeSvgImport",
          });
        }
      },
      CallExpression(node) {
        if (
          node.callee.type === "Identifier" &&
          node.callee.name === "require" &&
          node.arguments.length > 0 &&
          node.arguments[0].type === "Literal" &&
          node.arguments[0].value === "react-native-svg"
        ) {
          context.report({
            node,
            messageId: "noReactNativeSvgImport",
          });
        }
      },
    };
  },
};
