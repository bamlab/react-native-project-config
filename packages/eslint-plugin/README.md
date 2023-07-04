# ESLint plugin for BAM

This project is an ESLint plugin that gathers all the rules, plugins and parsers that should be used in any new BAM project.

## Quick Setup

Install the plugin and its peer dependencies:

```bash
yarn add --dev @bam.tech/eslint-plugin
npx install-peerdeps --dev @bam.tech/eslint-plugin
```

Then update your `.eslintrc` config file:

```json
// .eslintrc
{
  "extends": "plugin:@bam.tech/recommended",
  "overrides": [
    {
      "files": ["*.test.tsx"],
      "extends": "plugin:@bam.tech/tests"
    }
  ]
}
```

## Shareable configurations

This plugin exports multiple configurations that can be used in your `.eslintrc` config file:

| Name                    | Description                                                                                                                          |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| `@bam.tech/recommended` | The recommended config for all projects                                                                                              |
| `@bam.tech/tests`       | The recommended config for test files. By default this applies to every file: put it in an `overrides` to filter on your test files. |

These configs need some peer dependencies. You can list them with:

```bash
npm info "@bam.tech/esling-plugin" peerDependencies
```

If you use **npm >= 5** you can automatically install them by running:

```bash
npx install-peerdeps @bam.tech/eslint-config -D
```

## Eslint rules

This plugin exports some custom rules that you can optionally use in your project:

<!-- begin auto-generated rules list -->

| Name                                                       | Description                                            |
| :--------------------------------------------------------- | :----------------------------------------------------- |
| [require-named-effect](docs/rules/require-named-effect.md) | Enforces the use of named functions inside a useEffect |

<!-- end auto-generated rules list -->

To use a rule, just declare it in your `.eslintrc`:

```json
// .eslintrc
{
  "plugins": ["@bam.tech"],
  "rules": {
    "@bam.tech/require-named-effect": "error"
  }
}
```

> _Tip: if your config is already extended from a `@bam.tech` config, you don't need to declare the plugin._

## How to customize?

You can still customize your ESLint config by adding other configurations, plugins and rules to your `.eslintrc` config file.

## [Contribute](./CONTRIBUTING.md)

If you find a useful rule that you feel every project at BAM should use, feel free to [contribute](./CONTRIBUTING.md).
