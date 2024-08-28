// This code should trigger the ESLint rule `avoidIntlNumberFormatRule`

const number = 1234567.89;

// Incorrect usage: This will be flagged by the ESLint rule
const formatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

const formattedNumber = formatter.format(number);

// eslint-disable-next-line no-console
console.log(formattedNumber); // Outputs: $1,234,567.89
