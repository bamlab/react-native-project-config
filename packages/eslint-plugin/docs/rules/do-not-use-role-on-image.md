# Disallow role prop on Image component (`@bam.tech/do-not-use-role-on-image`)

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

Enforces the use of `accessibilityRole` instead of `role` on an image component.

## Rule Details

Examples of **incorrect** code for this rule:

```jsx
<Image source={{ uri: "" }} role="button" />
```

Examples of **correct** code for this rule:

```jsx
<Image source={{ uri: "" }} accessibilityRole="button" />
```
