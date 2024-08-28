import { Animated, ScrollView, Text } from "react-native";

const fadeAnim = new Animated.Value(0);

Animated.timing(fadeAnim, {
  toValue: 1,
  duration: 500,
  useNativeDriver: false, // This line breaks the custom rule
}).start();

export const CustomScrollView = () => {
  return (
    <ScrollView
      onScroll={Animated.event([], {
        useNativeDriver: false,
      })}
    >
      <Text>{"Something to scroll"}</Text>
    </ScrollView>
  );
};
