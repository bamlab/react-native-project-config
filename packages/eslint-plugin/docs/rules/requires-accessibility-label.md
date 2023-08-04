# Enforces label when component accessible (`@bam.tech/requires-accessibility-label`)

💡 This rule is manually fixable by [editor suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).

<!-- end auto-generated rule header -->

Please describe the origin of the rule here.

## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```jsx
<View accessible />
```

```jsx
<View accessible>
  <Text>foo</Text>
  <View accessible accessibilityLabel="foo" />
</View>
```

Examples of **correct** code for this rule:

```jsx
<View accessible accessibilityLabel="foo" />
```

```jsx
<View accessible>
  <Text>foo</Text>
</View>
```
