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
