# Detect inline styles in JSX (`@bam.tech/no-inline-style`)

💼 This rule is enabled in the ✅ `recommended` config.

<!-- end auto-generated rule header -->

> **Note:** This rule is a flat config adaptation of [`react-native/no-inline-styles`](https://github.com/Intellicode/eslint-plugin-react-native/blob/master/docs/rules/no-inline-styles.md).

Disallows the use of inline styles in JSX elements.

## Rule Details

Examples of **incorrect** code for this rule:

```jsx
const MyComponent = () => <View style={{ flex: 1 }} />;
```

```jsx
const MyComponent = () => (
  <View style={[styles.container, { marginTop: 10 }]} />
);
```

```jsx
const MyComponent = () => (
  <View style={condition ? { flex: 1 } : { flex: 2 }} />
);
```

Examples of **correct** code for this rule:

```jsx
const styles = StyleSheet.create({
  container: { flex: 1 },
});

const MyComponent = () => <View style={styles.container} />;
```

```jsx
const MyComponent = () => <View style={[styles.container, styles.active]} />;
```

```jsx
const MyComponent = ({ style }) => <View style={style} />;
```
