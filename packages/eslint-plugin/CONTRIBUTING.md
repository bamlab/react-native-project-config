# Contribute

This plugin is a way to share the best programming experience via rules and configurations to be used in different projects.
It is important to keep it up to date and to add new rules and configurations when needed.

## Adding a rule from another plugin

If you feel that a rule could be useful to all react-native new projects, you can add it to the plugin by following these steps:

### Open an issue to discuss the rule with the community

- Go to this link : [RFC for a new rule on eslint-plugin ⭐](https://github.com/bamlab/react-native-project-config/issues/new?assignees=&labels=%F0%9F%93%8F+eslint-plugin%2C%E2%AD%90+enhancement&projects=&template=RFC-NEW-RULE.yml&title=%5BRFC%5D%3A+plugin%3Arule-name)
- Fill the template with any relevant information about the rule (why it is needed, how it works, shareable configs to add it to, etc.)
- Submit the issue and share it with the community

### After the discussion, if the rule is approved, you can create a PR to add the rule to the plugin

- Create a new branch from `main` with the name `feat/plugin-rule-name`
- Go to the corresponding shareable config file (for example `recommended.js`) and add the rule to the `rules` object:

  ```js
  // recommended.js
  module.exports = {
    ...
    rules: {
      ...
      "plugin-name/rule-name": ["error", { ... }],
    },
  }
  ```

  > If you feel a new shareable config should be created for the rule, please refer to the [Creating new shareable configuration](#creating-new-shareable-configuration) section.

- (Optional) If the plugin the rule is part of is not yet added as a dependency:

  - add the plugin in the `plugins` array of the shareable config file:

    ```js
    // recommended.js
    module.exports = {
      ...
      plugins: [
        ...
        "plugin-name",
      ],
    }
    ```

  - add the plugin to the `peerDependencies` of the `package.json` file:

    ```json
    // package.json
    {
      ...
      "peerDependencies": {
        ...
        "plugin-name": "^version",
      },
    }
    ```

- In the description of the PR, add `Closes #<issue number>` to link the PR to the issue and close it automatically when the PR is merged

#### (OPTIONAL) Feel free to add a breaking example of the rule in the `example-app/eslint-breaking-examples` directory

Here's an example:

```tsx
// break-react-eslint-rules.tsx

// Save without formatting: [⌘ + K] > [S]

// This should trigger one error breaking eslint-plugin-react:
// react/jsx-no-undef

export const MyComponent = () => <ThisIsAViewThatDoesntExist />;
```

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
