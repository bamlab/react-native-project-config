// Save without formatting: [⌘ + K] > [S]

// This should trigger an error breaking eslint-plugin-bam-custom-rules:
// bam-custom-rules/avoid-react-native-svg

import { avoidReactNativeSvgImportRule } from "../../../lib/rules/avoid-react-native-svg";
import { RuleTester } from "eslint";

const ruleTester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
});

const valid = [``];

const invalid = [
  `import Svg from 'react-native-svg';`,
  `const Svg = require('react-native-svg');`,
];

ruleTester.run("avoid-react-native-svg", avoidReactNativeSvgImportRule, {
  valid,
  invalid: invalid.map((code) => ({
    code,
    errors: [
      "Do not import `react-native-svg`. Consider using an alternative method for SVG handling or ensure it's necessary for your use case.",
    ],
  })),
});
