# Enforce component displayName to match with component name (`@bam.tech/no-different-displayname`)

💼 This rule is enabled in the ✅ `recommended` config.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

Enforces component displayName to match with component name

## Rule Details

Examples of **incorrect** code for this rule :

```jsx
const MyComponent = () => {
  /* ... */
};

MyComponent.displayName = "NotMyComponent";
```

Examples of **correct** code for this rule:

```jsx
const MyComponent = () => {
  /* ... */
};

MyComponent.displayName = "MyComponent";
```
