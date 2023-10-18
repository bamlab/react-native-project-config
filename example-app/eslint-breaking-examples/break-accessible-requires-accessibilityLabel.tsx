/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-native-a11y/has-valid-accessibility-ignores-invert-colors */
// Save without formatting: [⌘ + K] > [S]

// This should trigger an error breaking eslint-plugin-bam-custom-rules:
// bam-custom-rules/requires-accessibility-label

import { Text, View } from "react-native";

export const MyComponent = () => {
  return (
    <>
      <View accessible />
      <View accessible>
        <View accessibilityLabel="" />
        <Text>this is a text</Text>
      </View>
    </>
  );
};
