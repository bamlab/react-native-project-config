# Disallow importing `useIsFocused` from `@react-navigation/native` to encourage using `useFocusEffect` instead (`@bam.tech/no-use-is-focused`)

💼 This rule is enabled in the `performance` config.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

Prevents from using "useIsFocused" to avoid performance issues. "useFocusEffect" should be used instead.

## Rule details

Examples of **incorrect** code for this rule:

```jsx
import { useIsFocused } from "@react-navigation/native";
```
