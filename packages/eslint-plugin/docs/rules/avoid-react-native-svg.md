# Disallow importing the `react-native-svg` package (`@bam.tech/avoid-react-native-svg`)

⚠️ This rule _warns_ in the `performance` config.

<!-- end auto-generated rule header -->

Prevents from using "react-native-svg" import to avoid performance issues.

## Rule details

Examples of **incorrect** code for this rule:

```jsx
import Svg from "react-native-svg";
```

```jsx
const Svg = require("react-native-svg");
```
