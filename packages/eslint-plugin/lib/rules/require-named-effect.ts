/**
 * @fileoverview Force the use of named functions inside a useEffect
 * @author Cyril Bonaccini
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

import type { Rule } from "eslint";
import { CallExpression } from "estree";

export const requireNamedEffectRule: Rule.RuleModule = {
  meta: {
    type: "suggestion", // `problem`, `suggestion`, or `layout`
    docs: {
      description: "Enforces the use of named functions inside a useEffect",
      recommended: false,
      url: "https://github.com/bamlab/react-native-project-config/tree/main/packages/eslint-plugin/docs/rules/require-named-effect.md", // URL to the documentation page for this rule
    },
    fixable: undefined, // Or `code` or `whitespace`
    schema: [], // Add a schema if the rule has options,
    messages: {
      useNamedFunction: "Complex effects must be a named function.",
    },
  },

  create(context) {
    //----------------------------------------------------------------------
    // Helpers
    //----------------------------------------------------------------------

    const argumentIsArrowFunction = (
      node: CallExpression & Rule.NodeParentExtension,
    ) => {
      return node.arguments[0].type === "ArrowFunctionExpression";
    };

    const effectBodyIsSingleFunction = (
      node: CallExpression & Rule.NodeParentExtension,
    ) => {
      const firstArg = node.arguments[0];
      if (!("body" in firstArg)) {
        return false;
      }
      const { body } = firstArg;

      // It's a single unwrapped function call:
      //   `useEffect(() => theNameOfAFunction(), []);`
      if (body.type === "CallExpression") {
        return true;
      }

      // It's a unary expression that contains a function call:
      //   `useEffect(() => void theNameOfAFunction(), []);`
      if (body.type === "UnaryExpression") {
        if (body.argument.type === "CallExpression") {
          return true;
        }
      }

      // There's a function body, but it just calls another function:
      //   `useEffect(() => {
      //     theOnlyChildIsAFunctionCall();
      //   }, []);`
      if (
        "body" in body &&
        "length" in body.body &&
        body.body.length &&
        body.body.length === 1 &&
        body.body[0] &&
        "expression" in body.body[0] &&
        body.body[0].expression &&
        body.body[0].expression.type === "CallExpression"
      ) {
        return true;
      }

      return false;
    };

    //----------------------------------------------------------------------
    // Public
    //----------------------------------------------------------------------

    return {
      CallExpression(node) {
        if (
          "name" in node.callee &&
          node.callee.name === "useEffect" &&
          argumentIsArrowFunction(node) &&
          !effectBodyIsSingleFunction(node)
        ) {
          context.report({ node, messageId: "useNamedFunction" });
        }
      },
    };
  },
};
