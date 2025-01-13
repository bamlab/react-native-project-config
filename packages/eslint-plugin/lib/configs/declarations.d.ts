declare module "eslint-plugin-react-hooks" {
  import type { Linter, Rule } from "eslint";
  export const rules: {
    "rules-of-hooks": Rule.RuleModule;
    "exhaustive-deps": Rule.RuleModule;
  };
}

declare module "eslint-plugin-react-native" {
  export const deprecatedRules: Record<string, any>;
  export const rules: Record<string, any>;
  export const rulesConfig: Record<string, number>;
  export const environments: {
    "react-native": {
      globals: Record<string, any>;
    };
  };
  export const configs: {
    all: {
      plugins: string[];
      parserOptions: {
        ecmaFeatures: {
          jsx: boolean;
        };
      };
      rules: Record<string, number>;
    };
  };
}

declare module "eslint-plugin-react-native-a11y" {
  interface RuleDefinitions {
    "has-accessibility-hint": Rule.RuleModule;
    "has-accessibility-props": Rule.RuleModule;
    "has-valid-accessibility-actions": Rule.RuleModule;
    "has-valid-accessibility-component-type": Rule.RuleModule;
    "has-valid-accessibility-descriptors": Rule.RuleModule;
    "has-valid-accessibility-ignores-invert-colors": Rule.RuleModule;
    "has-valid-accessibility-live-region": Rule.RuleModule;
    "has-valid-accessibility-role": Rule.RuleModule;
    "has-valid-accessibility-state": Rule.RuleModule;
    "has-valid-accessibility-states": Rule.RuleModule;
    "has-valid-accessibility-traits": Rule.RuleModule;
    "has-valid-accessibility-value": Rule.RuleModule;
    "has-valid-important-for-accessibility": Rule.RuleModule;
    "no-nested-touchables": Rule.RuleModule;
  }

  interface PluginConfig extends Linter.Config {
    rules: {
      [key in keyof RuleDefinitions]?: "error" | "warn" | "off";
    };
  }

  export const { rules, configs };
}

declare module "eslint-plugin-import" {
  interface Config {
    rules?: { [key: string]: any };
    settings?: { [key: string]: any };
    parser?: string;
    parserOptions?: { [key: string]: any };
  }

  interface ImportPlugin {
    meta: {
      name: string;
      version: string;
    };
    rules: { [key: string]: Rule };
  }

  export const rules: {
    "no-unresolved": Rule;
    named: Rule;
    default: Rule;
    namespace: Rule;
    "no-namespace": Rule;
    export: Rule;
    "no-mutable-exports": Rule;
    extensions: Rule;
    "no-restricted-paths": Rule;
    "no-internal-modules": Rule;
    "group-exports": Rule;
    "no-relative-packages": Rule;
    "no-relative-parent-imports": Rule;
    "consistent-type-specifier-style": Rule;
    "no-self-import": Rule;
    "no-cycle": Rule;
    "no-named-default": Rule;
    "no-named-as-default": Rule;
    "no-named-as-default-member": Rule;
    "no-anonymous-default-export": Rule;
    "no-unused-modules": Rule;
    "no-commonjs": Rule;
    "no-amd": Rule;
    "no-duplicates": Rule;
    first: Rule;
    "max-dependencies": Rule;
    "no-extraneous-dependencies": Rule;
    "no-absolute-path": Rule;
    "no-nodejs-modules": Rule;
    "no-webpack-loader-syntax": Rule;
    order: Rule;
    "newline-after-import": Rule;
    "prefer-default-export": Rule;
    "no-default-export": Rule;
    "no-named-export": Rule;
    "no-dynamic-require": Rule;
    unambiguous: Rule;
    "no-unassigned-import": Rule;
    "no-useless-path-segments": Rule;
    "dynamic-import-chunkname": Rule;
    "no-import-module-exports": Rule;
    "no-empty-named-blocks": Rule;
    "exports-last": Rule;
    "no-deprecated": Rule;
    "imports-first": Rule;
  };

  export const configs: {
    recommended: Config;
    errors: Config;
    warnings: Config;
    "stage-0": Config;
    react: Config;
    "react-native": Config;
    electron: Config;
    typescript: Config;
  };

  export const flatConfigs: {
    recommended: Config;
    errors: Config;
    warnings: Config;
    react: Config;
    "react-native": Config;
    electron: Config;
    typescript: Config;
  };
}

declare module "eslint-plugin-unused-imports" {
  export const rules: {
    "no-unused-vars": Rule;
    "no-unused-imports": Rule;
    "no-unused-vars-ts": Rule;
    "no-unused-imports-ts": Rule;
  };
}
