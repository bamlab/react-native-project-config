# Disallow importing `FlatList` from `react-native` due to potential performance concerns or the preference for alternative components (`@bam.tech/no-flatlist`)

💼 This rule is enabled in the `performance` config.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

Prevents from using "FlatList" import to avoid performance issues. FlashList should be used instead.

## Rule details

Examples of **incorrect** code for this rule:

```jsx
import { FlatList } from "react-native";
```

```jsx
import { FlatList, SectionList } from "react-native";
```

Examples of **correct** alternative for this rule:

```jsx
import { FlashList } from "@shopify/flash-list";
```
