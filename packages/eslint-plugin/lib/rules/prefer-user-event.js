/**
 * @fileoverview Forces usage of userEvent.press over fireEvent.press and userEvent.type over fireEvent.changeText
 * @author Pierre Zimmermann
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "problem",
    docs: {
      description: "Enforces usage of userEvent over fireEvent in tests.",
      category: "Possible Errors",
      recommended: true,
      url: "https://github.com/bamlab/react-native-project-config/tree/main/packages/eslint-plugin/docs/rules/prefer-user-event.md",
    },
    messages: {
      replacePress: "Replace fireEvent.press with await userEvent.press.",
      replaceChangeText: "Replace fireEvent.changeText with userEvent.type.",
    },
    fixable: "code",
    schema: [],
  },

  create(context) {
    return {
      MemberExpression: (node) => {
        if (node.object.name === "fireEvent") {
          if (node.property.name === "press") {
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
          } else if (node.property.name === "changeText") {
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
