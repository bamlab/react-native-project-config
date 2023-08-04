/**
 * @fileoverview Enforces label when component accessible
 * @author Paul Briand
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/requires-accessibility-label"),
  RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

const ruleTester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
});

const valid = [
  `<View accessible accessibilityLabel="foo" />`,
  `<View accessible>
    <Text>foo</Text>
  </View>`,
];

ruleTester.run("requires-accessibility-label", rule, {
  valid,

  invalid: [
    {
      code: `<View accessible />`,
      errors: ["Requires accessibilityLabel"],
    },
    {
      code: `<View accessible>
    <Text>foo</Text>
    <View accessible accessibilityLabel="foo" />
  </View>`,
      errors: ["Requires accessibilityLabel"],
    },
  ],
});
