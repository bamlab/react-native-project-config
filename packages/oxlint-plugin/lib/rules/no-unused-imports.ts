/**
 * @fileoverview Removes imports that are never used
 * @author BAM
 */
import type { ESTree, Range, Rule } from "@oxlint/plugins";

/**
 * The native `no-unused-vars` already reports unused imports, but with no safe
 * fix: its import-removing fix is registered as a *suggestion*, so `oxlint
 * --fix` skips it and only `--fix-suggestions` applies it. That flag is
 * all-or-nothing across every rule, and the other suggestions it would apply
 * delete `console.log` calls and rewrite interfaces, so it cannot be turned on
 * just for imports. This rule carries the same fix as a safe one, which
 * restores the `unused-imports/no-unused-imports` behaviour of the ESLint
 * config.
 *
 * The duplicate diagnostic with `no-unused-vars` is not new: the ESLint config
 * reported unused imports twice too, once from
 * `unused-imports/no-unused-imports` and once from
 * `@typescript-eslint/no-unused-vars`.
 */

/** One contiguous stretch of source to delete, and the bindings it holds. */
interface Removal {
  /** Reported at this node, so the diagnostic lands on the first binding. */
  node: ESTree.Node;
  names: string[];
  range: Range;
}

export const noUnusedImportsRule: Rule = {
  meta: {
    type: "problem",
    docs: {
      description: "Disallow imports that are never used, and remove them",
    },
    messages: {
      unusedImport:
        "'{{names}}' is imported but never used. It has been removed.",
    },
    schema: [],
    fixable: "code",
  },

  create(context) {
    const { sourceCode } = context;

    /**
     * `_`-prefixed bindings are the conventional "deliberately unused" marker,
     * and the native `no-unused-vars` ignores them. Reporting them here would
     * make `oxlint --fix` rewrite code that `oxlint` itself calls clean.
     */
    const isDeliberatelyUnused = (name: string): boolean =>
      name.startsWith("_");

    /** The first offset at or after `from` that is not a space or a tab. */
    const skipSpaces = (from: number): number => {
      const { text } = sourceCode;
      let cursor = from;
      while (text[cursor] === " " || text[cursor] === "\t") cursor++;
      return cursor;
    };

    /**
     * Whitespace up to and including the line break that follows `end`. It
     * stops at the first non-whitespace character, so a trailing comment or a
     * second statement on the same line keeps both itself and the line break.
     */
    const throughEndOfLine = (end: number): number => {
      const { text } = sourceCode;
      let cursor = skipSpaces(end);
      if (text[cursor] === "\r") cursor++;
      if (text[cursor] === "\n") cursor++;
      return cursor;
    };

    /**
     * The start of `from`'s indentation, when only whitespace precedes it on
     * its line. `null` when something else shares the line.
     */
    const lineStartBefore = (from: number): number | null => {
      const { text } = sourceCode;
      let cursor = from;
      while (
        cursor > 0 &&
        (text[cursor - 1] === " " || text[cursor - 1] === "\t")
      )
        cursor--;
      return cursor === 0 || text[cursor - 1] === "\n" ? cursor : null;
    };

    const localName = (specifier: ESTree.ImportDeclarationSpecifier): string =>
      specifier.local.name;

    /** The local bindings of `node` that nothing references. */
    const unusedNames = (node: ESTree.ImportDeclaration): Set<string> =>
      new Set(
        sourceCode
          .getDeclaredVariables(node)
          .filter(
            (variable) =>
              variable.references.length === 0 &&
              !isDeliberatelyUnused(variable.name),
          )
          .map((variable) => variable.name),
      );

    /**
     * Removals for the unused specifiers of one comma-separated group: the
     * braced list, or the default/namespace pair before it. Each maximal run of
     * adjacent unused specifiers becomes one removal, because oxlint applies a
     * single pass of non-touching fixes — two removals that met at a shared
     * comma would cost a second `oxlint --fix`.
     *
     * A run takes exactly the one comma that joined it to the rest: the
     * following one when the run starts the group, the preceding one otherwise.
     * `{ a, b }` minus `b` must not leave `{ a, }`.
     */
    const groupRemovals = (
      group: ESTree.ImportDeclarationSpecifier[],
      unused: Set<string>,
    ): Removal[] => {
      const removals: Removal[] = [];

      for (let index = 0; index < group.length; index++) {
        if (!unused.has(localName(group[index]!))) continue;

        const first = index;
        while (
          index + 1 < group.length &&
          unused.has(localName(group[index + 1]!))
        )
          index++;
        const run = group.slice(first, index + 1);
        const names = run.map(localName);
        const head = run[0]!;
        const tail = run[run.length - 1]!;

        if (first > 0) {
          const comma = sourceCode.getTokenBefore(head as never);
          removals.push({
            node: head,
            names,
            range:
              comma?.value === ","
                ? [comma.start, tail.end]
                : [head.start, tail.end],
          });
          continue;
        }

        const comma = sourceCode.getTokenAfter(tail as never);
        if (comma?.value !== ",") {
          removals.push({ node: head, names, range: [head.start, tail.end] });
          continue;
        }

        // A run that owns its lines, as in a multi-line import, takes them
        // whole. Removing only `A,` would leave the indentation behind as a
        // blank line.
        const lineStart = lineStartBefore(head.start);
        const throughLine = throughEndOfLine(comma.end);
        if (lineStart !== null && throughLine > skipSpaces(comma.end)) {
          removals.push({ node: head, names, range: [lineStart, throughLine] });
          continue;
        }

        // Otherwise the whitespace after the comma goes too, or `{ a, b }`
        // minus `a` leaves `{  b }`.
        removals.push({
          node: head,
          names,
          range: [head.start, skipSpaces(comma.end)],
        });
      }

      return removals;
    };

    /**
     * Every named import is unused but a default or namespace one survives: the
     * braces have to go with them, or `import a, {} from "x"` is left behind.
     */
    const bracesRemoval = (
      braced: ESTree.ImportDeclarationSpecifier[],
    ): Removal => {
      const head = braced[0]!;
      const tail = braced[braced.length - 1]!;
      const openBrace = sourceCode.getTokenBefore(head as never);
      const closeBrace = sourceCode.getTokenAfter(tail as never);
      const comma = openBrace
        ? sourceCode.getTokenBefore(openBrace as never)
        : null;

      return {
        node: head,
        names: braced.map(localName),
        range: [
          comma?.value === "," ? comma.start : (openBrace?.start ?? head.start),
          closeBrace?.end ?? tail.end,
        ],
      };
    };

    /**
     * Fuse removals that meet, so a block of wholly unused imports goes in one
     * `oxlint --fix`. Each statement's removal ends where the next one starts,
     * and oxlint drops a fix that touches one it has already applied.
     */
    const fuseTouching = (removals: Removal[]): Removal[] => {
      const sorted = [...removals].sort((a, b) => a.range[0] - b.range[0]);
      const fused: Removal[] = [];

      for (const removal of sorted) {
        const previous = fused[fused.length - 1];
        if (previous && removal.range[0] <= previous.range[1]) {
          previous.names.push(...removal.names);
          previous.range = [
            previous.range[0],
            Math.max(previous.range[1], removal.range[1]),
          ];
          continue;
        }
        fused.push({ ...removal, names: [...removal.names] });
      }

      return fused;
    };

    return {
      /**
       * Driven from `Program` rather than an `ImportDeclaration` visitor: the
       * removals have to be known together before any is reported, so the
       * touching ones can be fused.
       */
      Program(program) {
        const removals: Removal[] = [];

        for (const statement of program.body) {
          if (statement.type !== "ImportDeclaration") continue;
          // `import "./side-effect";` declares nothing and must be kept.
          if (statement.specifiers.length === 0) continue;

          const unused = unusedNames(statement);
          if (unused.size === 0) continue;

          const isUnused = (specifier: ESTree.ImportDeclarationSpecifier) =>
            unused.has(localName(specifier));
          if (statement.specifiers.every(isUnused)) {
            removals.push({
              node: statement,
              names: statement.specifiers.map(localName),
              range: [statement.start, throughEndOfLine(statement.end)],
            });
            continue;
          }
          if (!statement.specifiers.some(isUnused)) continue;

          // The braced group and the default/namespace group are punctuated
          // separately, so a run is per group.
          const braced = statement.specifiers.filter(
            (specifier) => specifier.type === "ImportSpecifier",
          );
          const bare = statement.specifiers.filter(
            (specifier) => specifier.type !== "ImportSpecifier",
          );

          removals.push(...groupRemovals(bare, unused));
          removals.push(
            ...(braced.length > 0 && braced.every(isUnused)
              ? [bracesRemoval(braced)]
              : groupRemovals(braced, unused)),
          );
        }

        for (const removal of fuseTouching(removals))
          context.report({
            node: removal.node,
            messageId: "unusedImport",
            data: { names: removal.names.join("', '") },
            fix: (fixer) => fixer.removeRange(removal.range),
          });
      },
    };
  },
};
