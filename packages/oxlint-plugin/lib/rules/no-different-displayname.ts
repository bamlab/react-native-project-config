/**
 * @fileoverview Enforces component displayName to match with component name
 * @author Remi Leroy
 */
import type { Rule } from "@oxlint/plugins";

/**
 * A selector-keyed visitor gets no inferable node type, so the matched shape is
 * described here: `Component.displayName = "..."`.
 */
interface DisplayNameAssignment {
  left: { object?: { name?: string } };
  right: { value?: unknown };
}

export const noDifferentDisplaynameRule: Rule = {
  meta: {
    type: "problem",
    docs: {
      description: "Enforce component displayName to match with component name",
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
        node: never,
      ) {
        const assignment = node as unknown as DisplayNameAssignment;
        const componentName = assignment.left.object?.name;
        const displayedName = assignment.right.value;

        if (componentName === undefined) return;
        if (displayedName === undefined) return;

        if (componentName !== displayedName) {
          context.report({
            node,
            messageId: "displayNameMismatch",
            fix: (fixer) =>
              fixer.replaceText(
                assignment.right as never,
                `"${componentName}"`,
              ),
          });
        }
      },
    };
  },
};
