# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0](https://github.com/bamlab/react-native-project-config/compare/@bam.tech/eslint-plugin@1.0.1...@bam.tech/eslint-plugin@2.0.0) (2023-10-12)

### Features

- **a11y:** remove custom rules from a11y config ([#65](https://github.com/bamlab/react-native-project-config/issues/65)) ([8fdb40b](https://github.com/bamlab/react-native-project-config/commit/8fdb40b18c7ebe9aab6b00960bf5fdfcc55790bc))
- add jsx-no-useless-fragment ([#69](https://github.com/bamlab/react-native-project-config/issues/69)) ([2227246](https://github.com/bamlab/react-native-project-config/commit/2227246b8a0341b212b29adbe258f93b1eb5d861))
- **recommended:** no-floating-promises ([#70](https://github.com/bamlab/react-native-project-config/issues/70)) ([830eead](https://github.com/bamlab/react-native-project-config/commit/830eead6c36c1652f82aa80f78f3cd3d0b7f666a))

### Reverts

- **eslint-plugin:** delete custom rules ([#81](https://github.com/bamlab/react-native-project-config/issues/81)) ([e6fcf3b](https://github.com/bamlab/react-native-project-config/commit/e6fcf3b48ae5659fe022526862d7d09e5e41ffbc))

### BREAKING CHANGES

- **a11y:** remove custom rules from config a11y

- docs: update a11y documentation for removed rules

- fix(example-app): no custom rules in eslint config
- **recommended:** no-floating-promises
- add jsx-no-useless-fragment

- doc: precise what to do when you add a rule

- feat: add a pull request template

## [1.0.1](https://github.com/bamlab/react-native-project-config/compare/@bam.tech/eslint-plugin@1.0.0...@bam.tech/eslint-plugin@1.0.1) (2023-09-20)

### Bug Fixes

- disable react-native/no-raw-text ([#60](https://github.com/bamlab/react-native-project-config/issues/60)) ([4a8ace3](https://github.com/bamlab/react-native-project-config/commit/4a8ace36fbf91421461b808c896a048ce5138152))

## [1.0.0](https://github.com/bamlab/react-native-project-config/compare/@bam.tech/eslint-plugin@0.4.3...@bam.tech/eslint-plugin@1.0.0) (2023-09-14)

### Features

- add array-callback-return rule ([#58](https://github.com/bamlab/react-native-project-config/issues/58)) ([0b24132](https://github.com/bamlab/react-native-project-config/commit/0b2413293de65ce6975e3a181b5b118f74823cd3))
- add new rule react/no-unused-prop-types ([#52](https://github.com/bamlab/react-native-project-config/issues/52)) ([5cfca6d](https://github.com/bamlab/react-native-project-config/commit/5cfca6dfe3ebd9b8bf65011a023d0807ceda3b6b))
- add unused imports rules ([#57](https://github.com/bamlab/react-native-project-config/issues/57)) ([fbdcd15](https://github.com/bamlab/react-native-project-config/commit/fbdcd154b28761d32225469fa2ad243eb12d88a4))
- remove no-raw-text-r
- feat: remove no-raw-text rule ([#54](https://github.com/bamlab/react-native-project-config/pull/54)) ([6d5732e](https://github.com/bamlab/react-native-project-config/pull/54/commits/6d5732ef9be47f3c010aefadf7d05ec29f94748c))

### BREAKING CHANGES

- add array-callback-return rule
- add react/no-unused-prop-types rule
- upgrade testing library plugin
