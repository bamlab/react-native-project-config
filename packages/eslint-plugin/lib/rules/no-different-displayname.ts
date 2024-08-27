/**
 * @fileoverview Enforces component displayName to match with component name
 * @author Remi Leroy
 */

import type { Rule } from "eslint";
import * as ESTree from "estree";

export const noDifferentDisplaynameRule: Rule.RuleModule = {
  meta: {
    type: "problem",
    docs: {
      description: "Enforce component displayName to match with component name",
      recommended: false,
      url: "https://github.com/bamlab/react-native-project-config/tree/main/packages/eslint-plugin/docs/rules/no-different-displayname.md",
    },
    messages: {
      displayNameMismatch: "DisplayName does not match the component name",
    },
    schema: [],
    fixable: "code",
  },

  create(context) {
    return {
      'Program > ExpressionStatement > AssignmentExpression:has(Identifier[name="displayName"])'(
        node: ESTree.AssignmentExpression,
      ) {
        if (!("object" in node.left)) return;
        if (!("name" in node.left.object)) return;
        if (!("value" in node.right)) return;

        const componentName = node.left.object.name;
        const displayedName = node.right.value;

        if (componentName !== displayedName) {
          context.report({
            node,
            message: "DisplayName does not match the component name",
            fix(fixer) {
              return fixer.replaceText(node.right, `"${componentName}"`);
            },
          });
        }
      },
    };
  },
};
