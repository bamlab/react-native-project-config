
import { defineConfig }  from "eslint-define-config";

export const a11yconfig =  defineConfig({
  extends: ["plugin:react-native-a11y/all"],
  rules: {
    "react-native-a11y/has-accessibility-hint": "off",
  },
});
