// Save without formatting: [⌘ + K] > [S]

// This should trigger an error breaking eslint-plugin-bam-custom-rules:
// bam-custom-rules/accessibility-props-require-accessible

import { View } from "react-native";

export const MyComponent = () => {
  return (
    <>
      <View accessibilityRole="button" />
      <View accessibilityLabel="this is a label" />
    </>
  );
};
