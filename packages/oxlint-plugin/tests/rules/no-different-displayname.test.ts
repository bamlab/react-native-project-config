import { noDifferentDisplaynameRule } from "../../lib/rules/no-different-displayname.js";
import { ts } from "../ruleTester.js";

ts.run("no-different-displayname", noDifferentDisplaynameRule, {
  valid: [
    `
        const MyComponent = () => {};
        MyComponent.displayName = "MyComponent";
      `,
  ],
  invalid: [
    {
      code: `
        const MyComponent = () => {};
        MyComponent.displayName = "WrongName";
      `,
      errors: [{ messageId: "displayNameMismatch" }],
      output: `
        const MyComponent = () => {};
        MyComponent.displayName = "MyComponent";
      `,
    },
  ],
});
