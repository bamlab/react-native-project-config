# react-native-project-config by BAM

Monorepo with packages for setting up ESLint and Typescript for any new React Native project.

## Presentation

The goal of the project is too have a set of configuration files that can be easily imported into a new project, which would reduce the burden of starting new projects.

This repo uses [lerna](https://lerna.js.org/) to maintain, version and publish various packages for configuring ESLint and Typescript.

There is also an example app under `packages/example-app` whose goal is to demonstrate how to import and use the configuration packages.

## Using the configurations

- [Using ESLint plugin](https://github.com/bamlab/react-native-project-config/blob/main/packages/eslint-plugin/README.md)
- [Using Typescript config](https://github.com/bamlab/react-native-project-config/blob/main/packages/typescript-config/README.md)

## Installing the project

- clone the project: `git clone https://github.com/bamlab/react-native-project-config`,
- install the dependencies: `yarn install`,

## Modifying the project

To have a complete understanding on how to modify the project, see [Lerna's documentation](https://lerna.js.org/docs/introduction).

Here are some useful commands:

- creating a new package named `package-my-config`: `yarn lerna create package-my-config`,
- rename the directory of a package: `mv package-my-config new-directory-name && yarn lerna bootstrap`,
- run a script `do-something` that exists in at least one package: `yarn lerna run do-something` (this will try to run the script in all packages in which it is defined).

## Conventional commits

We use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) to automate the release process.

> If you add a new rule to a config, this is a breaking change, because it could make the CI fail on projects that use the plugin. The commit name where you add the new rule needs to follow this patern `BREAKING CHANGE : the description of your commit`

## Publishing a new version of a package

The publication is done automatically by this [Github Workflow](https://github.com/bamlab/react-native-project-config/blob/main/.github/workflows/publish.yml) when a new tag is pushed to the repository.
All you have to do is the versioning of the packages you want to publish.

> You need to be on the main branch and have the repo write access to publish a new version.

Run `yarn lerna version` to start the process. It will run the command `yarn lerna version --conventional-commits --no-private`.

Lerna will prompt you to select the version bump for each package. It will also generate the changelog for each package based on the commit messages since the last version.

> Versioning and changelogs generation using [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/)

Here's an example of the output:

```bash
lerna info Looking for changed packages since @bam.tech/eslint-plugin@1.0.0
lerna info getChangelogConfig Successfully resolved preset "conventional-changelog-angular"

Changes:
 - @bam.tech/eslint-plugin: 1.0.0 => 1.1.0
```

It will then push a tagged commit `chore(release): Publish` which will then trigger the Github Workflow to publish the new version of each package to NPM.

## Unpublish a package version

If you want to unpublish a package, you have to be contributor of @bam.tech/eslint-plugin (in this case for the eslint plugin). Use the following commad :
`npm unpublish @bam.tech/eslint-plugin@X.Y.Z`

## Running commands

- `yarn lerna run start`: run the 'start' script in all packages (currently only present in `example-app`),
- `yarn lerna run lint`: run the 'lint' script in all packages (currently only present in `example-app`).

## How to contribute

- Pick one issue [here](https://github.com/bamlab/react-native-project-config/issues)
- Pick one task [here](https://github.com/orgs/bamlab/projects/6)
