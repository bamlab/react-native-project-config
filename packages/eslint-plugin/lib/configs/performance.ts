import { defineConfig } from "eslint-define-config";

export const performanceConfig = defineConfig({
  rules: {
    "no-restricted-imports": [
      "error",
      {
        paths: [
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
        ],
      },
    ],
    "@bam.tech/no-animated-without-native-driver": "error",
    "@bam.tech/avoid-intl-number-format": "error",
    "@bam.tech/avoid-react-native-svg": "warn",
    "@bam.tech/no-flatlist": "error",
  },
  overrides: [
    {
      files: ["*.js"],
    },
  ],
});
