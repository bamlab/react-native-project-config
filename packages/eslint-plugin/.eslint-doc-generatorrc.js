const prettier = require("prettier");
const { prettier: prettierRC } = require("./package.json"); // or wherever your prettier config lies

/** @type {import('eslint-doc-generator').GenerateOptions} */
const config = {
  postprocess: (content, path) =>
    prettier.format(content, { ...prettierRC, parser: "markdown" }),
  urlRuleDoc: (path) =>
    `https://github.com/bamlab/react-native-project-config/blob/main/packages/eslint-plugin/docs/rules/${path}.md`,
};

module.exports = config;
