import { hasValidAccessibilityStateRule } from "../../lib/rules/has-valid-accessibility-state.js";
import { tsx } from "../ruleTester.js";

tsx.run("has-valid-accessibility-state", hasValidAccessibilityStateRule, {
  valid: [
    `const A = () => <Pressable accessibilityState={{ disabled: true }} />;`,
    `const B = () => <Pressable accessibilityState={{ selected: false, busy: true }} />;`,
    `const C = () => <Pressable accessibilityState={{ checked: "mixed" }} />;`,
    `const D = () => <Pressable accessibilityState={{ checked: true }} />;`,
    `const E = () => <Pressable accessibilityState={{ expanded: false }} />;`,
    // values that cannot be evaluated statically are left alone
    `const F = () => <Pressable accessibilityState={{ disabled: isDisabled }} />;`,
    `const G = () => <Pressable accessibilityState={state} />;`,
    `const H = () => <Pressable />;`,
    // a static template key resolves, so this is a valid key, not "undefined"
    "const I = () => <Pressable accessibilityState={{ [`checked`]: true }} />;",
    // a key that cannot be evaluated statically is skipped rather than accused
    "const J = () => <Pressable accessibilityState={{ [`${prefix}ed`]: true }} />;",
    `const K = () => <Pressable accessibilityState={{ ["disabled"]: true }} />;`,
  ],
  invalid: [
    {
      code: `const A = () => <Pressable accessibilityState="disabled" />;`,
      errors: [{ messageId: "notAnObject" }],
    },
    {
      code: `const B = () => <Pressable accessibilityState={["disabled"]} />;`,
      errors: [{ messageId: "notAnObject" }],
    },
    {
      code: `const C = () => <Pressable accessibilityState={{ invalidKey: true }} />;`,
      errors: [{ messageId: "invalidKey" }],
    },
    // a static template key still gets validated
    {
      code: "const F = () => <Pressable accessibilityState={{ [`nope`]: true }} />;",
      errors: [{ messageId: "invalidKey" }],
    },
    {
      code: `const D = () => <Pressable accessibilityState={{ disabled: "yes" }} />;`,
      errors: [{ messageId: "valueNotBoolean" }],
    },
    {
      code: `const E = () => <Pressable accessibilityState={{ checked: "other" }} />;`,
      errors: [{ messageId: "checkedNotBooleanOrMixed" }],
    },
  ],
});
