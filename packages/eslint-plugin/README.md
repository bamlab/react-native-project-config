# ESLint plugin by BAM

This project is an ESLint plugin that gathers all the rules, plugins and parsers that should be used in any new react-native BAM project.

The list of rules and configuration details can be found [`here`](https://github.com/bamlab/react-native-project-config/blob/main/packages/eslint-plugin/lib/configs/recommended.js).

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

### Handling files ignored by TypeScript

The plugin default behavior is to use TypeScript configuration to lint all TypeScript files. However, in your project, there may be files you've chosen to ignore with TypeScript. It's advisable to also disable ESLint checking for these files. To achieve this, add the files you want to ignore with ESLint in the overrides section of your `eslintrc.js`. Below is an example illustrating this. The configuration for mock files is overridden: the TypeScript parser is removed, and the behavior of the `@typescript-eslint/return-await` rule is modified.

```javascript
overrides: [
  {
    files: ["mocks/**/*"],
    parserOptions: {
      project: null,
    },
    rules: {
      "@typescript-eslint/return-await": "off",
    },
  },
];
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

💼 Configurations enabled in.\
🧪 Set in the `tests` configuration.\
🔧 Automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/user-guide/command-line-interface#--fix).

| Name                                                                                                                                                      | Description                                                | 💼  | 🔧  |
| :-------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------------------------- | :-- | :-- |
| [await-user-event](https://github.com/bamlab/react-native-project-config/blob/main/packages/eslint-plugin/docs/rules/await-user-event.md)                 | Enforces awaiting userEvent calls                          | 🧪  | 🔧  |
| [no-different-displayname](https://github.com/bamlab/react-native-project-config/blob/main/packages/eslint-plugin/docs/rules/no-different-displayname.md) | Enforce component displayName to match with component name |     | 🔧  |
| [prefer-user-event](https://github.com/bamlab/react-native-project-config/blob/main/packages/eslint-plugin/docs/rules/prefer-user-event.md)               | Enforces usage of userEvent over fireEvent in tests.       |     | 🔧  |
| [require-named-effect](https://github.com/bamlab/react-native-project-config/blob/main/packages/eslint-plugin/docs/rules/require-named-effect.md)         | Enforces the use of named functions inside a useEffect     |     |     |

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
