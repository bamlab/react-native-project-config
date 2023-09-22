# ESLint plugin by BAM

This project is an ESLint plugin that gathers all the rules, plugins and parsers that should be used in any new react-native BAM project.

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
      "files": ["*.test.tsx", "*.test.ts"],
      "extends": "plugin:@bam.tech/tests"
    }
  ]
}
```

### Setting up the plugin on a monorepo

Update your `.vscode/settings.json` by adding the directories of apps using the plugin:

```json
// .vscode/settings.json
{
  ...
  "eslint.workingDirectories": [
    "apps/yourFirstApp",
    "apps/yourSecondApp"
    ]
}
```

### ⚠️ React version

With the introduction of React 18, it's no longer necessary to import React in your JSX files. The ESLint plugin is configured for React version 18 and above, so you won't encounter any errors. However, TypeScript will generate an error if it isn't configured correctly. To resolve this, simply add `"jsx": "react-native"` to your `tsconfig.json` file.

If your project is using a version of React that's below 18, iyou should upgrade to a newer version of React. If upgrading isn't an option, here's the situation: importing React in your JSX files remains mandatory, but ESLint won't flag any errors, even though it should. This is due to the plugin configuration; the recommended configuration extends the plugin react/jsx-runtime, which disables the following rules:

- `'react/jsx-uses-react': "error"`
- `'react/react-in-jsx-scope': "error"`

These rules are crucial as they trigger an error when React is not in scope. Therefore, you'll need to include them in the rules section of your .eslintrc.js file to ensure an error is flagged whenever someone omits the import for React.

Remember, the recommended solution is to upgrade to a newer version of React. This advice should only be disregarded in exceptional circumstances where upgrading React is not feasible.

## Shareable configurations

This plugin exports multiple configurations that can be used in your `.eslintrc` config file:

| Name                                                                                                                                         | Description                                                                                                                                                  |
| -------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| [`@bam.tech/recommended`](https://github.com/bamlab/react-native-project-config/blob/main/packages/eslint-plugin/lib/configs/recommended.js) | The recommended config for all projects                                                                                                                      |
| [`@bam.tech/tests`](https://github.com/bamlab/react-native-project-config/blob/main/packages/eslint-plugin/lib/configs/tests.js)             | The recommended config for test files. By default this applies to every file: put it in an `overrides` to filter on your test files.                         |
| [`@bam.tech/a11y`](https://github.com/bamlab/react-native-project-config/blob/main/packages/eslint-plugin/lib/configs/a11y.js)               | [beta] Eslint config to check for accessibility. Still in beta to not break existing projects, but will be merged into the recommended config in the future. |

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

| Name                                                                                                                                                                                            | Description                                                     | 💼  | 🔧  | 💡  |
| :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------- | :-- | :-- | :-- |
| [accessibility-props-require-accessible](https://github.com/bamlab/react-native-project-config/blob/main/packages/eslint-plugin/docs/rules/accessibility-props-require-accessible.md)           | Requires accessible prop when accessibility props are defined   | ♿  | 🔧  |     |
| [do-not-use-role-on-image](https://github.com/bamlab/react-native-project-config/blob/main/packages/eslint-plugin/docs/rules/do-not-use-role-on-image.md)                                       | Disallow role prop on Image component                           | ♿  | 🔧  |     |
| [image-requires-accessible-prop](https://github.com/bamlab/react-native-project-config/blob/main/packages/eslint-plugin/docs/rules/image-requires-accessible-prop.md)                           | Require accessible prop on image components                     | ♿  | 🔧  | 💡  |
| [require-named-effect](https://github.com/bamlab/react-native-project-config/blob/main/packages/eslint-plugin/docs/rules/require-named-effect.md)                                               | Enforces the use of named functions inside a useEffect          |     |     |     |
| [requires-accessibility-label](https://github.com/bamlab/react-native-project-config/blob/main/packages/eslint-plugin/docs/rules/requires-accessibility-label.md)                               | Enforces label when component accessible                        | ♿  |     | 💡  |
| [requires-accessibility-role-when-accessible](https://github.com/bamlab/react-native-project-config/blob/main/packages/eslint-plugin/docs/rules/requires-accessibility-role-when-accessible.md) | Enforces accessibilityRole or role when component is accessible | ♿  |     | 💡  |

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

## [Contribute](https://github.com/bamlab/react-native-project-config/blob/main/packages/eslint-plugin/CONTRIBUTING.md)

If you find a useful rule that you feel every project at BAM should use, feel free to [contribute](https://github.com/bamlab/react-native-project-config/blob/main/packages/eslint-plugin/CONTRIBUTING.md).
