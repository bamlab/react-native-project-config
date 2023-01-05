# react-native-project-config

Monorepo with packages for setting up ESLint, Typescript, Prettier and Jest.

## Presentation

The goal of the project is too have a set of configuration files that can be easily imported into a new project, which would reduce the burden of starting new projects.

This repo uses [lerna](https://lerna.js.org/) to maintain, version and publish various packages for configuring ESLint, Typescript, Prettier and Jest.

There is also an example app under `packages/example-app` whose goal is to demonstrate how to import and use the configuration packages.

## Using the configurations

- [Using ESLint configuration](./packages/eslint/README.md)

## Installing the project

- clone the project: `git clone https://github.com/bamlab/react-native-project-config`,
- install the dependencies: `yarn install`,

## Modifying the project

To have a complete understanding on how to modify the project, see [Lerna's documentation](https://lerna.js.org/docs/introduction).

Here are some useful commands:

- creating a new package named `package-my-config`: `yarn lerna create package-my-config`,
- rename the directory of a package: `mv package-my-config new-directory-name && yarn lerna bootstrap`,
- run a script `do-something` that exists in at least one package: `yarn lerna run do-something` (this will try to run the script in all packages in which it is defined).

## Running commands

- `yarn lerna run start`: run the 'start' script in all packages (currently only present in `example-app`),
- `yarn lerna run lint`: run the 'lint' script in all packages (currently only present in `example-app`).
