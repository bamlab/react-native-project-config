// Save without formatting: [⌘ + K] > [S]

// This should trigger one error breaking eslint-plugin-react-native:
// react-native-a11y/has-valid-accessibility-descriptors

export const bar = (arg: string) => {
  // arg can never be nullish, so ?. is unnecessary
  return arg?.length;
};