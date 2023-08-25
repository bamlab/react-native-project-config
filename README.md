# react-native-project-config by BAM

Monorepo with packages for setting up ESLint and Typescript for any new React Native project.

## Presentation

The goal of the project is too have a set of configuration files that can be easily imported into a new project, which would reduce the burden of starting new projects.

This repo uses [lerna](https://lerna.js.org/) to maintain, version and publish various packages for configuring ESLint and Typescript.

There is also an example app under `packages/example-app` whose goal is to demonstrate how to import and use the configuration packages.

## Using the configurations

- [Using ESLint plugin](./packages/eslint-plugin/README.md)
- [Using Typescript config](./packages/typescript-config/README.md)

## Installing the project

- clone the project: `git clone https://github.com/bamlab/react-native-project-config`,
- install the dependencies: `yarn install`,

## Modifying the project

To have a complete understanding on how to modify the project, see [Lerna's documentation](https://lerna.js.org/docs/introduction).

Here are some useful commands:

- creating a new package named `package-my-config`: `yarn lerna create package-my-config`,
- rename the directory of a package: `mv package-my-config new-directory-name && yarn lerna bootstrap`,
- run a script `do-something` that exists in at least one package: `yarn lerna run do-something` (this will try to run the script in all packages in which it is defined).

## Publishing a new version of a package

The publication is done automatically by this [Github Workflow](.github/workflows/publish.yml) when a new tag is pushed to the repository.
All you have to do is the versioning of the packages you want to publish.

> You need to be on the main branch and have the repo write access to publish a new version.

Run `yarn lerna version` to start the process. It will ask you which packages you want to publish and which version you want to publish them under.

```bash
? Select a new version (currently 1.0.0) (Use arrow keys)
❯ Patch (1.0.1) # bug fixes
  Minor (1.1.0) # new features
  Major (2.0.0) # breaking changes
  Prepatch (1.0.1-alpha.0)
  Preminor (1.1.0-alpha.0)
  Premajor (2.0.0-alpha.0)
  Custom Prerelease
  Custom Version
```

After you have selected the packages and the versions, Lerna will push a new tagged commit with the version bumps in `package.json` files.
The pushed commit will trigger the Github Workflow which will publish the packages to NPM.

## Running commands

- `yarn lerna run start`: run the 'start' script in all packages (currently only present in `example-app`),
- `yarn lerna run lint`: run the 'lint' script in all packages (currently only present in `example-app`).

## How to contribute

- Pick one issue [here](https://github.com/bamlab/react-native-project-config/issues)
- Pick one task [here](https://github.com/orgs/bamlab/projects/6)
