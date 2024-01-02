import "react";

import { StyleSheet, Text, View } from "react-native";

// This should not trigger a warning nor an error because explicit-function-return-type rule is off
const noReturnTypeDefined = () => {
  return;
};
noReturnTypeDefined();

// These should not trigger a warning nor an error because no-console rule is off for warns and errors
console.warn("This is a warning message");
console.error("This is an error message");

// This should not trigger a warning nor an error because no-color-literals rule is off
const styles = StyleSheet.create({
  view: {
    color: "red",
  },
});
styles.view;

// This should not trigger a warning nor an error because sort-styles rule is off
const notSortedStyles = StyleSheet.create({
  beta: {},
  alpha: {},
});
notSortedStyles.alpha;
notSortedStyles.beta;

// This should not trigger an error because no-raw-text rule is off

export const MyText = () => {
  return <View>Test</View>;
};

// This should not trigger an error because react/prop-types rule is off
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export const ComponentWithNotTypedProps = ({ name }) => {
  return <Text>{name}</Text>;
};
