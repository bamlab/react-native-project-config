/**
 * `defineBamConfig` is the documented entry point, so it is tested through the
 * real binary: the presets it selects, the rule overrides it applies, and above
 * all the ignore patterns, which oxlint cannot inherit from a preset and which
 * silently cause a project to lint its own `node_modules` when missing.
 */
import { execFileSync } from "node:child_process";
import {
  mkdirSync,
  mkdtempSync,
  rmSync,
  symlinkSync,
  writeFileSync,
} from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

import { afterEach, describe, expect, it } from "vitest";

import { parseDiagnostics } from "./parseDiagnostics";

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const repoRoot = join(packageRoot, "..", "..");

let projectDir: string | undefined;

/**
 * Create a project whose `oxlint.config.mts` is `config`, containing a source
 * file and a stray `node_modules` file, and return the reported rule ids.
 */
const lintWith = (config: string): string[] => {
  projectDir = mkdtempSync(join(tmpdir(), "bam-oxlint-helper-"));

  mkdirSync(join(projectDir, "node_modules", "@bam.tech"), { recursive: true });
  mkdirSync(join(projectDir, "node_modules", "stray"), { recursive: true });
  mkdirSync(join(projectDir, "src"), { recursive: true });

  symlinkSync(
    packageRoot,
    join(projectDir, "node_modules", "@bam.tech", "oxlint-plugin"),
  );
  symlinkSync(
    join(repoRoot, "node_modules", "oxlint"),
    join(projectDir, "node_modules", "oxlint"),
  );

  writeFileSync(
    join(projectDir, "package.json"),
    JSON.stringify({ name: "fixture", private: true, type: "module" }),
  );
  writeFileSync(join(projectDir, "oxlint.config.mts"), config);
  // Would be reported if the ignore patterns went missing.
  writeFileSync(
    join(projectDir, "node_modules", "stray", "bad.js"),
    "var x = 1;\nx == 2;\n",
  );
  writeFileSync(
    join(projectDir, "src", "app.tsx"),
    `export const A = () => <View>Raw</View>;
export const B = () => <Pressable onPress={f} />;
console.log("hi");
`,
  );
  writeFileSync(
    join(projectDir, "src", "app.test.tsx"),
    `it("works", () => { fireEvent.press(b); });\n`,
  );

  let output = "";

  try {
    output = execFileSync(
      process.execPath,
      [join(repoRoot, "node_modules", "oxlint", "dist", "cli.js"), "."],
      { cwd: projectDir, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
    );
  } catch (error) {
    const failure = error as { stdout?: string; stderr?: string };
    output = `${failure.stdout ?? ""}${failure.stderr ?? ""}`;
  }

  if (/Failed to (parse|load) oxlint configuration/.test(output)) {
    throw new Error(`oxlint rejected the config:\n${output}`);
  }

  return parseDiagnostics(output);
};

afterEach(() => {
  if (projectDir) rmSync(projectDir, { recursive: true, force: true });
  projectDir = undefined;
});

describe("defineBamConfig", () => {
  it("enables all four presets by default", () => {
    const reported = lintWith(
      `import { defineBamConfig } from "@bam.tech/oxlint-plugin/configs";
export default defineBamConfig();
`,
    );

    expect(reported).toEqual(
      expect.arrayContaining([
        "@bam.tech(no-raw-text)",
        "@bam.tech(has-valid-accessibility-descriptors)",
        "@bam.tech(prefer-user-event)",
        "eslint(no-console)",
      ]),
    );
  });

  it("never lints node_modules", () => {
    const reported = lintWith(
      `import { defineBamConfig } from "@bam.tech/oxlint-plugin/configs";
export default defineBamConfig();
`,
    );

    expect(reported).not.toContain("eslint(no-var)");
  });

  it("keeps ignoring node_modules when ignorePatterns is customised", () => {
    const reported = lintWith(
      `import { defineBamConfig, ignorePatterns } from "@bam.tech/oxlint-plugin/configs";
export default defineBamConfig({ ignorePatterns: [...ignorePatterns, "generated"] });
`,
    );

    expect(reported).not.toContain("eslint(no-var)");
  });

  it("enables only the requested presets", () => {
    const reported = lintWith(
      `import { defineBamConfig } from "@bam.tech/oxlint-plugin/configs";
export default defineBamConfig({ presets: ["recommended"] });
`,
    );

    expect(reported).toContain("@bam.tech(no-raw-text)");
    // a11y and tests were not requested
    expect(reported).not.toContain(
      "@bam.tech(has-valid-accessibility-descriptors)",
    );
    expect(reported).not.toContain("@bam.tech(prefer-user-event)");
  });

  it("lets project rules override the presets", () => {
    const reported = lintWith(
      `import { defineBamConfig } from "@bam.tech/oxlint-plugin/configs";
export default defineBamConfig({ rules: { "no-console": "off" } });
`,
    );

    expect(reported).not.toContain("eslint(no-console)");
    // the rest of the preset still applies
    expect(reported).toContain("@bam.tech(no-raw-text)");
  });
});
