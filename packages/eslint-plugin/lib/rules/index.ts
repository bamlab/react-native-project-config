import { awaitUserEventRule } from "./await-user-event";
import { preferUserEventRule } from "./prefer-user-event";
import { requireNamedEffectRule } from "./require-named-effect";

export default {
  "await-user-event": awaitUserEventRule,
  "prefer-user-event": preferUserEventRule,
  "require-named-effect": requireNamedEffectRule,
};
