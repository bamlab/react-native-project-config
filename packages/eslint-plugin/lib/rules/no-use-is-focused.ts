import type { Rule } from "eslint";
import type { ImportDeclaration, CallExpression, Property } from "estree";

// Custom Rule: No Import of useIsFocused from @react-navigation/native
export const noUseIsFocusedImportRule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow importing `useIsFocused` from `@react-navigation/native` to encourage using `useFocusEffect` instead.",
      category: "Best Practices",
      recommended: true,
      url: "https://github.com/bamlab/react-native-project-config/tree/main/packages/eslint-plugin/docs/rules/no-use-is-focused.md",
    },
    messages: {
      noUseIsFocusedImport:
        "Please use 'useFocusEffect' instead of 'useIsFocused' to avoid excessive rerenders: 'useIsFocused' will trigger rerender both when the page goes in and out of focus.",
    },
    schema: [],
    fixable: "code",
  },

  create(context) {
    return {
      ImportDeclaration(node: ImportDeclaration) {
        if (node.source.value === "@react-navigation/native") {
          node.specifiers.forEach((specifier) => {
            if (
              specifier.type === "ImportSpecifier" &&
              specifier.imported.name === "useIsFocused"
            ) {
              context.report({
                node: specifier,
                messageId: "noUseIsFocusedImport",
              });
            }
          });
        }
      },
      CallExpression(node: CallExpression) {
        if (
          node.callee.type === "Identifier" &&
          node.callee.name === "require" &&
          node.arguments.length > 0 &&
          node.arguments[0].type === "Literal" &&
          node.arguments[0].value === "@react-navigation/native"
        ) {
          const ancestors = context.getAncestors();
          const parent = ancestors[ancestors.length - 1]; // Get the direct parent of the node

          if (
            parent.type === "VariableDeclarator" &&
            parent.id.type === "ObjectPattern"
          ) {
            const properties = parent.id.properties as Property[];
            const useIsFocusedProperty = properties.find(
              (prop) =>
                prop.type === "Property" &&
                prop.key.type === "Identifier" &&
                prop.key.name === "useIsFocused",
            );

            if (useIsFocusedProperty) {
              context.report({
                node: useIsFocusedProperty,
                messageId: "noUseIsFocusedImport",
              });
            }
          }
        }
      },
    };
  },
};
