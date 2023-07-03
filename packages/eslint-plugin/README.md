# @bam.tech/eslint-plugin

eslint plugin for bam projects

## Installation

You'll first need to install [ESLint](https://eslint.org/):

```sh
npm i eslint --save-dev
```

Next, install `@bam.tech/eslint-plugin`:

```sh
npm install @bam.tech/eslint-plugin --save-dev
```

## Usage

Add `@bam.tech` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["@bam.tech"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "@bam.tech/rule-name": 2
  }
}
```

## Rules

<!-- begin auto-generated rules list -->

TODO: Run eslint-doc-generator to generate the rules list.

<!-- end auto-generated rules list -->
