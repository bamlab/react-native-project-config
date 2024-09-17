// Save without formatting: [⌘ + K] > [S]

// This should trigger one error breaking custom react-navigation/stack rule:
// @bam.tech/no-react-navigation-stack

import { createStackNavigator } from "@react-navigation/stack";

const Stack = createStackNavigator();

export const MyStack = () => {
  return <Stack.Navigator />;
};
