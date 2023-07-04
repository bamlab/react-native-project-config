# ESLint plugin for BAM

This project is an ESLint plugin that gathers all the rules, plugins and parsers that should be used in any new BAM project. Here is the documentation on how to contribute to this plugin

## How to improve?

If you find a useful rule that you feel every project at BAM should use, feel free to open a PR.

Use the documentation on how to create a shareable configuration [here](https://eslint.org/docs/latest/developer-guide/shareable-configs).

Here is a small summary:

### Adding new rules

Adding new rules is quite simple:

1. Create a new rule from the template:

   ```bash
   cd eslint-plugin
   yo eslint:rule
   ```

1. Add it to the default shared config:

   ```js
   // recommended.js
   module.exports = {
     ...
     rules: {
       ...
       "@bam.tech/my-new-rule": "error",
     },
   }
   ```

1. Update the README and run the tests:
   ```bash
   yarn update:eslint-docs
   yarn lint
   yarn test
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
