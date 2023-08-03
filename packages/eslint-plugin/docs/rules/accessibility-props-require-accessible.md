# Requires accessible prop when accessibility props are defined (`@bam.tech/accessibility-props-require-accessible`)

<!-- end auto-generated rule header -->

Requires accessible prop when accessibility props are defined

## Rule Details

Examples of **incorrect** code for this rule:

```jsx
<View role="button" accessible={false} />
```

```jsx
<View accessible={false}>
  <View accessibilityLabel="this is a label" />
</View>
```

Examples of **correct** code for this rule:

```jsx
<View accessibilityRole="button" accessible />
```

```jsx
<View accessible>
  <View accessibilityLabel="this is a label" />
</View>
```
