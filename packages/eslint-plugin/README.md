# ESLint plugin for BAM

This project is an ESLint plugin that gathers all the rules, plugins and parsers that should be used in any new BAM project.

## Shared config

The plugin exports multiple configs that can be used in your `.eslintrc` config file:

| Name                                  | Description                               |
| ------------------------------------- | ----------------------------------------- |
| `@bam.tech/eslint-plugin/recommended` | The recommended config for all projects   |
| `@bam.tech/eslint-plugin/tests`       | The recommended config for all test files |

You should install the correct version for each package. You can see the list using:

```bash
npm info "@bam.tech/esling-plugin" peerDependencies
```

With **npm 5+** you can automatically install all the peer dependencies by running:

```bash
npx install-peerdeps @bam.tech/eslint-config -D
```

## How to use?

In your `.eslintrc` config file, extend the exported configurations:

```json
// .eslintrc
{
  "extends": "plugin:@bam.tech/eslint-plugin/recommended",
  "overrides": [
    {
      "files": ["*.test.tsx"],
      "extends": "plugin:@bam.tech/tests"
    }
  ]
}
```

Don't forget to add the overrides to check only the test files.

## Rules implemented in this plugin

<!-- begin auto-generated rules list -->

| Name                                                       | Description                                            |
| :--------------------------------------------------------- | :----------------------------------------------------- |
| [require-named-effect](docs/rules/require-named-effect.md) | Enforces the use of named functions inside a useEffect |

<!-- end auto-generated rules list -->

## How to customize?

You can still customize your ESLint config by adding configurations, plugins and rules to your `.eslintrc` config file.

If you find a useful rule that you feel every project at BAM should use, feel free to contribute, [here is a link](./CONTRIBUTING.md) where you'll find explanations on how to do so.
