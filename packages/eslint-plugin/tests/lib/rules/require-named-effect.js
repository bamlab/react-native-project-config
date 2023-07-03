/**
 * @fileoverview Force the use of named functions inside a useEffect
 * @author Cyril Bonaccini
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/require-named-effect"),
  RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
});

const valid = [
  `useEffect(function namedFunction() {}, []);`,
  `useEffect(theNameOfAFunction(), []);`,
  `useEffect(() => theNameOfAFunction(), []);`,
  `useEffect(() => {
      theOnlyChildIsAFunctionCall();
    }, []);`,
];

const invalid = [
  `useEffect(() => {}, []);`,
  `useEffect(() => {
      const t = 1;
      disallowTwoThings(t);
    }, []);`,
];

ruleTester.run("require-named-effect", rule, {
  valid,
  invalid: invalid.map((code) => ({
    code,
    errors: ["Complex effects must be a named function."],
  })),
});
