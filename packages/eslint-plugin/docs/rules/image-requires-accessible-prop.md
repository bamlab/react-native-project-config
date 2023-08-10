# Require accessible prop on image components (`@bam.tech/image-requires-accessible-prop`)

💼 This rule is enabled in the ♿ `a11y` config.

🔧💡 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix) and manually fixable by [editor suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).

<!-- end auto-generated rule header -->

Enforces to use an accessible prop on an image.

🔧💡 This rule is automatically fixable by the [`--fix` CLI option](https://eslint.org/docs/latest/user-guide/command-line-interface#--fix) and manually fixable by [editor suggestions](https://eslint.org/docs/developer-guide/working-with-rules#providing-suggestions).

## Rule Details

Examples of **incorrect** code for this rule:

```jsx
<Image source={{ uri: "" }} />
```

```jsx
<BackgroundImage source={{ uri: "" }} />
```

Examples of **correct** code for this rule:

```jsx
<Image source={{ uri: "" }} accessible />
```

```jsx
<BackgroundImage source={{ uri: "" }} accessible={false} />
```

## Further Reading

This rule is only relevant if all your image components are suffixed with `Image`. If the component has children, it won't trigger an error to avoid confusion with containers.
