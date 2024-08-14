// Save without formatting: [⌘ + K] > [S]

// This should trigger one error breaking eslint-plugin-react-native:
// no-restricted-imports

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export const MyStack = () => {
  return <Stack.Navigator />;
};
