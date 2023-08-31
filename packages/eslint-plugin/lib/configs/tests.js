// @ts-check
"use strict";

const { defineConfig } = require("eslint-define-config");

module.exports = defineConfig({
  env: {
    "jest/globals": true,
  },
  plugins: ["jest", "jest-formatting", "testing-library"],
  rules: {
    // Setting the recommended rules manually, because we don't want warnings, only errors
    "jest/no-alias-methods": "error", // STYLE
    "jest/no-commented-out-tests": "error",
    "jest/no-conditional-expect": "error",
    "jest/no-conditional-in-test": "error",
    "jest/no-deprecated-functions": "error",
    "jest/no-disabled-tests": "error",
    "jest/no-done-callback": "error",
    "jest/no-export": "error",
    "jest/no-focused-tests": "error",
    "jest/no-identical-title": "error",
    "jest/no-mocks-import": "error",
    "jest/no-standalone-expect": "error",
    "jest/no-test-prefixes": "error", // STYLE - force it.skip over xtest
    "jest/no-test-return-statement": "error",
    "jest/prefer-to-have-length": "error", // STYLE
    "jest/valid-describe-callback": "error",
    "jest/valid-expect": "error",
    "jest/valid-expect-in-promise": "error",
    "jest/valid-title": ["error", { disallowedWords: ["should"] }], // STYLE
    "jest-formatting/padding-around-all": "error", // STYLE
    "testing-library/await-async-queries": "error",
    "testing-library/no-manual-cleanup": "error",
    "testing-library/no-container": "error",
    "testing-library/no-await-sync-queries": "error",
    "testing-library/no-await-sync-events": "error",
    "testing-library/no-debugging-utils": "error",
    "testing-library/await-async-utils": "error",
    "testing-library/no-promise-in-fire-event": "error",
    "testing-library/no-render-in-lifecycle": "error",
    "testing-library/no-unnecessary-act": "error",
    "testing-library/no-wait-for-multiple-assertions": "error",
    "testing-library/prefer-explicit-assert": "error",
    "testing-library/prefer-presence-queries": "error",
    "testing-library/no-wait-for-side-effects": "error",
    "testing-library/prefer-screen-queries": "error",
  },
});
