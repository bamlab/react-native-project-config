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
      url: "https://github.com/bamlab/react-native-project-config/tree/main/packages/eslint-plugin/docs/rules/no-animated-without-native-driver.md",
    },
    messages: {
      noNativeDriverFalse:
        "Do not use Animated with useNativeDriver: false. Always set useNativeDriver: true for better performance.",
    },
    schema: [],
  },

  create(context) {
    return {
      CallExpression(node) {
        // Check if the node is a call to `Animated` object
        if (
          node.callee.type === "MemberExpression" &&
          node.callee.object.type === "Identifier" &&
          node.callee.object.name === "Animated"
        ) {
          // Handle the case: Animated.someMethod(..., { useNativeDriver: false })
          if (
            node.arguments.length > 0 &&
            node.arguments[1].type === "ObjectExpression"
          ) {
            const useNativeDriverPropertyIsFalse =
              node.arguments[1].properties.find(
                (prop) =>
                  prop.type === "Property" &&
                  prop.key.type === "Identifier" &&
                  prop.key.name === "useNativeDriver" &&
                  prop.value.type === "Literal" &&
                  prop.value.value === false,
              );

            if (useNativeDriverPropertyIsFalse) {
              context.report({
                node: useNativeDriverPropertyIsFalse,
                messageId: "noNativeDriverFalse",
              });
            }
          }

          // Handle the case: Animated.event([...], { useNativeDriver: false })
          if (
            node.callee.property.type === "Identifier" &&
            node.callee.property.name === "event" &&
            node.arguments.length > 1 &&
            node.arguments[1].type === "ObjectExpression"
          ) {
            const useNativeDriverPropertyIsFalse =
              node.arguments[1].properties.find(
                (prop) =>
                  prop.type === "Property" &&
                  prop.key.type === "Identifier" &&
                  prop.key.name === "useNativeDriver" &&
                  prop.value.type === "Literal" &&
                  prop.value.value === false,
              );

            if (useNativeDriverPropertyIsFalse) {
              context.report({
                node: useNativeDriverPropertyIsFalse,
                messageId: "noNativeDriverFalse",
              });
            }
          }
        }
      },
    };
  },
};
