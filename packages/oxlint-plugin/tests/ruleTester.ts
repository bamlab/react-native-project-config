import { RuleTester } from "oxlint/plugins-dev";
import { describe, it } from "vitest";

RuleTester.describe = describe;
RuleTester.it = it;

/** Rules that only need TypeScript. */
export const ts = new RuleTester({
  languageOptions: { parserOptions: { lang: "ts" } },
});

/** Rules that inspect JSX. */
export const tsx = new RuleTester({
  languageOptions: { parserOptions: { lang: "tsx" } },
});
