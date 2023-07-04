const prettier = require("prettier");
const { prettier: prettierRC } = require("./package.json"); // or wherever your prettier config lies

/** @type {import('eslint-doc-generator').GenerateOptions} */
const config = {
  postprocess: (content, path) =>
    prettier.format(content, { ...prettierRC, parser: "markdown" }),
};

module.exports = config;
