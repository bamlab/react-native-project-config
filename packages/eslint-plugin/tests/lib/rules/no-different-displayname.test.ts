/**
 * @fileoverview Enforce component displayName to match with component name
 * @author Remi Leroy
 */

import { RuleTester } from "eslint";
import { noDifferentDisplaynameRule } from "../../../lib/rules/no-different-displayname";

const ruleTester = new RuleTester({
  languageOptions: {
    parser: require("typescript-eslint").parser,
  },
});

const valid = [
  {
    code: `
        const MyComponent = () => {};
        MyComponent.displayName = "MyComponent";
      `,
  },
];

const invalid = [
  {
    code: `
        const MyComponent = () => {};
        MyComponent.displayName = "WrongName";
      `,
    errors: [{ message: "DisplayName does not match the component name" }],
    output: `
        const MyComponent = () => {};
        MyComponent.displayName = "MyComponent";
      `,
  },
];

ruleTester.run("no-different-displayname", noDifferentDisplaynameRule, {
  valid,
  invalid,
});
