// Save without formatting: [⌘ + K] > [S]

// This should trigger one error breaking eslint-plugin-react:
// react/jsx-no-undef

export const MyComponent = () => <ThisIsAViewThatDoesntExist />;
