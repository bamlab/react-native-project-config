/**
 * Cases mirror the behaviour of eslint-plugin-react-native's `no-raw-text`:
 * the Text/TSpan/StyledText/Animated.Text allowlist, the `skip` option, text
 * reached through any ancestor, and the whitespace handling.
 */
import { noRawTextRule } from "../../lib/rules/no-raw-text.js";
import { tsx } from "../ruleTester.js";

tsx.run("no-raw-text", noRawTextRule, {
  valid: [
    `const A = () => <Text>Hello</Text>;`,
    `const B = () => <View><Text>Hello</Text></View>;`,
    `const C = () => <Animated.Text>Hello</Animated.Text>;`,
    `const D = () => <TSpan>Hello</TSpan>;`,
    `const E = () => <StyledText>Hello</StyledText>;`,
    // reached through an intermediate element, but still inside a <Text>
    `const F = () => <Text><View>Hello</View></Text>;`,
    `const G = () => <Text>{"Hello"}</Text>;`,
    `const H = () => <Text>{\`Hello \${name}\`}</Text>;`,
    // text in a prop is not rendered text
    `const I = () => <View title="Hello" />;`,
    // line-break-only whitespace is formatting
    `const J = () => (
      <View>
        <Text>Hello</Text>
      </View>
    );`,
    `const K = () => <View>{someVariable}</View>;`,
    {
      code: `const L = () => <MyText>Hello</MyText>;`,
      options: [{ skip: ["MyText"] }],
    },
  ],
  invalid: [
    {
      code: `const A = () => <View>Hello</View>;`,
      errors: [
        { message: "Raw text (Hello) cannot be used outside of a <Text> tag" },
      ],
    },
    {
      code: `const B = () => <Pressable>Click me</Pressable>;`,
      errors: [
        {
          message: "Raw text (Click me) cannot be used outside of a <Text> tag",
        },
      ],
    },
    {
      code: `const C = () => <View>{"Hello"}</View>;`,
      errors: [
        { message: "Raw text (Hello) cannot be used outside of a <Text> tag" },
      ],
    },
    {
      code: `const D = () => <View>{\`Hello \${name}\`}</View>;`,
      errors: [
        {
          message:
            "Raw text (TemplateLiteral: name) cannot be used outside of a <Text> tag",
        },
      ],
    },
  ],
});
