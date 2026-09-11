/**
 * This rule only covers what `react-perf/jsx-no-new-object-as-prop` misses, so
 * the valid cases include inline objects passed directly as a prop: those are
 * the native rule's job.
 */
import { noInlineStyleInArrayRule } from "../../lib/rules/no-inline-style-in-array.js";
import { tsx } from "../ruleTester.js";

tsx.run("no-inline-style-in-array", noInlineStyleInArrayRule, {
  valid: [
    `const A = () => <View style={[styles.container, styles.active]} />;`,
    `const B = () => <View style={styles.container} />;`,
    `const C = () => <View style={[styles.container, props.style]} />;`,
    // the native rule reports these
    `const D = () => <View style={{ flex: 1 }} />;`,
    `const E = () => <View />;`,
    `const F = () => <View style={[]} />;`,
    `const G = () => <View style={[styles.a, isActive && styles.b]} />;`,
    `const H = () => <View style={[styles.a, {}]} />;`,
    // not a style prop, despite containing "style"
    `const I = () => <View onStyleChange={[{ flex: 1 }]} />;`,
  ],
  invalid: [
    {
      code: `const A = () => <View style={[styles.container, { marginTop: 10 }]} />;`,
      errors: [{ messageId: "inlineStyleInArray" }],
    },
    {
      code: `const B = () => <View style={[{ flex: 1 }, { flex: 2 }]} />;`,
      errors: [
        { messageId: "inlineStyleInArray" },
        { messageId: "inlineStyleInArray" },
      ],
    },
    {
      code: `const C = () => <View style={[styles.a, isActive && { opacity: 1 }]} />;`,
      errors: [{ messageId: "inlineStyleInArray" }],
    },
    {
      code: `const D = () => <View style={[styles.a, cond ? { flex: 1 } : { flex: 2 }]} />;`,
      errors: [
        { messageId: "inlineStyleInArray" },
        { messageId: "inlineStyleInArray" },
      ],
    },
    {
      code: `const E = () => <View customStyle={[styles.a, { flex: 1 }]} />;`,
      errors: [{ messageId: "inlineStyleInArray" }],
    },
    // React Native flattens nested style arrays
    {
      code: `const F = () => <View style={[styles.a, [styles.b, { flex: 1 }]]} />;`,
      errors: [{ messageId: "inlineStyleInArray" }],
    },
    {
      code: `const G = () => <View contentContainerStyle={[styles.a, { flex: 1 }]} />;`,
      errors: [{ messageId: "inlineStyleInArray" }],
    },
  ],
});
