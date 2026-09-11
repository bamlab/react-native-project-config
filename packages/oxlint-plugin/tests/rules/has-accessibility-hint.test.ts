import { hasAccessibilityHintRule } from "../../lib/rules/has-accessibility-hint.js";
import { tsx } from "../ruleTester.js";

tsx.run("has-accessibility-hint", hasAccessibilityHintRule, {
  valid: [
    `const A = () => <Pressable accessibilityLabel="Save" accessibilityHint="Saves the form" />;`,
    // no label at all, so nothing to hint about
    `const B = () => <Pressable accessibilityRole="button" />;`,
    `const C = () => <View />;`,
    `const D = () => <Pressable accessibilityHint="Saves the form" />;`,
    // Prop names are matched case-sensitively on purpose. `accessibilitylabel`
    // is not a React Native prop and does nothing at runtime, so there is no
    // label here and nothing to require a hint for. Upstream reads props
    // through jsx-ast-utils, which ignores case, and reports this instead.
    `const E = () => <Pressable accessibilitylabel="Save" />;`,
  ],
  invalid: [
    {
      code: `const A = () => <Pressable accessibilityLabel="Save" />;`,
      errors: [{ messageId: "missingHint" }],
    },
    {
      code: `const B = () => <View accessibilityLabel="Header" />;`,
      errors: [{ messageId: "missingHint" }],
    },
  ],
});
