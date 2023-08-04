/**
 * @fileoverview Enforces accessibilityRole or role when component is accessible
 * @author Paul Briand
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/requires-accessibility-role-when-accessible"),
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
  `<View accessible accessibilityRole="button" />`,
  `<Pressable accessible accessibilityRole="button" />`,
];

ruleTester.run("requires-accessibility-role-when-accessible", rule, {
  valid,

  invalid: [
    {
      code: `<View accessible />`,
      errors: ["Requires accessibilityRole when accessible"],
    },
    {
      code: `<Pressable onPress={()=>{}}  accessible />`,
      errors: ["Requires accessibilityRole when accessible"],
    },
    {
      code: `<Image source={{uri:""}} accessible />`,
      errors: ["Requires accessibilityRole when accessible"],
    },
  ],
});
