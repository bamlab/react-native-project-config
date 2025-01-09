/* eslint-disable @typescript-eslint/no-require-imports */

const pluginBam = require("@bam.tech/eslint-plugin");
const { defineFlatConfig } = require("eslint-define-config");

module.exports = defineFlatConfig(pluginBam.configs.recommended);
