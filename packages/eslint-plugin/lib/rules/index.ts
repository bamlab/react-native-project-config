import { awaitUserEventRule } from "./await-user-event";
import { noAnimatedWithoutNativeDriverRule } from "./no-animated-without-native-driver";
import { preferUserEventRule } from "./prefer-user-event";
import { requireNamedEffectRule } from "./require-named-effect";

export default {
  "await-user-event": awaitUserEventRule,
  "prefer-user-event": preferUserEventRule,
  "require-named-effect": requireNamedEffectRule,
  "no-animated-without-native-driver": noAnimatedWithoutNativeDriverRule,
};
