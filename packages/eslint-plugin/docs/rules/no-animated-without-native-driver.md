# Disallow the use of `Animated` with `useNativeDriver: false` (`@bam.tech/no-animated-without-native-driver`)

💼 This rule is enabled in the `performance` config.

<!-- end auto-generated rule header -->

Enforces the usage of native driver when using `Animated` from `react-native` to improve performance.

## Rule details

Example of **incorrect** code for this rule:

```jsx
Animated.timing(fadeAnim, {
  toValue: 1,
  duration: 500,
  useNativeDriver: false,
}).start();
```

Example of **correct** code for this rule:

```jsx
Animated.timing(fadeAnim, {
  toValue: 1,
  duration: 500,
  useNativeDriver: true,
}).start();
```
