import type { Plugin } from "@oxlint/plugins";

import { rules } from "./rules/index.js";

/**
 * The plugin name is what qualifies rules in `.oxlintrc.json`, e.g.
 * `"@bam.tech/require-named-effect": "error"`.
 */
const plugin: Plugin = {
  meta: { name: "@bam.tech" },
  rules,
};

export default plugin;
export { rules };
