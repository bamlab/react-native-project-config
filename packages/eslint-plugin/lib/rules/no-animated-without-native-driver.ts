import type { Rule } from "eslint";

// Custom Rule: No Animated with useNativeDriver: false
export const noAnimatedWithoutNativeDriverRule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description:
        "Disallow the use of `Animated` with `useNativeDriver: false`",
      category: "Possible Errors",
      recommended: true,
      url: "https://example.com/rule/no-animated-without-native-driver",
    },
    messages: {
      noNativeDriverFalse:
        "Do not use Animated with useNativeDriver: false. Always set useNativeDriver: true for better performance.",
    },
    schema: [],
    fixable: "code",
  },

  create(context) {
    return {
      CallExpression(node) {
        if (
          node.callee.type === "MemberExpression" &&
          node.callee.object.type === "Identifier" &&
          node.callee.object.name === "Animated" &&
          node.arguments.length > 0 &&
          node.arguments[0].type === "ObjectExpression"
        ) {
          const useNativeDriverProperty = node.arguments[0].properties.find(
            (prop) =>
              prop.type === "Property" &&
              prop.key.type === "Identifier" &&
              prop.key.name === "useNativeDriver" &&
              prop.value.type === "Literal" &&
              prop.value.value === false,
          );

          if (useNativeDriverProperty) {
            context.report({
              node: useNativeDriverProperty,
              messageId: "noNativeDriverFalse",
            });
          }
        }
      },
    };
  },
};
