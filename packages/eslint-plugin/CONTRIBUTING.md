# Contribute

If you find a useful rule that you feel every project at BAM should use, feel free to open a PR.

## Creating new rules

Creating new rules is quite simple:

1. Create a new rule from the template:

   ```bash
   cd eslint-plugin
   yo eslint:rule
   ```

1. Optionally, add it to some shareable configs (for example `recommended`):

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

## Creating new shareable configuration

Creating a shareable config is simple, you just have to create a new config file in the `lib/configs` directory and modify it.

## Modifying a shareable configuration

### Extending from other shareable configs

Extending new shareable configurations is quite simple, you just have to modify the config file and add your shareable configuration to the `extends` array (the order of configurations is important):

```js
module.exports = {
  ...
  extends: [
    ...
    "@some-scope/eslint-config",
  ],
}
```

The package containing your shareable configuration should be added as a dependency by running `yarn add your-package`.

### Adding a plugin to your shareable config

Adding a plugin is quite simple, you just have to modify your config file and add your plugin to the `plugins` array:

```js
module.exports = {
  ...
  plugins: [
    ...
    "some-plugin",
  ],
}
```

The package containing your plugin should be added as a [peer dependency](https://classic.yarnpkg.com/en/docs/dependency-types/) by running `yarn add --peer eslint-plugin-some-plugin`.
