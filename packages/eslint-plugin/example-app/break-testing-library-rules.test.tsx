// This should trigger an error breaking eslint-testing-library rule:
// testing-library/no-await-sync-events

it("a test", () => {
  await fireEvent();
});
