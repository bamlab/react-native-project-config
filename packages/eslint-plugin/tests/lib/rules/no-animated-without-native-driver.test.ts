// Save without formatting: [⌘ + K] > [S]

// This should trigger an error breaking eslint-plugin-bam-custom-rules:
// bam-custom-rules/no-animated-without-native-driver

import { noAnimatedWithoutNativeDriverRule } from "../../../lib/rules/no-animated-without-native-driver";
import { RuleTester } from "eslint";

const ruleTester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
});

const valid = [
  `Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: true,
    }).start();`,
];

const invalid = [
  `Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
    }).start();`,
];

ruleTester.run(
  "no-animated-without-native-driver",
  noAnimatedWithoutNativeDriverRule,
  {
    valid,
    invalid: invalid.map((code) => ({
      code,
      errors: [
        "Do not use Animated with useNativeDriver: false. Always set useNativeDriver: true for better performance.",
      ],
    })),
  },
);
