# react-native-project-config

Monorepo with packages for setting up ESLint, Typescript, Prettier and Jest.

## Presentation

The goal of the project is too have a set of configuration files that can be easily imported into a new project, which would reduce the burden of starting new projects.

This repo uses [lerna](https://lerna.js.org/) to maintain, version and publish various packages for configuring ESLint, Typescript, Prettier and Jest.

There is also an example app under `packages/example-app` whose goal is to demonstrate how to import and use the configuration packages.

## Commands

- `yarn lerna run start`: run the 'start' script in all packages (currently only present in `example-app`),
- `yarn lerna run lint`: run the 'lint' script in all packages (currently only present in `example-app`).
