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
