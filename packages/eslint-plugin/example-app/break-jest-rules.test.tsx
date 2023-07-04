// Save without formatting: [⌘ + K] > [S]

// This should trigger an error breaking eslint-jest rules:
// jest/valid-title
// jest/no-identical-title

it("should not fail", () => {
  expect(1).toBe(1);
});

it("should not fail", () => {
  expect(1).toBe(1);
});
