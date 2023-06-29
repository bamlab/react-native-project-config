# ESLint config for BAM

This project is an ESLint config that gathers all the rules, plugins and parsers that should be used in any new BAM project.

## How to use?

In your app, run

```bash
yarn add --dev @bam.tech/eslint-config @typescript-eslint/eslint-plugin eslint eslint-plugin-prettier eslint-plugin-react eslint-plugin-react-hooks eslint-plugin-react-native prettier
```

In your `.eslintrc` config file, extend the exported configuration:

```json
// .eslintrc
{
  "extends": "@bam.tech/eslint-config"
}
```

## How to customize?

You can still customize your ESLint config by adding configurations, plugins and rules to your `.eslintrc` config file.

## How to improve?

If you find a useful rule that you feel every project at BAM should use, feel free to open a PR.

Use the documentation on how to create a shareable configuration [here](https://eslint.org/docs/latest/developer-guide/shareable-configs).

Here is a small summary:

### Adding new rules

Adding new rules is quite simple, you just have to modify `index.js` and add your rule to the `rules` object:

```js
module.exports = {
  ...
  rules: {
    ...
    "my-new-rule": "error",
  },
  ...
}
```

### Extending new shareable configurations

Extending new shareable configurations is quite simple, you just have to modify `index.js` and add your shareable configuration to the `extends` array (the order of configurations is important):

```js
module.exports = {
  ...
  extends: [
    ...
    "@some-scope/eslint-config",
  ],
  ...
}
```

The package containing your shareable configuration should be added as a dependency by running `yarn add your-package`.

### Adding a plugin

Adding a plugin is quite simple, you just have to modify `index.js` and add your plugin to the `plugins` array:

```js
module.exports = {
  ...
  plugins: [
    ...
    "your-plugin",
  ],
  ...
}
```

The package containing your plugin should be added as a [peer dependency](https://classic.yarnpkg.com/en/docs/dependency-types/) by running `yarn add --peer your-plugin`.
