/**
 * Drives the real oxlint binary through the shipped presets.
 *
 * The rule suites prove each rule in isolation; this proves the delivery: that
 * the presets parse, that the plugin resolves by package name, that rule
 * options survive, and that each preset actually reports what it claims to.
 */
import { execFileSync } from "node:child_process";
import {
  mkdtempSync,
  rmSync,
  symlinkSync,
  writeFileSync,
  mkdirSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { afterAll, beforeAll, describe, expect, it } from "vitest";

import { parseDiagnostics } from "./parseDiagnostics";

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const repoRoot = join(packageRoot, "..", "..");

let projectDir: string;

/** Lint `files` in the fixture project and return the reported rule ids. */
const lint = (files: string): string[] => {
  let output = "";

  try {
    output = execFileSync(
      process.execPath,
      [join(repoRoot, "node_modules", "oxlint", "dist", "cli.js"), files],
      { cwd: projectDir, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
    );
  } catch (error) {
    // oxlint exits non-zero when it reports anything, which is the normal case
    // here: the fixtures are deliberate violations.
    const failure = error as { stdout?: string; stderr?: string };
    output = `${failure.stdout ?? ""}${failure.stderr ?? ""}`;
  }

  return parseDiagnostics(output);
};

beforeAll(() => {
  projectDir = mkdtempSync(join(tmpdir(), "bam-oxlint-"));
  mkdirSync(join(projectDir, "node_modules", "@bam.tech"), { recursive: true });
  mkdirSync(join(projectDir, "src"), { recursive: true });

  // Resolve the plugin by package name, exactly as a consumer would.
  symlinkSync(
    packageRoot,
    join(projectDir, "node_modules", "@bam.tech", "oxlint-plugin"),
  );
  symlinkSync(
    join(repoRoot, "node_modules", "oxlint"),
    join(projectDir, "node_modules", "oxlint"),
  );

  writeFileSync(
    join(projectDir, ".oxlintrc.json"),
    JSON.stringify({
      extends: [
        "./node_modules/@bam.tech/oxlint-plugin/configs/recommended.oxlintrc.json",
        "./node_modules/@bam.tech/oxlint-plugin/configs/import.oxlintrc.json",
        "./node_modules/@bam.tech/oxlint-plugin/configs/a11y.oxlintrc.json",
        "./node_modules/@bam.tech/oxlint-plugin/configs/tests.oxlintrc.json",
      ],
    }),
  );

  writeFileSync(
    join(projectDir, "src", "app.tsx"),
    `export const A = () => {
  useEffect(() => {
    const t = 1;
    doTwoThings(t);
  }, []);
  return <View style={[styles.container, { marginTop: 10 }]} />;
};
export const B = () => <View>Raw text here</View>;
export const C = () => <Pressable onPress={f} />;
export const D = () => <View accessibilityLabel="x" />;
export const E = () => <View style={{ flex: 1 }} />;
export const F = () => <Pressable accessibilityState={{ nope: true }} onPress={f} accessibilityRole="button" />;
const G = () => {};
G.displayName = "WrongName";
export { G };
console.log("nope");
`,
  );

  writeFileSync(
    join(projectDir, "src", "app.test.tsx"),
    `it("should work", () => {
  fireEvent.press(button);
  userEvent.press(button);
});
`,
  );
});

afterAll(() => {
  rmSync(projectDir, { recursive: true, force: true });
});

describe("shipped presets", () => {
  it("reports every custom rule through the recommended and a11y presets", () => {
    const reported = lint("src/app.tsx");

    expect(reported).toEqual(
      expect.arrayContaining([
        "@bam.tech(require-named-effect)",
        "@bam.tech(no-inline-style-in-array)",
        "@bam.tech(no-raw-text)",
        "@bam.tech(has-valid-accessibility-descriptors)",
        "@bam.tech(has-accessibility-hint)",
        "@bam.tech(has-valid-accessibility-state)",
        "@bam.tech(no-different-displayname)",
      ]),
    );
  });

  it("reports inline style objects through the native react-perf rule", () => {
    expect(lint("src/app.tsx")).toContain(
      "react-perf(jsx-no-new-object-as-prop)",
    );
  });

  it("reports native eslint rules", () => {
    expect(lint("src/app.tsx")).toContain("eslint(no-console)");
  });

  it("applies the tests preset only to test files", () => {
    const inTestFile = lint("src/app.test.tsx");

    expect(inTestFile).toEqual(
      expect.arrayContaining([
        "@bam.tech(prefer-user-event)",
        "@bam.tech(await-user-event)",
      ]),
    );
    // `disallowedWords: ["should"]` has to survive the migration into the preset
    expect(inTestFile).toContain("jest(valid-title)");
  });

  it("does not load any ESLint plugin", () => {
    const reported = [...lint("src/app.tsx"), ...lint("src/app.test.tsx")];
    const eslintPluginPrefixes = [
      "prettier(",
      "react-native(",
      "react-native-a11y(",
      "testing-library(",
      "unused-imports(",
      "simple-import-sort(",
    ];

    for (const prefix of eslintPluginPrefixes) {
      expect(reported.filter((id) => id.startsWith(prefix))).toEqual([]);
    }
  });
});
