/**
 * Shared JSX predicates used by the react-native rules.
 *
 * Ported from the accessibility helpers that were added to
 * `packages/eslint-plugin/lib/utils` in 2023 and never wired up, and from
 * `eslint-plugin-react-native` / `eslint-plugin-react-native-a11y` (both MIT).
 */

/** Minimal structural types: oxlint's AST is ESTree-compatible. */
interface JSXIdentifierLike {
  type: string;
  name?: string;
  object?: JSXIdentifierLike;
  property?: JSXIdentifierLike;
}

export interface JSXAttributeLike {
  type: string;
  name?: { name?: string };
  value?: unknown;
}

export interface JSXOpeningElementLike {
  type: string;
  name: JSXIdentifierLike;
  attributes: JSXAttributeLike[];
}

/**
 * The element name as written, e.g. `View` for `<View />` and
 * `Animated.View` for `<Animated.View />`.
 */
export const elementName = (node: JSXOpeningElementLike): string => {
  const { name } = node;

  if (name.type === "JSXMemberExpression") {
    const object = name.object?.name ?? "";
    const property = name.property?.name ?? "";

    return object && property ? `${object}.${property}` : property;
  }

  return name.name ?? "";
};

export const hasSpreadAttribute = (node: JSXOpeningElementLike): boolean =>
  node.attributes.some((attribute) => attribute.type === "JSXSpreadAttribute");

export const getAttribute = (
  node: JSXOpeningElementLike,
  attributeName: string,
): JSXAttributeLike | undefined =>
  node.attributes.find(
    (attribute) =>
      attribute.type === "JSXAttribute" &&
      attribute.name?.name === attributeName,
  );

export const hasAttribute = (
  node: JSXOpeningElementLike,
  attributeName: string,
): boolean => getAttribute(node, attributeName) !== undefined;

export const hasAnyAttribute = (
  node: JSXOpeningElementLike,
  attributeNames: string[],
): boolean => attributeNames.some((name) => hasAttribute(node, name));

/**
 * The default touchables, matching `eslint-plugin-react-native-a11y`'s
 * `util/isTouchable`. Deliberately name-based: upstream does not treat an
 * arbitrary component with an `onPress` prop as touchable, and diverging here
 * would make the rule report on elements ESLint accepts.
 */
const TOUCHABLE_ELEMENTS = new Set([
  "Touchable",
  "TouchableOpacity",
  "TouchableHighlight",
  "TouchableWithoutFeedback",
  "TouchableNativeFeedback",
  "TouchableBounce",
  "Pressable",
]);

export const isTouchable = (
  node: JSXOpeningElementLike,
  extraTouchables: string[] = [],
): boolean => {
  const name = elementName(node);

  return TOUCHABLE_ELEMENTS.has(name) || extraTouchables.includes(name);
};

export const isTextInput = (node: JSXOpeningElementLike): boolean =>
  elementName(node) === "TextInput";
