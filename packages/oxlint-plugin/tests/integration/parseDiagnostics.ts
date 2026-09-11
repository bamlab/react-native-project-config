/**
 * Parse the rule ids out of an `oxlint --format=json` run.
 *
 * The format has to be pinned. Oxlint's default output switches to GitHub
 * Actions annotations when it detects that environment, and those carry only
 * the message, not the rule id, so parsing the human-readable output passed
 * locally and reported nothing at all in CI.
 *
 * Throws when a run yields no diagnostics. Every fixture here is a deliberate
 * pile of violations, so an empty result always means the run itself failed:
 * the config did not load, the binary did not start, or no file was matched.
 * Returning `[]` for that turns one real cause into a spray of "expected [] to
 * include ..." assertions naming none of it, and silently satisfies every
 * `not.toContain` assertion in the suite.
 */
interface OxlintJsonOutput {
  diagnostics?: { code?: string }[];
}

export const parseDiagnostics = (output: string): string[] => {
  let parsed: OxlintJsonOutput;

  try {
    parsed = JSON.parse(output) as OxlintJsonOutput;
  } catch {
    throw new Error(
      `oxlint did not produce JSON. Raw output:\n${output || "(empty)"}`,
    );
  }

  const rules = (parsed.diagnostics ?? [])
    .map((diagnostic) => diagnostic.code)
    .filter((code): code is string => code !== undefined);

  if (rules.length === 0) {
    throw new Error(
      `oxlint reported no diagnostics, so the run did not do what the test assumes. Raw output:\n${output || "(empty)"}`,
    );
  }

  return rules;
};
