# oxlint plugin by BAM

Shared [oxlint](https://oxc.rs) rules and configs for new React Native BAM projects. The oxlint
counterpart of [`@bam.tech/eslint-plugin`](https://github.com/bamlab/react-native-project-config/blob/main/packages/eslint-plugin/README.md),
built so that **no ESLint plugin is loaded at lint time**: every rule is either an oxlint native
(Rust) rule or a rule implemented in this package.

## Why

Measured on a 1 240-file React Native tree (median of 5, M-series):

| Configuration                                               | Time   |
| ----------------------------------------------------------- | ------ |
| oxlint, native rules only                                   | 71 ms  |
| These presets (`recommended` + `import` + `a11y` + `tests`) | 166 ms |
| These presets with `--type-aware`                           | 281 ms |

For comparison, the ESLint stack this replaces takes seconds, not milliseconds, on the same tree.

The gap between the first two rows is the price of this package's 9 rules: oxlint's native rules are
Rust compiled into the binary, while a rule shipped by a third party runs as JavaScript, and oxlint
has no other mechanism for custom rules. That is why the presets lean on native rules wherever one
exists, and why adding a rule here should be a last resort (see
[CONTRIBUTING](https://github.com/bamlab/react-native-project-config/blob/main/packages/oxlint-plugin/CONTRIBUTING.md)).

## Quick setup

```bash
yarn add -D @bam.tech/oxlint-plugin oxlint
# only if you want the type-aware rules
yarn add -D oxlint-tsgolint
```

Create an `oxlint.config.mts` in your project root:

```ts
import { defineBamConfig } from "@bam.tech/oxlint-plugin/configs";

export default defineBamConfig();
```

Then lint with `oxlint .`, or `oxlint --type-aware .` to include the type-aware rules.

That is the whole setup. `defineBamConfig` enables all four presets and, importantly, supplies the
ignore patterns (see below). To narrow it down or add project rules:

```ts
export default defineBamConfig({
  presets: ["recommended", "tests"],
  rules: { "no-console": "off" },
});
```

### Why the ignore patterns cannot live in a preset

Oxlint matches `ignorePatterns` gitignore-style, *"rooted at the directory containing the
configuration file"*, and files outside that directory cannot be matched. Patterns written inside a
published preset would therefore be rooted at the preset's own directory, never at your project, so
they can only take effect from your own config. Since oxlint also lints `node_modules` by default,
a config that forgets them lints your dependencies.

`defineBamConfig` handles this for you. If you write the config by hand, pass them yourself:

```ts
import { defineConfig } from "oxlint";
import { ignorePatterns, recommended } from "@bam.tech/oxlint-plugin/configs";

export default defineConfig({ extends: [recommended], ignorePatterns });
```

### Why a config file rather than `.oxlintrc.json`

`extends` inside an `.oxlintrc.json` takes a **filesystem path** relative to the config file, not a
package name. In a monorepo with a hoisted `node_modules` (yarn workspaces, pnpm) the preset is not
at `./node_modules/...` from the app directory, so the path breaks. Importing from
`@bam.tech/oxlint-plugin/configs` uses Node resolution and works wherever the package really is.

If you are not in a monorepo and prefer plain JSON, this also works:

```json
{
  "extends": [
    "./node_modules/@bam.tech/oxlint-plugin/configs/recommended.oxlintrc.json",
    "./node_modules/@bam.tech/oxlint-plugin/configs/import.oxlintrc.json",
    "./node_modules/@bam.tech/oxlint-plugin/configs/a11y.oxlintrc.json",
    "./node_modules/@bam.tech/oxlint-plugin/configs/tests.oxlintrc.json"
  ],
  "ignorePatterns": [
    ".cache",
    ".expo-shared",
    ".expo",
    ".yarn",
    "android",
    "ios",
    "coverage",
    "dist",
    "node_modules",
    "expo-env.d.ts"
  ]
}
```

## Shareable configs

| Name          | Description                                                                                                                                                                                   |
| ------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `recommended` | The base config for all projects: the ESLint/TypeScript/React/React-hooks natives, plus this package's React Native rules. Includes the type-aware rules, which only run with `--type-aware`. |
| `tests`       | Test-file rules (native `jest`, plus the two userEvent rules), scoped to `**/*.test.ts?(x)`.                                                                                                  |
| `import`      | Import hygiene: native `import` rules, `no-unused-vars`, `consistent-type-imports`.                                                                                                           |
| `a11y`        | React Native accessibility. Enabled by default here, unlike the ESLint plugin where it was opt-in beta.                                                                                       |

## Formatting

Formatting is **not** a lint rule here. `eslint-plugin-prettier` is replaced by
[oxfmt](https://oxc.rs), which does the same job natively. Generate the config from your existing
Prettier setup:

```bash
npx oxfmt --migrate=prettier
```

The important setting is `printWidth`: **oxfmt defaults to 100 where Prettier defaults to 80**, and
that single difference accounts for essentially all apparent disagreement between the two. The
migration prints a note when it fills the value in for you.

```jsonc
// .oxfmtrc.json
{
  "printWidth": 80,
  "sortPackageJson": false,
  "ignorePatterns": ["dist", "node_modules", "**/*.md"]
}
```

Markdown is excluded above because this repo already lints it with markdownlint, and oxfmt rewrites
fenced code blocks (adding trailing commas to JSON samples, among other things). Drop that pattern
if you want oxfmt to own your Markdown too.

Run `oxfmt --check .` in CI and `oxfmt .` locally. oxfmt skips `node_modules` by default and honours
`.gitignore` and `.prettierignore`, so it needs less configuration than oxlint does.

**Conformance, measured:** on this repository's 51 TypeScript/JavaScript files, formatting with
oxfmt at `printWidth: 80` produces **byte-identical output to Prettier on all 51**, and both flag
exactly the same 8 already-unformatted files. This package formats itself with oxfmt in CI.

`eslint-plugin-simple-import-sort` has no equivalent: oxfmt's `sortImports` uses its own predefined
group order rather than simple-import-sort's regex groups, so enabling it reorders imports once, and
there is no export-sorting feature at all.

## Rules

All 9 rules ship under the `@bam.tech` plugin name.

| Rule                                            | Description                                                      | Config        | Fixable |
| ----------------------------------------------- | ---------------------------------------------------------------- | ------------- | ------- |
| `@bam.tech/no-different-displayname`            | Enforce component `displayName` to match the component name      | `recommended` | yes     |
| `@bam.tech/require-named-effect`                | Enforce named functions inside a `useEffect`                     | `recommended` |         |
| `@bam.tech/no-inline-style-in-array`            | Disallow inline style objects inside a style array               | `recommended` |         |
| `@bam.tech/no-raw-text`                         | Disallow text outside of a `<Text>` component                    | `recommended` |         |
| `@bam.tech/await-user-event`                    | Enforce awaiting `userEvent` calls                               | `tests`       | yes     |
| `@bam.tech/prefer-user-event`                   | Enforce `userEvent` over `fireEvent`                             | `tests`       | yes     |
| `@bam.tech/has-accessibility-hint`              | Require an `accessibilityHint` alongside an `accessibilityLabel` | `a11y`        |         |
| `@bam.tech/has-valid-accessibility-descriptors` | Require accessibility descriptors on touchables and text inputs  | `a11y`        | yes     |
| `@bam.tech/has-valid-accessibility-state`       | Enforce a valid `accessibilityState` shape                       | `a11y`        |         |

Four of these are reimplementations of rules from `eslint-plugin-react-native` and
`eslint-plugin-react-native-a11y` (both MIT): `no-raw-text` and the three `a11y` rules. They are
verified against the upstream ESLint rules on a shared set of fixtures, so they report the same
things. Oxlint has no native `react-native` or `react-native-a11y` plugin, and oxc has declared new
plugins out of scope ([oxc#26151](https://github.com/oxc-project/oxc/issues/26151)), so the only way
to keep these checks without loading an ESLint plugin is to own them.

## Differences from `@bam.tech/eslint-plugin`

Everything below is a deliberate, measured deviation. On the repo's `example-app` fixture, ESLint
reports 64 findings and this config reports the same findings except as listed here.

### Moved to the formatter

| ESLint rule                  | Replacement           |
| ---------------------------- | --------------------- |
| `prettier/prettier`          | `oxfmt`               |
| `simple-import-sort/imports` | `oxfmt` `sortImports` |

### Replaced by a native rule

| ESLint rule                            | oxlint rule                                                                   | Note                                                                                                                                                                                                              |
| -------------------------------------- | ----------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `@bam.tech/no-inline-style`            | `react-perf/jsx-no-new-object-as-prop` + `@bam.tech/no-inline-style-in-array` | The native rule does not look inside arrays; the companion rule covers that. Enabling `react-perf/jsx-no-new-array-as-prop` instead is not possible, as it rejects the legitimate `style={[styles.a, styles.b]}`. |
| `unused-imports/no-unused-imports`     | `no-unused-vars`                                                              | Reported, but **not auto-removed**: the native rule has no import-removing fix.                                                                                                                                   |
| `unused-imports/no-unused-vars`        | `no-unused-vars`                                                              |                                                                                                                                                                                                                   |
| `react-hooks/component-hook-factories` | `react/static-components`                                                     | Renamed upstream in eslint-plugin-react-hooks 7.1.                                                                                                                                                                |

### Dropped

| ESLint rule(s)               | Why                                                                                                                                                                                                                                                                                                                                                |
| ---------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 15 × `testing-library/*`     | No native equivalent, and a native port is [explicitly not planned](https://github.com/oxc-project/oxc/issues/26151). The native `jest` rules do not overlap them: they cover Jest's assertion and hook mechanics, not the Testing Library query API. Reimplementing them was judged disproportionate, as 6 of the 15 need variable-flow tracking. |
| `simple-import-sort/exports` | No native, oxfmt or third-party equivalent exists. Cosmetic.                                                                                                                                                                                                                                                                                       |
| `jest/padding-around-all`    | Not implemented in oxlint. The native `jest/padding-around-test-blocks` and `jest/padding-around-after-all-blocks` cover part of it.                                                                                                                                                                                                               |
| `react/no-unused-prop-types` | Dropped upstream: PropTypes are ignored in React 19, and `no-unused-vars` plus TypeScript already catch unused props.                                                                                                                                                                                                                              |
| `import/no-unresolved`       | Not implemented: oxlint considers it inherently false-positive-prone.                                                                                                                                                                                                                                                                              |
| `no-undef`                   | Only available as a nursery rule. TypeScript already catches undefined identifiers, and typescript-eslint recommends disabling it on TS code.                                                                                                                                                                                                      |

### Known rule-semantics divergences

- **`array-callback-return`** is enabled and native, but oxlint's implementation does not flag
  `Array.prototype.reduce()` with no return value, which ESLint's does. Verified on
  `example-app/eslint-breaking-examples/break-array-callback-return-rule.ts`.

### Type-aware rules need a modern `moduleResolution`

`no-floating-promises`, `no-unnecessary-condition` and `return-await` are in `recommended`, but they
only do anything when you pass `--type-aware`, which needs the optional `oxlint-tsgolint`
dependency. `tsgolint` rejects the legacy `"moduleResolution": "node"` (node10) outright:

```text
Option 'moduleResolution=node10' has been removed. Please remove it from your configuration.
```

Expo sets `"moduleResolution": "bundler"` itself from **SDK 53** onwards, so a current project needs
nothing. On older Expo, override it in your own `tsconfig.json`:

```jsonc
{
  "extends": "@bam.tech/typescript-config",
  "compilerOptions": { "moduleResolution": "bundler" }
}
```

This is worth doing regardless of linting: under node10 resolution TypeScript cannot read the
`exports` map that most current packages ship their types behind, and reports
`Cannot find module ... There are types at ..., but this result could not be resolved under your
current 'moduleResolution' setting`. Metro honours those `exports` maps from React Native 0.79
(Expo 53), so node10 also disagrees with what the bundler actually does at runtime.

Without `--type-aware` these three rules are inert and the rest of the config works normally.

## Migrating an existing project

The cutover is **atomic**, not incremental: oxlint matches suppression comments on the
plugin-qualified rule name, so every `// eslint-disable-next-line @bam.tech/foo` has to be rewritten,
and once it is, ESLint no longer recognises the rule. Plan a single change, not a gradual one.

`npx @oxlint/migrate eslint.config.js` gets a project most of the way, but read
[Differences](https://github.com/bamlab/react-native-project-config/blob/main/packages/oxlint-plugin/README.md#differences-from-bamtecheslint-plugin)
first: it will happily carry `prettier/prettier` across and keep running Prettier inside the linter.

## [Contribute](https://github.com/bamlab/react-native-project-config/blob/main/packages/oxlint-plugin/CONTRIBUTING.md)
