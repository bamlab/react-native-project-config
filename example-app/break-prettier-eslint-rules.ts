// Save without formatting: [⌘ + K] > [S]

// This should trigger an error breaking eslint-plugin-prettier:
// prettier/prettier

export function aVeryLongFunctionNameWhichShouldBeForbiddenBecauseItIsReallyTooLongToRead() { return 1; }
