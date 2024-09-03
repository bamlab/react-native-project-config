import { avoidIntlNumberFormatRule } from "./avoid-intl-number-format";
import { avoidReactNativeSvgImportRule } from "./avoid-react-native-svg";
import { awaitUserEventRule } from "./await-user-event";
import { noDifferentDisplaynameRule } from "./no-different-displayname";
import { noAnimatedWithoutNativeDriverRule } from "./no-animated-without-native-driver";
import { preferUserEventRule } from "./prefer-user-event";
import { requireNamedEffectRule } from "./require-named-effect";
import { noFlatListImportRule } from "./no-flatlist";

export default {
  "await-user-event": awaitUserEventRule,
  "prefer-user-event": preferUserEventRule,
  "require-named-effect": requireNamedEffectRule,
  "no-different-displayname": noDifferentDisplaynameRule,
  "no-animated-without-native-driver": noAnimatedWithoutNativeDriverRule,
  "avoid-intl-number-format": avoidIntlNumberFormatRule,
  "avoid-react-native-svg": avoidReactNativeSvgImportRule,
  "no-flatlist": noFlatListImportRule,
};
