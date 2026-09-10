import { hasAccessibilityHintRule } from "../../lib/rules/has-accessibility-hint.js";
import { tsx } from "../ruleTester.js";

tsx.run("has-accessibility-hint", hasAccessibilityHintRule, {
  valid: [
    `const A = () => <Pressable accessibilityLabel="Save" accessibilityHint="Saves the form" />;`,
    // no label at all, so nothing to hint about
    `const B = () => <Pressable accessibilityRole="button" />;`,
    `const C = () => <View />;`,
    `const D = () => <Pressable accessibilityHint="Saves the form" />;`,
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
