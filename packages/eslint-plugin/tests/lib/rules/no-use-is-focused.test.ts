// Save without formatting: [⌘ + K] > [S]

// This should trigger an error breaking eslint-plugin-bam-custom-rules:
// bam-custom-rules/no-use-is-focused

import { noUseIsFocusedImportRule } from "../../../lib/rules/no-use-is-focused";
import { RuleTester } from "eslint";

const ruleTester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
});

const valid = [`import { useFocusEffect } from "@react-navigation/native";`];

const invalid = [`import { useIsFocused } from "@react-navigation/native";`];

ruleTester.run("no-use-is-focused", noUseIsFocusedImportRule, {
  valid,
  invalid: invalid.map((code) => ({
    code,
    errors: [
      `Please use 'useFocusEffect' instead of 'useIsFocused' to avoid excessive rerenders: 'useIsFocused' will trigger rerender both when the page goes in and out of focus.`,
    ],
  })),
});
