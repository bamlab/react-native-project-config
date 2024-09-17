import { a11yConfig } from "./a11y";
import { importConfig } from "./import";
import { recommendedConfig } from "./recommended";
import { testsConfig } from "./tests";
import { performanceConfig } from "./performance";

export default {
  recommended: recommendedConfig,
  tests: testsConfig,
  a11y: a11yConfig,
  import: importConfig,
  performance: performanceConfig,
};
