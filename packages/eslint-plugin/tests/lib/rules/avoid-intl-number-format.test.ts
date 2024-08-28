// Save without formatting: [⌘ + K] > [S]

// This should trigger an error breaking eslint-plugin-bam-custom-rules:
// bam-custom-rules/avoid-intl-number-format

import { avoidIntlNumberFormatRule } from "../../../lib/rules/avoid-intl-number-format";
import { RuleTester } from "eslint";

const ruleTester = new RuleTester({
  parser: require.resolve("@typescript-eslint/parser"),
});

const valid = [
  ` const formatCurrency = (number: number) => {
        return numeral(number).format('$0,0.00');
    };

    const number = 1234567.89;
    console.log(formatCurrency(number));`,
];

const invalid = [
  ` const number = 1234567.89;
    
    const formatter = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
    });

    const formattedNumber = formatter.format(number);

    console.log(formattedNumber);`,
];

ruleTester.run("no-animated-without-native-driver", avoidIntlNumberFormatRule, {
  valid,
  invalid: invalid.map((code) => ({
    code,
    errors: [
      "Avoid using `Intl.NumberFormat` as it can lead to performance issues. Consider using a lightweight formatting alternative or memoizing the formatter instance.",
    ],
  })),
});
