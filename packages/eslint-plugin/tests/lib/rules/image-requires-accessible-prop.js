/**
 * @fileoverview Image requires an accessible prop
 * @author Paul Briand
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

const rule = require("../../../lib/rules/image-requires-accessible-prop"),
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
      jsx: true, // This is the key line
    },
  },
});

const valid = [
  `<Image source={{uri:""}} accessible />`,
  `<BackgroundImage source={{uri:""}} accessible={false} />`,
];

const invalid = [
  `<Image source={{uri:""}} />`,
  `<BackgroundImage source={{uri:""}} />`,
];

ruleTester.run("image-requires-accessible-prop", rule, {
  valid,

  invalid: invalid.map((code) => ({
    code,
    errors: ["Image components require accessible prop"],
  })),
});
