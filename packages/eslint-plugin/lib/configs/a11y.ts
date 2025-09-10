import { defineFlatConfig } from "eslint-define-config";
import a11yPlugin from "eslint-plugin-react-native-a11y";

export const a11yconfig = defineFlatConfig([
  {
    plugins: { "react-native-a11y": a11yPlugin },
    rules: {
      "react-native-a11y/has-accessibility-hint": "warn",
      "react-native-a11y/has-valid-accessibility-state": "error",
      "react-native-a11y/has-valid-accessibility-descriptors": "error",
    },
  },
]);
