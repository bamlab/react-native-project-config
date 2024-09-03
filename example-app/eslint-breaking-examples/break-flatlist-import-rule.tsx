// Save without formatting: [⌘ + K] > [S]

// This should trigger one error breaking custom FlatList import rule:
// @bam.tech/no-flatlist

import { FlatList } from "react-native";

export const MyCustomButton = () => {
  return <FlatList />;
};
