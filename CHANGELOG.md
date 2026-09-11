# Changelog

Notable work on this project, newest first. One line per change, with the date and
the commit it landed in (`uncommitted` when it has not been committed yet).
Kept up to date by Claude Code, see `~/.claude/rules/changelog.md`.

<!-- newest-first: insert new entries directly below this line -->

- `2026-09-11` Auto-remove unused imports in oxlint again with a `@bam.tech/no-unused-imports` rule (`312d015`)

- `2026-09-11` Fix oxlint-plugin preset scoping and three rule defects found by review (`393f368`)
- `2026-09-11` Fix double-await autofixes and truncated JSX member names in oxlint-plugin (`b60bb2a`)
- `2026-09-11` Make the oxlint integration harness fail loudly and pin its output format (`aedae37..82e9d58`)
- `2026-09-11` Require Node 22 for oxlint-plugin dev and document the `.mts` config constraint (`ba89308`)
- `2026-09-10` Lint example-app with oxlint alongside eslint (`84f4406`)
- `2026-09-10` Stop pinning legacy `moduleResolution: node` in @bam.tech/typescript-config (`05f8d14`)
- `2026-09-10` Add @bam.tech/oxlint-plugin: 9 rules, 4 presets, no ESLint plugin at lint time (`868f009`)
