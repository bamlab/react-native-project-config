# tsconfig for BAM

This project is just a simple package that exposes a tsconfig.json file that gathers the compiler options that should be used in any new BAM project.

## How to use?

In your app, run `yarn add @bam.tech/typescript-config expo`.

In your `.tsconfig.json` config file, extend the exported tsconfig:

```json
// tsconfig.json
{
  "extends": "@bam.tech/typescript-config/tsconfig"
}
```

## How to customize?

You can still customize your tsconfig by overriding any acceptable field.

## How to improve?

If you find a useful compiler options that you feel every project at BAM should use, feel free to open a PR.

## Module resolution

This config does not set `moduleResolution`: it inherits whatever `expo/tsconfig.base` specifies,
which is `bundler` from Expo SDK 53 onwards and the legacy `node` (node10) before that.

It used to pin `"moduleResolution": "node"`, which overrode modern Expo's own choice. That is a
problem on any current project, because node10 resolution cannot read the `exports` map that most
packages now ship their types behind, and Metro honours those maps from React Native 0.79 (Expo 53).
It also blocks type-aware linting: `oxlint-tsgolint` rejects node10 outright.

If you are on Expo 52 or older and want modern resolution, set it in your own `tsconfig.json`:

```jsonc
{
  "extends": "@bam.tech/typescript-config",
  "compilerOptions": { "moduleResolution": "bundler" }
}
```
