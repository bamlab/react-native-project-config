// Save without formatting: [⌘ + K] > [S]

// This should trigger one error breaking eslint-plugin-react-native:
// no-restricted-imports

import { useIsFocused } from "@react-navigation/native";
import { Text } from "react-native";

export const MyComponent = () => {
  const isFocused = useIsFocused();

  return <Text>{isFocused ? "focused" : "unfocused"}</Text>;
};
