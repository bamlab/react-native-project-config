# Disallow importing from `@react-navigation/stack` and suggest using `@react-navigation/native-stack` instead (`@bam.tech/no-react-navigation-stack`)

💼 This rule is enabled in the `performance` config.

<!-- end auto-generated rule header -->

Prevents from using "react-navigation/stack" import to avoid performance issues. "react-navigation/native-stack" should be used instead.

## Rule details

Examples of **incorrect** code for this rule:

```jsx
import { createStackNavigator } from "@react-navigation/stack";
```

Examples of **correct** alternative for this rule:

```jsx
import { createStackNavigator } from "@react-navigation/native-stack";
```
