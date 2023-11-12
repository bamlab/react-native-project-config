/**
 * @fileoverview Forces usage of userEvent.press over fireEvent.press and userEvent.type over fireEvent.changeText
 * @author Pierre Zimmermann
 */
import type { Rule } from 'eslint'

export const  preferUserEventRule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description: "Enforces usage of userEvent over fireEvent in tests.",
      category: "Possible Errors",
      recommended: true,
      url: "https://github.com/bamlab/react-native-project-config/tree/main/packages/eslint-plugin/docs/rules/prefer-user-event.md",
    },
    messages: {
      replacePress: "Replace `fireEvent.press` with `await userEvent.press.`",
      replaceChangeText: "Replace `fireEvent.changeText` with `await userEvent.type.`",
    },
    fixable: "code",
    schema: [],
  },

  create(context) {
    return {
      MemberExpression: (node) => {
        if ('name' in node.object && node.object.name === "fireEvent") {
          if ('name' in node.property && node.property.name === "press") {
            context.report({
              node: node.property,
              messageId: "replacePress",
              fix(fixer) {
                return [
                  fixer.replaceText(node.object, "await userEvent"),
                  fixer.replaceText(node.property, "press"),
                ];
              },
            });
          } else if ('name' in node.property && node.property.name === "changeText") {
            context.report({
              node: node.property,
              messageId: "replaceChangeText",
              fix(fixer) {
                return [
                  fixer.replaceText(node.object, "await userEvent"),
                  fixer.replaceText(node.property, "type"),
                ];
              },
            });
          }
        }
      },
    };
  },
};
