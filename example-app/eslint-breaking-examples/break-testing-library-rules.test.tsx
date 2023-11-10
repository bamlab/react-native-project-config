import { fireEvent, userEvent } from "@testing-library/react-native";
// Save without formatting: [⌘ + K] > [S]

// This should trigger an error breaking eslint-testing-library rule:
// testing-library/no-await-sync-events
// @typescript-eslint/no-floating-promises

it("a test", async () => {
  await fireEvent();
  userEvent.press(button);
});
