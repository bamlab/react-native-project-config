# Image requires an accessible prop (`image-requires-accessible-prop`)

Force to use an accessible prop on an image.

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
