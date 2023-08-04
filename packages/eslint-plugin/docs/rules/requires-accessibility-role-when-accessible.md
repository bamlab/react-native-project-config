# Enforces accessibilityRole or role when component is accessible (`@bam.tech/requires-accessibility-role-when-accessible`)

<!-- end auto-generated rule header -->

Enforces accessibilityRole when component is accessible

## Rule Details

Examples of **incorrect** code for this rule:

```jsx
<View accessible />
```

```jsx
<Pressable onPress={() => {}} accessible />
```

```jsx
<Image source={{ uri: "" }} accessible />
```

Examples of **correct** code for this rule:

```jsx
<View accessible accessibilityRole="button" />
```

```jsx
<Pressable accessible accessibilityRole="button" />
```
