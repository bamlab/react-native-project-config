/**
 * @fileoverview Force the use of named functions inside a useEffect
 * @author Cyril Bonaccini
 */
import { requireNamedEffectRule } from "../../../lib/rules/require-named-effect";
import { RuleTester } from "eslint";

const ruleTester = new RuleTester({
  languageOptions: {
    parser: require("typescript-eslint").parser,
  },
});

const valid = [
  `useEffect(function namedFunction() {}, []);`,
  `useEffect(theNameOfAFunction(), []);`,
  `useEffect(() => theNameOfAFunction(), []);`,
  `useEffect(() => {
      theOnlyChildIsAFunctionCall();
    }, []);`,
];

const invalid = [
  `useEffect(() => {}, []);`,
  `useEffect(() => {
      const t = 1;
      disallowTwoThings(t);
    }, []);`,
];

ruleTester.run("require-named-effect", requireNamedEffectRule, {
  valid,
  invalid: invalid.map((code) => ({
    code,
    errors: ["Complex effects must be a named function."],
  })),
});
