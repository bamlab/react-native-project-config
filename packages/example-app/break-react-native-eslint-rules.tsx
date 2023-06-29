// This should trigger one error breaking eslint-plugin-react-native:
// react-native/no-raw-text

import { View } from "react-native";

export const MyText = () => {
  return <View>Test</View>;
};
