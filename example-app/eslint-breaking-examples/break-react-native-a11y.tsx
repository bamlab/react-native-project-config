// Save without formatting: [⌘ + K] > [S]

// This should trigger one error breaking eslint-plugin-react-native:
// react-native-a11y/has-valid-accessibility-descriptors

import { Pressable, Text } from "react-native";

export const MyCustomButton = () => {
  return (
    <Pressable>
      <Text>Click here!</Text>
      <Text>Here is a short summary</Text>
    </Pressable>
  );
};
