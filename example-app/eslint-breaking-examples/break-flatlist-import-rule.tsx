// Save without formatting: [⌘ + K] > [S]

// This should trigger one error breaking eslint-plugin-react-native:
// no-restricted-imports

import { FlatList } from "react-native";

export const MyCustomButton = () => {
  return <FlatList />;
};
