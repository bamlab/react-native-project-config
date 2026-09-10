/** No test suite existed for this rule under ESLint; these cases are new. */
import { preferUserEventRule } from "../../lib/rules/prefer-user-event.js";
import { ts } from "../ruleTester.js";

ts.run("prefer-user-event", preferUserEventRule, {
  valid: [
    `await userEvent.press(button);`,
    `await userEvent.type(input, "hi");`,
    `fireEvent.scroll(list);`,
    `fireEvent(button, "press");`,
  ],
  invalid: [
    {
      code: `fireEvent.press(button);`,
      errors: [{ messageId: "replacePress" }],
      output: `await userEvent.press(button);`,
    },
    {
      code: `fireEvent.changeText(input, "hi");`,
      errors: [{ messageId: "replaceChangeText" }],
      output: `await userEvent.type(input, "hi");`,
    },
  ],
});
