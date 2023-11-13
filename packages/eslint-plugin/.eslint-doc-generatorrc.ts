import prettier from "prettier";
import type { GenerateOptions } from "eslint-doc-generator";

const config: GenerateOptions = {
  postprocess: (content, path) =>
    prettier.format(content, { parser: "markdown" }),
  urlRuleDoc: (path) =>
    `https://github.com/bamlab/react-native-project-config/blob/main/packages/eslint-plugin/docs/rules/${path}.md`,
};

export default config;
