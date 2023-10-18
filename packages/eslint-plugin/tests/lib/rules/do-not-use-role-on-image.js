/**
 * @fileoverview role prop does not work on react-native Image component
 * @author Paul Briand
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/do-not-use-role-on-image"),
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

const valid = [`<Image source={{uri:""}} accessibilityRole='button' />`];

const invalid = [
  {
    code: `<Image source={{uri:""}} role='button' />`,
    errors: ["Use 'accessibilityRole' instead of 'role' on Image component"],
    output: `<Image source={{uri:""}} accessibilityRole='button' />`,
  },
  {
    code: `<Image source={{uri:""}} role='img' />`,
    errors: ["Use 'accessibilityRole' instead of 'role' on Image component"],
    output: `<Image source={{uri:""}} accessibilityRole='image' />`,
  },
];
ruleTester.run("image-requires-accessible-prop", rule, {
  valid,
  invalid,
});
