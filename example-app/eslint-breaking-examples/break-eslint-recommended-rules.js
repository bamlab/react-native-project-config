// Save without formatting: [⌘ + K] > [S]

"use strict";

console.log(
  "This is a console.log statement to see it the linter produces an error"
);

// This should trigger two errors breaking eslint:recommended rules:
// no-constant-condition
// no-empty
if (true) {
}

// This should trigger an error breaking no-floating-promises rule
const promise = new Promise((resolve) => resolve("value"));
promise;
