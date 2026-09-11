/**
 * Parse the rule ids out of oxlint's human-readable output.
 *
 * Throws when a run yields no diagnostics at all. Every fixture here is a
 * deliberate pile of violations, so an empty result always means the run
 * itself failed: the config did not load, the binary did not start, or no file
 * was matched. Returning `[]` for that turns one real cause into a spray of
 * "expected [] to include ..." assertions that name none of it, and silently
 * satisfies every `not.toContain` assertion in the suite.
 */
export const parseDiagnostics = (output: string): string[] => {
  const rules = [
    ...output.matchAll(/(?:error|warning) ([\w@.-]+\([\w-]+\))/g),
  ].map((match) => match[1]!);

  if (rules.length === 0) {
    throw new Error(
      `oxlint reported no diagnostics, so the run did not do what the test assumes. Raw output:\n${output || "(empty)"}`,
    );
  }

  return rules;
};
