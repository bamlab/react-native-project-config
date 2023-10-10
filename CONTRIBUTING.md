# Contribute

Each package has its own specifications for contribution. Please refer to the `CONTRIBUTING.md` file in the package you want to contribute to.

- [eslint-plugin](https://github.com/bamlab/react-native-project-config/blob/main/packages/eslint-plugin/CONTRIBUTING.md)

## Conventional commits

We use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) to automate the release process. Please follow the commit message format described in the link above. Lerna will automatically generate the changelog for each package based on the commit messages since the last version. (see [README.md](https://github.com/bamlab/react-native-project-config/blob/main/README.md#publishing-a-new-version-of-a-package))

## markdown lint

We don't use relative links bewteen .md files, NPM handles them differently than github does, and this creates a bug on NPM where the links are broken. On this project you have markdown lint set up. You can download the [markdown lint VSCode extension](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint), it will lint your .md files as you write them. There is a [custom rule](https://github.com/bamlab/react-native-project-config/blob/main/markdown-lint-custom-rules/no-relative-links.js) that prevents the use of relative links in .md files. You can check it if you need to write a new custom rule. The scipt and the extension use this [configuration file](https://github.com/bamlab/react-native-project-config/blob/main/.vscode/settings.json), and the custom rules that are added in the VS Code [settings](https://github.com/bamlab/react-native-project-config/blob/main/.markdownlint.json)
