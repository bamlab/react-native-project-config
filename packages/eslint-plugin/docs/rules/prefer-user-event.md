# Enforces usage of userEvent over fireEvent in tests (`@bam.tech/prefer-user-event`)

💼 This rule is enabled in the 🧪 `tests` config.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

Enforces the usage of `userEvent.type` over `fireEvent.changeText` and `userEvent.press` over `fireEvent.press`

## Rule details

Examples of **incorrect** code for this rule:

```jsx
fireEvent.press(button);
```

```jsx
fireEvent.changeText(input, "text");
```

Examples of **correct** code for this rule:

```jsx
await userEvent.press(button);
```

```jsx
await userEvent.type(input, "text");
```
