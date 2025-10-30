/**
 * @fileoverview Detect inline styles in JSX
 */

import { RuleTester } from "eslint";
import { noInlineStyleRule } from "../../../lib/rules/no-inline-style";

const ruleTester = new RuleTester({
  languageOptions: {
    parser: require("typescript-eslint").parser,
    parserOptions: {
      ecmaFeatures: {
        jsx: true,
      },
    },
  },
});

const valid = [
  {
    code: `
      const styles = StyleSheet.create({
        container: { flex: 1 }
      });
      const MyComponent = () => <View style={styles.container} />;
    `,
  },
  {
    code: `
      const MyComponent = () => <View style={externalStyles.container} />;
    `,
  },
  {
    code: `
      const MyComponent = () => <View style={props.style} />;
    `,
  },
  {
    code: `
      const MyComponent = () => <View style={[styles.container, styles.active]} />;
    `,
  },
  {
    code: `
      const MyComponent = () => <View />;
    `,
  },
  {
    code: `
      const MyComponent = () => <View style={undefined} />;
    `,
  },
  {
    code: `
      const MyComponent = () => <View style={null} />;
    `,
  },
  {
    code: `
      const style = getStyle();
      const MyComponent = () => <View style={style} />;
    `,
  },
];

const invalid = [
  {
    code: `
      const MyComponent = () => <View style={{ flex: 1 }} />;
    `,
    errors: [{ messageId: "noInline" }],
  },
  {
    code: `
      const MyComponent = () => <View style={{ color: 'red' }} />;
    `,
    errors: [{ messageId: "noInline" }],
  },
  {
    code: `
      const MyComponent = () => <View style={{ backgroundColor: '#fff', padding: 10 }} />;
    `,
    errors: [{ messageId: "noInline" }],
  },
  {
    code: `
      const MyComponent = () => <Text style={{ fontSize: 16 }}>Hello</Text>;
    `,
    errors: [{ messageId: "noInline" }],
  },
  {
    code: `
      const MyComponent = () => (
        <View style={condition ? { flex: 1 } : { flex: 2 }} />
      );
    `,
    errors: [{ messageId: "noInline" }, { messageId: "noInline" }],
  },
  {
    code: `
      const MyComponent = () => (
        <View style={[styles.container, { marginTop: 10 }]} />
      );
    `,
    errors: [{ messageId: "noInline" }],
  },
  {
    code: `
      const MyComponent = () => (
        <View style={isActive && { backgroundColor: 'blue' }} />
      );
    `,
    errors: [{ messageId: "noInline" }],
  },
  {
    code: `
      const MyComponent = () => <View customStyle={{ width: 100 }} />;
    `,
    errors: [{ messageId: "noInline" }],
  },
  {
    code: `
      const MyComponent = () => (
        <View style={{ margin: -5 }} />
      );
    `,
    errors: [{ messageId: "noInline" }],
  },
];

ruleTester.run("no-inline-style", noInlineStyleRule, {
  valid,
  invalid,
});
