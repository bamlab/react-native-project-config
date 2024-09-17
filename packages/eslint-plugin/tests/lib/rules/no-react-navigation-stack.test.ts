// Save without formatting: [⌘ + K] > [S]

// This should trigger an error breaking eslint-plugin-bam-custom-rules:
// bam-custom-rules/no-react-navigation-stack

import { noReactNavigationStackImportRule } from "../../../lib/rules/no-react-navigation-stack";
import { RuleTester } from "eslint";

const ruleTester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
});

const valid = [
  `import { createStackNavigator } from "@react-navigation/native-stack";`,
];

const invalid = [
  `import { createStackNavigator } from "@react-navigation/stack";`,
  `import {createStackNavigator} from '@react-navigation/stack';`,
];

ruleTester.run("no-react-navigation-stack", noReactNavigationStackImportRule, {
  valid,
  invalid: invalid.map((code) => ({
    code,
    errors: [
      `"@react-navigation/native-stack" provides out of the box native screens and native transitions for better performance and user experience.`,
    ],
  })),
});
