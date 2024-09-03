// Save without formatting: [⌘ + K] > [S]

// This should trigger an error breaking eslint-plugin-bam-custom-rules:
// bam-custom-rules/no-flatlist

import { noFlatListImportRule } from "../../../lib/rules/no-flatlist";
import { RuleTester } from "eslint";

const ruleTester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
});

const valid = [`import { FlashList } from "@shopify/flash-list";`];

const invalid = [
  `import { FlatList } from "react-native";`,
  `import { FlatList, SectionList} from 'react-native';`,
];

ruleTester.run("no-flatlist", noFlatListImportRule, {
  valid,
  invalid: invalid.map((code) => ({
    code,
    errors: [
      "FlatList is poorly optimized for performance, use FlashList from @shopify/flash-list for adequate list performance.",
    ],
  })),
});
