/**
 * @fileoverview Force the use of named functions inside a useEffect
 * @author Cyril Bonaccini
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

/** @type {import('eslint').Rule.RuleModule} */
module.exports = {
  meta: {
    type: "suggestion", // `problem`, `suggestion`, or `layout`
    docs: {
      description: "Force the use of named functions inside a useEffect",
      recommended: true,
      url: "https://github.com/bamlab/react-native-project-config/tree/main/packages/eslint-plugin/docs/rules/require-named-effect.md", // URL to the documentation page for this rule
    },
    fixable: null, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options,
    messages: {
      useNamedFunction: "Complex effects must be a named function.",
    },
  },

  create(context) {
    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    const isUseEffect = (node) => node.callee.name === "useEffect";

    const argumentIsArrowFunction = (node) =>
      node.arguments[0].type === "ArrowFunctionExpression";

    const effectBodyIsSingleFunction = (node) => {
      const { body } = node.arguments[0];

      // It's a single unwrapped function call:
      //   `useEffect(() => theNameOfAFunction(), []);`
      if (body.type === "CallExpression") {
        return true;
      }

      // There's a function body, but it just calls another function:
      //   `useEffect(() => {
      //     theOnlyChildIsAFunctionCall();
      //   }, []);`
      if (
        body.body.length &&
        body.body.length === 1 &&
        body.body[0] &&
        body.body[0].expression &&
        body.body[0].expression.type === "CallExpression"
      ) {
        return true;
      }

      return false;
    };

    const fail = (report, node) =>
      report({ node, messageId: "useNamedFunction" });

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      CallExpression(node) {
        if (
          isUseEffect(node) &&
          argumentIsArrowFunction(node) &&
          !effectBodyIsSingleFunction(node)
        ) {
          fail(context.report, node);
        }
      },
    };
  },
};
