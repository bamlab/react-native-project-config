// This should trigger an error because of no-different-displayname rule
export const MyComponent = () => {};
MyComponent.displayName = "NotMyComponent";
