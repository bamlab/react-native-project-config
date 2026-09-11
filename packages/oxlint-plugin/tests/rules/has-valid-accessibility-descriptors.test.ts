import { hasValidAccessibilityDescriptorsRule } from "../../lib/rules/has-valid-accessibility-descriptors.js";
import { tsx } from "../ruleTester.js";

tsx.run(
  "has-valid-accessibility-descriptors",
  hasValidAccessibilityDescriptorsRule,
  {
    valid: [
      `const A = () => <Pressable accessibilityRole="button" onPress={f} />;`,
      `const B = () => <TouchableOpacity accessibilityLabel="Save" onPress={f} />;`,
      `const C = () => <TouchableHighlight role="button" onPress={f} />;`,
      `const D = () => <Pressable accessible onPress={f} />;`,
      `const E = () => <TextInput accessibilityLabel="Email" />;`,
      // props may come through a spread, which cannot be inspected
      `const F = () => <Pressable {...props} />;`,
      // not a touchable, so out of scope: upstream is name-based, so a plain
      // View with onPress is not reported
      `const G = () => <View onPress={f} />;`,
      `const H = () => <Text>hi</Text>;`,
      {
        code: `const I = () => <MyButton onPress={f} accessibilityRole="button" />;`,
        options: [{ touchables: ["MyButton"] }],
      },
    ],
    invalid: [
      {
        code: `const A = () => <Pressable onPress={f} />;`,
        errors: [{ messageId: "missingDescriptors" }],
        output: `const A = () => <Pressable accessibilityRole="button" onPress={f} />;`,
      },
      {
        code: `const B = () => <TouchableOpacity onPress={f} />;`,
        errors: [{ messageId: "missingDescriptors" }],
        output: `const B = () => <TouchableOpacity accessibilityRole="button" onPress={f} />;`,
      },
      {
        code: `const C = () => <TextInput />;`,
        errors: [{ messageId: "missingDescriptors" }],
        output: `const C = () => <TextInput accessibilityLabel="Text input field" />;`,
      },
      {
        code: `const D = () => <MyButton onPress={f} />;`,
        options: [{ touchables: ["MyButton"] }],
        errors: [{ messageId: "missingDescriptors" }],
        output: `const D = () => <MyButton accessibilityRole="button" onPress={f} />;`,
      },
    ],
  },
);
