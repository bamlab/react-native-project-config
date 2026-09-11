import { noUnusedImportsRule } from "../../lib/rules/no-unused-imports.js";
import { tsx } from "../ruleTester.js";

tsx.run("no-unused-imports", noUnusedImportsRule, {
  valid: [
    // Used as a value.
    `import { View } from "react-native";\nexport const A = () => View;\n`,
    // Used in JSX, which the scope analysis resolves like any other reference.
    `import { View } from "react-native";\nexport const A = () => <View />;\n`,
    // Used in type position only.
    `import type { Props } from "./props";\nexport const a = (p: Props) => p;\n`,
    // Re-exported.
    `import C from "./c";\nexport { C };\n`,
    `import D from "./d";\nexport default D;\n`,
    // A side-effect import declares nothing and must survive.
    `import "./polyfill";\n`,
    // `_`-prefixed is the deliberately-unused convention, and the native
    // `no-unused-vars` ignores it too.
    `import { _unused } from "./x";\n`,
  ],
  invalid: [
    {
      code: `import { View } from "react-native";\nexport const a = 1;\n`,
      errors: [{ messageId: "unusedImport" }],
      output: `export const a = 1;\n`,
    },
    {
      code: `import Foo from "./foo";\nexport const a = 1;\n`,
      errors: [{ messageId: "unusedImport" }],
      output: `export const a = 1;\n`,
    },
    {
      code: `import * as ns from "./ns";\nexport const a = 1;\n`,
      errors: [{ messageId: "unusedImport" }],
      output: `export const a = 1;\n`,
    },
    {
      code: `import type { Bar } from "./bar";\nexport const a = 1;\n`,
      errors: [{ messageId: "unusedImport" }],
      output: `export const a = 1;\n`,
    },
    // First of several named imports: the following comma and its space go too.
    {
      code: `import { View, Text } from "react-native";\nexport const a = () => Text;\n`,
      errors: [{ messageId: "unusedImport" }],
      output: `import { Text } from "react-native";\nexport const a = () => Text;\n`,
    },
    // Last of several: the preceding comma goes instead.
    {
      code: `import { View, Text } from "react-native";\nexport const a = () => View;\n`,
      errors: [{ messageId: "unusedImport" }],
      output: `import { View } from "react-native";\nexport const a = () => View;\n`,
    },
    // Middle of three.
    {
      code: `import { A, B, C } from "./x";\nexport const a = [A, C];\n`,
      errors: [{ messageId: "unusedImport" }],
      output: `import { A, C } from "./x";\nexport const a = [A, C];\n`,
    },
    // Unused default, surviving named group.
    {
      code: `import Foo, { Bar } from "./x";\nexport const a = Bar;\n`,
      errors: [{ messageId: "unusedImport" }],
      output: `import { Bar } from "./x";\nexport const a = Bar;\n`,
    },
    // Unused named group, surviving default: the braces go with it.
    {
      code: `import Foo, { Bar } from "./x";\nexport const a = Foo;\n`,
      errors: [{ messageId: "unusedImport" }],
      output: `import Foo from "./x";\nexport const a = Foo;\n`,
    },
    // Unused namespace, surviving default.
    {
      code: `import Foo, * as ns from "./x";\nexport const a = Foo;\n`,
      errors: [{ messageId: "unusedImport" }],
      output: `import Foo from "./x";\nexport const a = Foo;\n`,
    },
    // Every binding unused: one report for the whole statement.
    {
      code: `import Foo, { Bar, Baz } from "./x";\nexport const a = 1;\n`,
      errors: [{ messageId: "unusedImport" }],
      output: `export const a = 1;\n`,
    },
    // An inline type specifier is punctuated like any other named one.
    {
      code: `import { type A, B } from "./x";\nexport const a = B;\n`,
      errors: [{ messageId: "unusedImport" }],
      output: `import { B } from "./x";\nexport const a = B;\n`,
    },
    // A `_`-prefixed sibling is left alone while the real one is removed.
    {
      code: `import { _keep, drop } from "./x";\nexport const a = 1;\n`,
      errors: [{ messageId: "unusedImport" }],
      output: `import { _keep } from "./x";\nexport const a = 1;\n`,
    },
    // A trailing comment keeps its line, so the line break survives.
    {
      code: `import { View } from "react-native"; // why\nexport const a = 1;\n`,
      errors: [{ messageId: "unusedImport" }],
      output: `// why\nexport const a = 1;\n`,
    },
    // A specifier that owns its line in a multi-line import takes the line
    // with it, indentation included, rather than leaving a blank one.
    {
      code: `import {\n  A,\n  B,\n} from "./x";\nexport const a = B;\n`,
      errors: [{ messageId: "unusedImport" }],
      output: `import {\n  B,\n} from "./x";\nexport const a = B;\n`,
    },
    {
      code: `import {\n  A,\n  B,\n} from "./x";\nexport const a = A;\n`,
      errors: [{ messageId: "unusedImport" }],
      output: `import {\n  A,\n} from "./x";\nexport const a = A;\n`,
    },
    // A trailing comma is left dangling rather than chased, which stays valid
    // syntax and is what the formatter normalises.
    {
      code: `import { A, B, } from "./x";\nexport const a = A;\n`,
      errors: [{ messageId: "unusedImport" }],
      output: `import { A, } from "./x";\nexport const a = A;\n`,
    },
    // A block of unused imports is one removal, not one per statement: oxlint
    // applies a single pass of non-touching fixes, so separate removals meeting
    // at a line break would each need their own `--fix` run.
    {
      code: `import { A } from "./a";\nimport B from "./b";\nimport * as C from "./c";\nexport const a = 1;\n`,
      errors: [{ messageId: "unusedImport" }],
      output: `export const a = 1;\n`,
    },
    // A blank line between them breaks the block, so they are separate.
    {
      code: `import { A } from "./a";\n\nimport { B } from "./b";\nexport const a = 1;\n`,
      errors: [{ messageId: "unusedImport" }, { messageId: "unusedImport" }],
      output: `\nexport const a = 1;\n`,
    },
    // Adjacent unused specifiers share a comma, so they are one removal too.
    {
      code: `import { A, B, C } from "./x";\nexport const a = C;\n`,
      errors: [{ messageId: "unusedImport" }],
      output: `import { C } from "./x";\nexport const a = C;\n`,
    },
    {
      code: `import { A, B, C } from "./x";\nexport const a = A;\n`,
      errors: [{ messageId: "unusedImport" }],
      output: `import { A } from "./x";\nexport const a = A;\n`,
    },
    // Two runs split by a surviving specifier stay two removals, and cannot
    // touch, so both still apply in one pass.
    {
      code: `import { A, B, C, D } from "./x";\nexport const a = B;\n`,
      errors: [{ messageId: "unusedImport" }, { messageId: "unusedImport" }],
      output: `import { B } from "./x";\nexport const a = B;\n`,
    },
  ],
});
