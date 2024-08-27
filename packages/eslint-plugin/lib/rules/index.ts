import { awaitUserEventRule } from "./await-user-event";
import { noDifferentDisplaynameRule } from "./no-different-displayname";
import { preferUserEventRule } from "./prefer-user-event";
import { requireNamedEffectRule } from "./require-named-effect";

export default {
  "await-user-event": awaitUserEventRule,
  "prefer-user-event": preferUserEventRule,
  "require-named-effect": requireNamedEffectRule,
  "no-different-displayname": noDifferentDisplaynameRule,
};
