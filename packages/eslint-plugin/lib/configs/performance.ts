import { defineConfig } from "eslint-define-config";

export const performanceConfig = defineConfig({
  rules: {
    "@bam.tech/no-animated-without-native-driver": "error",
    "@bam.tech/avoid-intl-number-format": "error",
    "@bam.tech/avoid-react-native-svg": "warn",
    "@bam.tech/no-flatlist": "error",
    "@bam.tech/no-react-navigation-stack": "error",
    "@bam.tech/no-use-is-focused": "error",
  },
  overrides: [
    {
      files: ["*.js"],
    },
  ],
});
