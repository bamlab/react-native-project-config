// This should trigger two errors breaking eslint-plugin-react:
// react/react-in-jsx-scope
// react/react-in-jsx-scope
export const MyComponent = () => <ThisIsAViewThatDoesntExist />;
