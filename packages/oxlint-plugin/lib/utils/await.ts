/**
 * Helpers for the two rules that insert `await`.
 *
 * Both rules are `fixable`, so a wrong answer here does not merely misreport,
 * it rewrites the file. Two shapes have to be looked through:
 *
 * - optional chaining (`userEvent?.press()`) wraps the call in a
 *   `ChainExpression`, so the `AwaitExpression` is the grandparent;
 * - `prefer-user-event` reports on the member expression, so the call sits
 *   between it and any `await`.
 */

interface NodeLike {
  type: string;
  // `Program.parent` is `null`, so this is nullable as well as optional.
  parent?: NodeLike | null;
}

/** The nearest ancestor that is not a `ChainExpression`. */
const skipChain = (
  node: NodeLike | null | undefined,
): NodeLike | null | undefined =>
  node?.type === "ChainExpression" ? node.parent : node;

/** Whether `node`'s enclosing expression is already awaited. */
export const isAwaited = (node: NodeLike): boolean =>
  skipChain(node.parent)?.type === "AwaitExpression";

/**
 * Whether the call wrapping `node` (a callee) is already awaited, looking
 * through the call and any optional-chaining wrapper around it.
 */
export const isCallAwaited = (node: NodeLike): boolean => {
  const call = skipChain(node.parent);

  return call !== null && call !== undefined && isAwaited(call);
};
