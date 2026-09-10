import { awaitUserEventRule } from "./await-user-event.js";
import { hasAccessibilityHintRule } from "./has-accessibility-hint.js";
import { hasValidAccessibilityDescriptorsRule } from "./has-valid-accessibility-descriptors.js";
import { hasValidAccessibilityStateRule } from "./has-valid-accessibility-state.js";
import { noDifferentDisplaynameRule } from "./no-different-displayname.js";
import { noInlineStyleInArrayRule } from "./no-inline-style-in-array.js";
import { noRawTextRule } from "./no-raw-text.js";
import { preferUserEventRule } from "./prefer-user-event.js";
import { requireNamedEffectRule } from "./require-named-effect.js";

export const rules = {
  "await-user-event": awaitUserEventRule,
  "prefer-user-event": preferUserEventRule,
  "require-named-effect": requireNamedEffectRule,
  "no-different-displayname": noDifferentDisplaynameRule,
  "no-inline-style-in-array": noInlineStyleInArrayRule,
  "no-raw-text": noRawTextRule,
  "has-accessibility-hint": hasAccessibilityHintRule,
  "has-valid-accessibility-descriptors": hasValidAccessibilityDescriptorsRule,
  "has-valid-accessibility-state": hasValidAccessibilityStateRule,
};
