declare module "eslint-plugin-react-hooks" {
  import type { Rule } from "eslint";

  export const rules: {
    "rules-of-hooks": Rule.RuleModule;
    "exhaustive-deps": Rule.RuleModule;
  };
}

// index.d.ts
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
