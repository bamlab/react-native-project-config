/** No test suite existed for this rule under ESLint; these cases are new. */
import { awaitUserEventRule } from "../../lib/rules/await-user-event.js";
import { ts } from "../ruleTester.js";

ts.run("await-user-event", awaitUserEventRule, {
  valid: [
    `await userEvent.press(button);`,
    `await userEvent.type(input, "hello");`,
    `fireEvent.press(button);`,
    `otherEvent.press(button);`,
    `await userEvent.press(await screen.findByText("ok"));`,
  ],
  invalid: [
    {
      code: `userEvent.press(button);`,
      errors: [{ messageId: "missingAwait" }],
      output: `await userEvent.press(button);`,
    },
    {
      code: `userEvent.type(input, "hello");`,
      errors: [{ messageId: "missingAwait" }],
      output: `await userEvent.type(input, "hello");`,
    },
  ],
});
