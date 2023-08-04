# ESLint plugin for BAM

This project is an ESLint plugin that gathers all the rules, plugins and parsers that should be used in any new BAM project.

## Quick Setup

Install the plugin and its peer dependencies:

```bash
yarn add @bam.tech/eslint-plugin --dev
npx install-peerdeps @bam.tech/eslint-plugin --dev --yarn
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

| Name                    | Description                                                                                                                                                  |
| ----------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `@bam.tech/recommended` | The recommended config for all projects                                                                                                                      |
| `@bam.tech/tests`       | The recommended config for test files. By default this applies to every file: put it in an `overrides` to filter on your test files.                         |
| `@bam.tech/a11y`        | [beta] Eslint config to check for accessibility. Still in beta to not break existing projects, but will be merged into the recommended config in the future. |

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

🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).\
💡 Manually fixable by [editor suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).

| Name                                                                                                     | Description                                                     | 🔧  | 💡  |
| :------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------- | :-- | :-- |
| [accessibility-props-require-accessible](docs/rules/accessibility-props-require-accessible.md)           | Requires accessible prop when accessibility props are defined   | 🔧  |     |
| [do-not-use-role-on-image](docs/rules/do-not-use-role-on-image.md)                                       | Disallow role prop on Image component                           | 🔧  |     |
| [image-requires-accessible-prop](docs/rules/image-requires-accessible-prop.md)                           | Require accessible prop on image components                     | 🔧  | 💡  |
| [require-named-effect](docs/rules/require-named-effect.md)                                               | Enforces the use of named functions inside a useEffect          |     |     |
| [requires-accessibility-label](docs/rules/requires-accessibility-label.md)                               | Enforces label when component accessible                        |     | 💡  |
| [requires-accessibility-role-when-accessible](docs/rules/requires-accessibility-role-when-accessible.md) | Enforces accessibilityRole or role when component is accessible |     | 💡  |

<!-- end auto-generated rules list -->

To use a rule, just declare it in your `.eslintrc`:

```json
// .eslintrc
{
  "plugins": ["@bam.tech"],
  "rules": {
    "@bam.tech/require-named-effect": "error",
    "@bam.tech/image-requires-accessible-prop": "error",
    "@bam.tech/do-not-use-role-on-image": "error",
    "@bam.tech/accessibility-props-require-accessible": "error",
    "@bam.tech/requires-accessibility-role-when-accessible": "error",
    "@bam.tech/requires-accessibility-label": "error"
  }
}
```

> _Tip: if your config is already extended from a `@bam.tech` config, you don't need to declare the plugin._

## How to customize?

You can still customize your ESLint config by adding other configurations, plugins and rules to your `.eslintrc` config file.

## [Contribute](./CONTRIBUTING.md)

If you find a useful rule that you feel every project at BAM should use, feel free to [contribute](./CONTRIBUTING.md).
