// Save without formatting: [⌘ + K] > [S]

// This should trigger an error breaking eslint-jest-formatting rule:
// jest-formatting/padding-around-all

it("a test", () => {
  const abc = 123;
  expect(abc).toEqual(123);
});
