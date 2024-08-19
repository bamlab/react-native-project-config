import { Animated } from "react-native";

const fadeAnim = new Animated.Value(0);

Animated.timing(fadeAnim, {
  toValue: 1,
  duration: 500,
  useNativeDriver: false, // This line breaks the custom rule
}).start();
