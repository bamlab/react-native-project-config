# Force the use of named functions inside a useEffect (`require-named-effect`)

Force to use named functions inside a useEffect instead of lambda functions.

## Rule Details

Examples of **incorrect** code for this rule:

```jsx
useEffect(() => {}, []);
```

```jsx
useEffect(() => {
  const t = 1;
  disallowTwoThings(t);
}, []);
```

Examples of **correct** code for this rule:

```jsx
useEffect(function namedFunction() {}, []);
```

```jsx
useEffect(theNameOfAFunction(), []);
```

```jsx
useEffect(() => theNameOfAFunction(), []);
```

```jsx
useEffect(() => {
  theOnlyChildIsAFunctionCall();
}, []);
```
