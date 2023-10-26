# Enforces awaiting userEvent calls (`@bam.tech/await-user-event`)

💼 This rule is enabled in the 🧪 `tests` config.

🔧 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix).

<!-- end auto-generated rule header -->

Makes sure calls to `userEvent` APIs are awaited

## Rule details

Examples of **incorrect** code for this rule:

```jsx
userEvent.press(button);
```

Examples of **correct** code for this rule:

```jsx
await userEvent.press(button);
```
