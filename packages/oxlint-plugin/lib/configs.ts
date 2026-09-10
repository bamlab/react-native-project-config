/**
 * The presets, and the helper that assembles them.
 *
 * Use `defineBamConfig` from an `oxlint.config.mts`:
 *
 * ```ts
 * import { defineBamConfig } from "@bam.tech/oxlint-plugin/configs";
 *
 * export default defineBamConfig();
 * ```
 *
 * Prefer these imports over `extends`-by-path in a monorepo: `extends` in
 * `.oxlintrc.json` takes a filesystem path relative to the config file, so a
 * hoisted `node_modules` (yarn workspaces, pnpm) puts the preset somewhere
 * `./node_modules/...` does not reach. These imports use Node resolution and
 * work wherever the package actually lives.
 */
import type { OxlintConfig } from "oxlint";

import a11yJson from "../configs/a11y.oxlintrc.json" with { type: "json" };
import importJson from "../configs/import.oxlintrc.json" with { type: "json" };
import recommendedJson from "../configs/recommended.oxlintrc.json" with { type: "json" };
import testsJson from "../configs/tests.oxlintrc.json" with { type: "json" };

/**
 * A JSON import widens every severity to `string`, which is not assignable to
 * oxlint's `AllowWarnDeny` union, so each preset is asserted to the config type
 * it is already known to satisfy. The presets are generated and validated
 * against the real binary by the integration suite.
 */
const recommended = recommendedJson as unknown as OxlintConfig;
const importConfig = importJson as unknown as OxlintConfig;
const a11y = a11yJson as unknown as OxlintConfig;
const tests = testsJson as unknown as OxlintConfig;

const presets = {
  recommended,
  import: importConfig,
  a11y,
  tests,
};

export type PresetName = keyof typeof presets;

/**
 * Paths that should not be linted.
 *
 * This cannot be shipped inside a preset. Oxlint matches `ignorePatterns`
 * gitignore-style, "rooted at the directory containing the configuration
 * file", and files outside that directory cannot be matched — so patterns in
 * the preset would be rooted at this package, never at the consumer's project.
 * They have to end up in the consumer's own config, which is what
 * `defineBamConfig` does. Oxlint also lints `node_modules` by default, so
 * without them a project lints its own dependencies.
 */
export const ignorePatterns: string[] = [
  ".cache", // tsc / oxlint / metro cache
  ".expo-shared",
  ".expo",
  ".yarn",
  "android", // react-native
  "ios", // react-native
  "coverage", // jest
  "dist", // expo updates
  "node_modules",
  "expo-env.d.ts",
];

export interface BamConfigOptions {
  /** Which presets to enable. Defaults to all four. */
  presets?: PresetName[];
  /** Replaces the default ignore patterns rather than adding to them. */
  ignorePatterns?: string[];
  /** Project rules, applied after the presets so they win. */
  rules?: OxlintConfig["rules"];
  /** Project overrides, applied after the presets'. */
  overrides?: OxlintConfig["overrides"];
}

/**
 * Build a complete oxlint config from the BAM presets.
 *
 * Returns a plain config object, so anything else oxlint accepts can be spread
 * in alongside it.
 */
export const defineBamConfig = ({
  presets: enabled = ["recommended", "import", "a11y", "tests"],
  ignorePatterns: ignored = ignorePatterns,
  rules = {},
  overrides = [],
}: BamConfigOptions = {}): OxlintConfig =>
  ({
    extends: enabled.map((name) => presets[name]),
    ignorePatterns: ignored,
    rules,
    overrides,
  }) as OxlintConfig;

export { a11y, recommended, tests };
export { importConfig as import };

export default {
  recommended,
  tests,
  import: importConfig,
  a11y,
  ignorePatterns,
  defineBamConfig,
};
