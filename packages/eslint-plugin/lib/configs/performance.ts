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
        ],
      },
    ],
  },
  overrides: [
    {
      files: ["*.js"],
    },
  ],
});
