# Codex Workflow Map

This document maps the repo-local workflow skills for Notifica.

Use the latest safe step in the workflow. Do not force every task through the full chain.

## Core Flow

Typical maximum flow:

`capture-item -> refine-item -> plan-version -> design-spec -> breakdown-feature -> implement-feature`

Skip steps when the input is already clear enough:

- raw notes, mixed feedback, loose ideas -> `capture-item`
- captured item with meaningful ambiguity -> `refine-item`
- roadmap, version, priority, block, or scope placement -> `plan-version`
- selected item that needs behavior or technical design -> `design-spec`
- designed work too large or risky for one implementation pass -> `breakdown-feature`
- clear code, UI, behavior, or documentation change -> `implement-feature`
- unclear or persistent bug diagnosis -> `debug-root-cause`
- versioning, build, PWA, Android, Play Console, or release closure -> `release-workflow`

## Skill Boundaries

### Capture vs Refine

`capture-item` answers: what is here, what should be preserved, and what is the next safe step?

`refine-item` answers: this item already exists, but what exactly does it mean?

Use `capture-item` for chaotic input. Use `refine-item` only when the item is recognizable but still blocked by unclear scope, intent, included/excluded behavior, or important edge cases.

### Refine vs Design

`refine-item` defines the problem or item.

`design-spec` defines the solution shape.

Switch to `design-spec` once the conversation starts deciding behavior, architecture, components, contracts, implementation rules, or durable edge cases.

### Plan vs Design

`plan-version` decides what belongs where and when.

`design-spec` prepares one selected item or slice for implementation.

Use `plan-version` for priority, roadmap placement, version scope, grouping, ordering, and what should wait. Use `design-spec` when the selected item is already placed and the question is how it should work.

### Plan vs Breakdown

`plan-version` owns macro-slicing for real versions or work blocks:

- selected areas or slices
- includes and excludes
- general order
- strong dependencies
- next step per slice

`breakdown-feature` owns executable task slicing after there is enough design clarity.

## Notifica Documentation Surfaces

Use the correct documentation surface:

- `docs/dev/Notifica-Roadmap.md`: public project roadmap, release blocks, planned product work, and durable backlog placement.
- `docs/dev/dev-notes.md`: current durable decisions and documentation navigation.
- `docs/dev/architecture.md`: architecture, known structural debt, and refactor direction.
- `docs/dev/maintenance.md`: local workflow, validation, checks, and repo maintenance.
- `docs/dev/release-process.md`: PWA and Android release/versioning process.
- `docs/dev/i18n.md`: translation workflow and text management.
- `docs/dev/known-issues.md`: known bugs, platform caveats, and deferred issues.
- `../notifica_docs/`: private product notes, strategy, internal plans, raw analysis, and living plans that should not affect the public repo yet.

Do not write private planning material into the public repo unless the user explicitly decides it should become public project documentation.

### Version Planning Documentation Layers

For a new version or work block, preserve the historical project layering:

- the public roadmap defines the current operational phase and moves selected
  backlog items under the approved version heading;
- the private planning area develops the scope, alternatives, exclusions,
  macro-slices, dependencies, decisions, and validation boundaries;
- a private checklist tracks the selected version's verification and closure;
- `design-spec` defines the behavior and contracts of a selected slice only
  after the version scope is approved.

Do not put private macro-slices, detailed exclusions, technical contracts,
privacy decisions, or implementation design into the public roadmap. When the
scope is still being discussed, leave the roadmap's version placement
unchanged. During iteration, preserve accepted cross-cutting work such as
tests, refactors, tooling, and validation unless the user explicitly moves it
out of scope.

## Documentation Rules

Keep documentation aligned with the real repo state.

Propose or apply documentation updates when work changes:

- architecture
- persistence or data contracts
- PWA or Android behavior
- release or versioning process
- UX rules or stable interaction behavior
- workflow rules
- roadmap scope or status

For UI, UX, layout, dialogs, interaction flow, Android behavior, PWA behavior, or release-related behavior, stop for human validation before treating roadmap closure or final release documentation as complete.

## Android Tooling

Android CLI and selected official Android skills are available for Android-specific work:

- `android-cli`: use for Android CLI commands, SDK inspection, device interaction, deployment, and environment diagnostics.
- `edge-to-edge`: use as a reference/checklist for Android system bars, insets, and edge-to-edge investigations. Notifica uses Capacitor/WebView, so do not apply Compose migration steps directly.
- `testing-setup`: use as a reference for native Android testing strategy. Keep the default Notifica test stack in Vue/Vitest/Playwright unless Android-specific automation is explicitly designed.
- `adaptive`: use as a reference for future Android large-screen/adaptive UI thinking. Do not infer that Notifica should migrate to Compose, Navigation 3, or native Android UI.

Do not install additional Android skills, CLIs, MCP servers, or IDE automation inside this workflow map without a separate review of:

- fit with Notifica's Capacitor Android workflow
- setup cost
- local safety and permissions
- repeatable value for build, emulator, ADB, or Android Studio tasks

## Conversation Language

When a skill returns a workflow result only for conversation review, write it in the user's conversation language. For this project, default to Spanish when the user is working in Spanish.

Keep persistent repository artifacts in the language already established by the target file. Code-facing docs and repo-local workflow files are usually English unless the target file is already Spanish.

## Output Discipline

Each skill should stop as soon as its output is sufficient for the next safe step.

Avoid process inflation:

- do not capture what is already clear
- do not refine for polish
- do not plan what is already placed
- do not design obvious local changes
- do not break down work that fits one clean implementation pass
