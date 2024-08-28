import { defineConfig } from "eslint-define-config";

export const performanceConfig = defineConfig({
  rules: {
    "no-restricted-imports": [
      "warn",
      {
        paths: [
          {
            name: "react-native",
            importNames: ["FlatList"],
            message:
              "Please use FlashList from @shopify/flash-list instead of FlatList from react-native.",
          },
          {
            name: "@react-navigation/stack",
            message:
              'Please use "@react-navigation/native-stack" instead of "@react-navigation/stack".',
          },
          {
            name: "@react-navigation/native",
            importNames: ["useIsFocused"],
            message:
              "Please use useFocusEffect instead of useIsFocused to avoid excessive rerenders.",
          },
          {
            name: "react-native-svg",
            message:
              "Usage of react-native-svg is discouraged. Consider alternatives if applicable.",
          },
        ],
      },
    ],
    "@bam.tech/no-animated-without-native-driver": "error",
    "@bam.tech/avoid-intl-number-format": "error",
  },
  overrides: [
    {
      files: ["*.js"],
    },
  ],
});
