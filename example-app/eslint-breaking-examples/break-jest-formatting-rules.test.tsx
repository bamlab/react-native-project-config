// Save without formatting: [⌘ + K] > [S]

// This should trigger an error breaking eslint-pluging-jest rule:
// jest/padding-around-all

it("a test", () => {
  const abc = 123;
  expect(abc).toEqual(123);
});
