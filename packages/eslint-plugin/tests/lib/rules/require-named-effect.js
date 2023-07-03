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

const ruleTester = new RuleTester();
ruleTester.run("require-named-effect", rule, {
  valid: [
    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: "useEffect(() => {}, []);",
      errors: [{ message: "Fill me in.", type: "Me too" }],
    },
  ],
});
