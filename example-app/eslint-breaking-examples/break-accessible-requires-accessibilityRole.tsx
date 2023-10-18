/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable react-native-a11y/has-valid-accessibility-ignores-invert-colors */
// Save without formatting: [⌘ + K] > [S]

// This should trigger an error breaking eslint-plugin-bam-custom-rules:
// bam-custom-rules/requires-accessibility-role-when-accessible

import { View, Pressable, Image } from "react-native";

export const MyComponent = () => {
  return (
    <>
      <View accessible />
      <Pressable accessible onPress={() => {}} />
      <Image source={{ uri: "" }} accessible />
    </>
  );
};
