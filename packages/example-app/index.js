"use strict";

console.log(
  "This is a console.log statement to see it the linter produces an error"
);

// This should trigger some errors because it breaks rules no-constant-condition
// and no-empty contained in config eslint:recommended.
if (true) {
}
