# ESLint plugin for BAM

This project is an ESLint plugin that gathers all the rules, plugins and parsers that should be used in any new BAM project.

## How to use the recommended config?

In your app, run

```bash
yarn add --dev @bam.tech/eslint-config @typescript-eslint/eslint-plugin eslint eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-native prettier
```

In your `.eslintrc` config file, extend the exported recommended configuration:

```json
// .eslintrc
{
  "extends": "plugin:@bam.tech/eslint-plugin/recommended"
}
```

## How to use the config for tests ?

```bash
yarn add --dev eslint-plugin-jest eslint-plugin-jest-formatting eslint-plugin-testing-library
```

In your `.eslintrc` config file, extend the exported recommended configuration (don't forget to add the overrides to check only the test files)

```json
  "overrides": [
    {
      "files": ["*.test.tsx"],
      "extends": "plugin:@bam.tech/tests"
    }
  ]
```

## Rules implemented in this plugin

<!-- begin auto-generated rules list -->

| Name                                                       | Description                                            |
| :--------------------------------------------------------- | :----------------------------------------------------- |
| [require-named-effect](docs/rules/require-named-effect.md) | Enforces the use of named functions inside a useEffect |

<!-- end auto-generated rules list -->

## How to customize?

You can still customize your ESLint config by adding configurations, plugins and rules to your `.eslintrc` config file.

If you find a useful rule that you feel every project at BAM should use, feel free to contribute, [here is a link](./CONTRIBUTING.md) where you'll find explanations on how to do so.
