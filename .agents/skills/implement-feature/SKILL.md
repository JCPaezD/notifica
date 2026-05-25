---
name: implement-feature
description: Use this skill when implementing or modifying features, fixes, UI behavior, release-related behavior, or structured refactors in this repository. It enforces the project's architecture rules, documentation-first workflow, launch-scope caution, and Git practices. Do not use for pure diagnosis tasks or trivial text-only edits with no behavioral impact.
---

# Implement Feature Skill

This skill defines the standard workflow for implementing features and non-trivial fixes in this repository.

Use it whenever a task involves:

- implementing a new feature
- modifying existing behavior
- extending UI functionality
- adjusting platform-specific behavior
- changing release-visible behavior
- performing a structured refactor tied to product behavior

Use `.agents/workflow.md` to confirm whether implementation is really the next safe step.

Do not use it for:

- pure diagnosis without implementation
- trivial formatting changes
- tiny documentation-only edits
- obvious single-line fixes with no meaningful architectural or UX impact
- raw notes or mixed feedback that should first use `capture-item`
- unclear captured items that should first use `refine-item`
- roadmap placement or version/block planning that should first use `plan-version`
- selected work that still needs behavior or technical design through `design-spec`
- designed work that is too large or risky and should first use `breakdown-feature`

## Project context

This repository is `Notifica`.

Main stack:

- Vue 3
- TypeScript
- Vite
- Tailwind CSS
- Capacitor Android
- PWA deployment on Vercel
- local persistence
- vue-i18n

Core product shape:

- production PWA in `main`
- active working branch in `develop`
- Android app built from the same product surface

The project is in a controlled launch-return phase.

Favor:

- clarity
- reuse
- scope control
- clean closure

Do not quietly turn a launch task into a broad redesign or speculative refactor.

## Required reading before implementation

Before implementing anything non-trivial:

1. Inspect the repository structure.
2. Read the relevant parts of:
   - `docs/dev/Notifica-Roadmap.md`
   - `docs/dev/dev-notes.md`
3. Check the current implementation path in the repo before deciding how to change it.

If the task affects release flow, versioning, Android behavior, PWA behavior, migration messaging, or user-visible scope, treat the documentation as required context, not optional context.

## Architecture rules

Always reuse the existing architecture.

Never:

- duplicate platform handling logic
- create a parallel release/versioning path
- introduce a second notification system if the existing one can be extended
- create a second theming or i18n path
- add alternate state sources when the current source of truth is sufficient
- invent new structure without checking current patterns first

Respect the current project shape:

- components in `src/components/`
- composables in `src/composables/`
- shared values in `src/constants/`
- utilities in `src/utils/`
- locales in `src/locales/`
- project docs in `docs/dev/`

## Implementation workflow

Follow this process:

1. Confirm from `.agents/workflow.md` that the task is ready for implementation.
2. Inspect relevant files and understand the current implementation.
3. Confirm how the change fits the documented scope and architecture.
4. Reuse existing services, composables, components, and styling patterns whenever possible.
5. Implement the minimal coherent change required.
6. Run relevant checks when applicable.
7. Stop for human validation when the change affects visible behavior that benefits from manual review.
8. Update documentation only when the change is validated or when the task is explicitly documentation-first.

## UI and behavior consistency

When implementing UI or interaction changes:

- follow the existing Vue component structure
- follow the current Tailwind patterns already used in the repo
- preserve consistency across:
  - PWA
  - Android native
  - desktop browser where relevant
- check whether the same behavior also appears in:
  - translations
  - dark mode
  - version-visible UI
  - export/share flows

Avoid introducing a local fix that leaves the other supported surfaces inconsistent unless the task is explicitly scoped that way.

## Documentation-first and release caution

When a task affects:

- launch scope
- roadmap status
- release behavior
- version visibility
- Android / PWA product positioning

do not silently follow stale documentation and do not silently ignore it.

Instead:

- align the implementation with the current agreed scope
- update documentation deliberately when appropriate
- surface mismatches when the intended behavior is unclear

## Assumptions tracking

When implementing a feature:

- identify only meaningful assumptions:
  - behavior decisions not explicitly defined
  - fallback strategies
  - heuristics or thresholds
  - non-obvious UX decisions
  - platform-specific tradeoffs
- do not track trivial implementation details
- collect assumptions during implementation and report them in the final summary

Use this format:

- `[assumption]` short description
  `impact: low | medium | high`
  `revisitable: yes | no`

If an assumption matters long-term, update `docs/dev/dev-notes.md` selectively instead of leaving it implicit.

## Stall detection and escalation

If implementation does not converge after a small number of reasonable attempts:

- do not keep applying speculative fixes
- do not widen scope blindly
- do not continue trial-and-error without new evidence

Instead:

1. Stop making further code changes.
2. Analyze why the attempts failed.
3. Explain the likely cause of failure.
4. Explicitly state that the task now requires root-cause debugging.

Then switch to the debugging workflow instead of continuing to patch blindly.

## Validation gate

Manual validation takes precedence over autonomous closure.

If a task affects:

- UI
- UX
- wording visible to users
- interaction flow
- layout
- Android behavior
- PWA behavior
- visible versioning
- release-related flows

do not treat the task as fully closed immediately after implementation.

In these cases:

- stop after implementation plus relevant automated checks
- present the result for manual validation
- wait for explicit confirmation before treating the work as fully closed

Do not mark roadmap items as completed and do not finalize release-facing documentation before that validation unless the user explicitly asks for documentation-first work.

## Git workflow

Do not create commits automatically unless explicitly instructed.

Leave changes uncommitted for manual review.

Keep all mutating Git operations sequential.

Do not push, tag, or merge unless explicitly requested.

## Output expectations

When finishing implementation, report briefly:

- files modified
- key decisions taken
- assumptions made
- verification steps performed
- whether manual validation is still pending
