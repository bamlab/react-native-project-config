# Testing

## Introduction

This document provides information about how to test the eslint-plugin after adding or removing rules.

## Example-app

The example-app folder is located at the root of `react-native-project-config`.
The goal of each file of example-app is to simulate the behavior of a rule or a set of rules, that you can visually check it or by running the `yarn lint` command.
When you add or remove a rule from the recommended config, please modify the corresponding file in the example-app folder.

## Real example testing

In order to test that your rule will be properly deployed, use another project, in which you install the eslint-plugin from your local files.
Use the command `yarn remove @bam.tech/eslint-plugin; yarn add --dev file:/project_address/react-native-project-config/packages/eslint-plugin; yarn; yarn lint` to remove the plugin from installed dependencies, and add it again.
If not done already, add the plugin to your `.eslintrc` configuration :

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

You should be able to test your rules from the plugin.
