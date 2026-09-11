# Contributing to @bam.tech/oxlint-plugin

## Setup

**Node 22 or newer is required to develop this package**, and `.nvmrc` pins it. `RuleTester` from
`oxlint/plugins-dev` refuses to run on anything older:

```text
`RuleTester` is not supported on 32-bit or big-endian systems, versions of NodeJS prior to v22.0.0,
versions of Deno prior to v2.0.0, or other runtimes
```

Consuming the package is a separate question: `engines` stays at Node 18 because the presets
and rules run on anything, but the documented `oxlint.config.mts` setup needs Node 22 as well,
since oxlint hands the file to Node and relies on its type-stripping. The README gives the
`.oxlintrc.json` fallback for older runtimes.

```bash
yarn install
yarn workspace @bam.tech/oxlint-plugin build
```

## Adding a rule

Rules live in `lib/rules`, are written against the
[oxlint JS plugin API](https://oxc.rs/docs/guide/usage/linter/writing-js-plugins.html) and typed with
`@oxlint/plugins`. That API is ESLint-compatible: visitors, esquery selectors, `node.parent`,
`messageId`, `context.report` and fixers all behave as they do in ESLint.

**Prefer a native rule.** A rule in this package runs as JavaScript; an oxlint native rule is
essentially free by comparison. Before writing one, check whether oxlint already has it:

```bash
yarn oxlint --print-config   # what is actually enabled
```

Add a rule by:

1. Creating `lib/rules/<name>.ts`.
2. Registering it in `lib/rules/index.ts`.
3. Adding it to the relevant preset in `configs/*.oxlintrc.json`.
4. Writing `tests/rules/<name>.test.ts`.
5. Documenting it in the README rule table.

## Tests

```bash
yarn workspace @bam.tech/oxlint-plugin test
```

Tests use `RuleTester` from `oxlint/plugins-dev`, which is ESM-only, so this package uses vitest
rather than the jest setup in `packages/eslint-plugin`.

When a rule reimplements an ESLint rule, port the upstream fixtures rather than inventing your own,
and check the reimplementation against the upstream rule on the same cases before trusting it.

## Verifying against a real project

`example-app` is linted by both linters and is the regression fixture:

```bash
yarn workspace example-app lint          # eslint
yarn workspace example-app lint:oxlint   # oxlint
```

Add a breaking example there for any rule you add, and keep the deviation table in the README true.
