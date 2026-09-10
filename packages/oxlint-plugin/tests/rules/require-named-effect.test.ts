/**
 * Cases carried over verbatim from the eslint-plugin test suite, so the oxlint
 * rule is held to the same behaviour.
 */
import { requireNamedEffectRule } from "../../lib/rules/require-named-effect.js";
import { ts } from "../ruleTester.js";

const valid = [
  `useEffect(function namedFunction() {}, []);`,
  `useEffect(theNameOfAFunction(), []);`,
  `useEffect(() => theNameOfAFunction(), []);`,
  `useEffect(() => void theNameOfAFunction(), []);`,
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

ts.run("require-named-effect", requireNamedEffectRule, {
  valid,
  invalid: invalid.map((code) => ({
    code,
    errors: [{ messageId: "useNamedFunction" }],
  })),
});
