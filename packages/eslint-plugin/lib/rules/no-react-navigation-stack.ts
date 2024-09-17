import type { Rule } from "eslint";

// Custom Rule: No Import from @react-navigation/stack
export const noReactNavigationStackImportRule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow importing from `@react-navigation/stack` and suggest using `@react-navigation/native-stack` instead.",
      category: "Best Practices",
      recommended: true,
      url: "https://github.com/bamlab/react-native-project-config/tree/main/packages/eslint-plugin/docs/rules/no-react-navigation-stack.md",
    },
    messages: {
      noReactNavigationStackImport:
        '"@react-navigation/native-stack" provides out of the box native screens and native transitions for better performance and user experience.',
    },
    schema: [],
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        // Check if the import is from "@react-navigation/stack"
        if (node.source.value === "@react-navigation/stack") {
          context.report({
            node,
            messageId: "noReactNavigationStackImport",
          });
        }
      },
      CallExpression(node) {
        // Check if require() is used to import "@react-navigation/stack"
        if (
          node.callee.type === "Identifier" &&
          node.callee.name === "require" &&
          node.arguments.length > 0 &&
          node.arguments[0].type === "Literal" &&
          node.arguments[0].value === "@react-navigation/stack"
        ) {
          context.report({
            node,
            messageId: "noReactNavigationStackImport",
          });
        }
      },
    };
  },
};
