/**
 * @fileoverview Requires accessible prop when accessibility props
 * @author Paul Briand
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/accessibility-props-require-accessible"),
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
  `<View accessibilityRole='button' accessible />`,
  `<View accessible >
    <View accessibilityLabel='this is a label' />
  </View>`,
];

ruleTester.run("accessibility-props-require-accessible", rule, {
  valid,

  invalid: [
    {
      code: `<View accessibilityRole="button" />`,
      errors: ["Requires accessible prop when role prop is defined"],
    },
    {
      code: `<View accessibilityLabel="this is a label" />`,
      errors: ["Requires accessible prop when label prop is defined"],
    },
  ],
});
