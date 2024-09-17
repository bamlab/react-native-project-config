import type { Rule } from "eslint";

// Custom Rule: No FlatList Import
export const noFlatListImportRule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow importing `FlatList` from `react-native` due to potential performance concerns or the preference for alternative components.",
      category: "Possible Errors",
      recommended: true,
      url: "https://github.com/bamlab/react-native-project-config/tree/main/packages/eslint-plugin/docs/rules/no-flatlist.md",
    },
    messages: {
      noFlatListImport:
        "FlatList is poorly optimized for performance, use FlashList from @shopify/flash-list for adequate list performance.",
    },
    schema: [],
    fixable: "code",
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        if (
          node.source.value === "react-native" &&
          node.specifiers.some(
            (specifier) =>
              specifier.type === "ImportSpecifier" &&
              specifier.imported.name === "FlatList",
          )
        ) {
          context.report({
            node,
            messageId: "noFlatListImport",
          });
        }
      },
      VariableDeclarator(node) {
        if (
          node.init &&
          node.init.type === "CallExpression" &&
          node.init.callee.type === "Identifier" &&
          node.init.callee.name === "require" &&
          node.init.arguments.length > 0 &&
          node.init.arguments[0].type === "Literal" &&
          node.init.arguments[0].value === "react-native"
        ) {
          const flatListBinding =
            node.id.type === "ObjectPattern" &&
            node.id.properties.some(
              (property) =>
                property.type === "Property" &&
                property.key.type === "Identifier" &&
                property.key.name === "FlatList",
            );

          if (flatListBinding) {
            context.report({
              node,
              messageId: "noFlatListImport",
            });
          }
        }
      },
    };
  },
};
