/**
 * @fileoverview Force the use of named functions inside a useEffect
 * @author Cyril Bonaccini
 */
import type { Rule } from "@oxlint/plugins";

export const requireNamedEffectRule: Rule = {
  meta: {
    type: "suggestion",
    docs: {
      description: "Enforce the use of named functions inside a useEffect",
    },
    schema: [],
    messages: {
      useNamedFunction: "Complex effects must be a named function.",
    },
  },

  create(context) {
    /**
     * An effect is simple enough to stay inline when its whole body is a single
     * function call, in any of the three shapes that can express:
     *   useEffect(() => theNameOfAFunction(), []);
     *   useEffect(() => void theNameOfAFunction(), []);
     *   useEffect(() => { theOnlyChildIsAFunctionCall(); }, []);
     */
    const effectBodyIsSingleFunction = (firstArg: any): boolean => {
      if (!("body" in firstArg)) return false;
      const { body } = firstArg;

      if (body.type === "CallExpression") return true;

      if (body.type === "UnaryExpression")
        return body.argument.type === "CallExpression";

      return Boolean(
        "body" in body &&
        Array.isArray(body.body) &&
        body.body.length === 1 &&
        body.body[0] &&
        "expression" in body.body[0] &&
        body.body[0].expression &&
        body.body[0].expression.type === "CallExpression",
      );
    };

    return {
      CallExpression(node) {
        const [firstArg] = node.arguments;

        if (
          "name" in node.callee &&
          node.callee.name === "useEffect" &&
          firstArg?.type === "ArrowFunctionExpression" &&
          !effectBodyIsSingleFunction(firstArg)
        ) {
          context.report({ node, messageId: "useNamedFunction" });
        }
      },
    };
  },
};
