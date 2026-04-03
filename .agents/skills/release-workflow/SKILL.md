---
name: release-workflow
description: Prepare, validate, and close a release or launch-related update for this Notifica repository. Use when the user wants to align release scope, review versioning, prepare a PWA update, prepare an Android release with Capacitor and Play Console, update visible release metadata, or close a launch block with structured manual checkpoints. This skill is for release preparation and closure, not for ordinary feature implementation.
---

# Release Workflow

Use this skill for release-oriented work in `Notifica`.

This repository has a release flow that spans:

- PWA behavior and deployment
- Android versioning and build preparation
- visible version text in the app
- launch-facing documentation
- manual checkpoints in Vercel, Android Studio, and Play Console

Do not treat release work as a normal feature task.

## Core release context

Project shape:

- `main` is the live production PWA branch
- `develop` is the active working branch and development PWA branch
- Android is built from the same product via Capacitor

Current release-sensitive files usually include:

- `package.json`
- `android/app/build.gradle`
- visible version text in `src/components/SideMenu.vue`
- launch/release documentation in:
  - `docs/dev/Notifica-Roadmap.md`
  - `docs/dev/dev-notes.md`
  - `README.md` when user-facing information changes

## Release philosophy

Follow a controlled, manual-checkpoint workflow.

Always prefer:

- explicit scope review
- coherent versioning
- manual validation
- deliberate documentation updates

Never:

- assume release scope from stale docs alone
- automate past required human checkpoints blindly
- publish, tag, merge, or push unless explicitly requested
- mark the launch as closed before the user validates the outcome

## Workflow

### 1. Confirm the release target

Start by clarifying what kind of release work is actually needed:

- launch planning only
- release preparation without publication
- PWA-only update
- Android-only release preparation
- coordinated PWA + Android launch
- release closure after validation

Then review what really belongs to that release:

- recent implemented changes
- roadmap state
- dev-notes release context
- current branch state

If the current scope is unclear or documentation is stale, surface that before proceeding.

### 2. Review release state and version coherence

Before any release edits, inspect:

- `package.json`
- `android/app/build.gradle`
- visible version text in `src/components/SideMenu.vue`
- relevant release notes in `docs/dev/dev-notes.md`
- relevant launch tasks in `docs/dev/Notifica-Roadmap.md`

Check for mismatches such as:

- different visible version values
- documentation describing an older release state
- launch tasks marked or worded inconsistently with reality

Do not continue as if those mismatches were harmless.

### 3. Run the automatic checks that make sense

For web-facing release preparation, run the normal project checks when applicable:

- `npm run build`
- `npm run type-check`

If Android-facing changes are part of the task, also confirm what must be validated manually afterward:

- Capacitor sync/copy status
- Android Studio build path
- versionCode/versionName consistency
- install/update behavior in a real device or trusted test path

Do not pretend Android release validation is complete from web checks alone.

### 4. Prepare the manual checklist

Before closing a release block, provide a short manual checklist focused on the actual target.

Typical items:

- visible app version is correct
- PWA behavior is correct in production-like conditions
- Android behavior is correct in installed app conditions
- export/share/import flows still behave correctly
- release-facing wording and migration messaging are correct

If the task touches launch scope, migration prompts, or platform positioning, require manual review before closure.

### 5. Update release metadata and visible documentation

When a release or launch update is being prepared, update the relevant metadata deliberately:

- `package.json`
- `android/app/build.gradle`
- visible version text in `src/components/SideMenu.vue`

Then review whether these documents must also change:

- `README.md`
- `docs/dev/dev-notes.md`
- `docs/dev/Notifica-Roadmap.md`

Rules:

- do not hand-wave mismatched versions
- do not leave visible version text stale
- do not silently publish with outdated launch-facing docs

### 6. PWA release path

For PWA release work:

- confirm the intended relationship between `develop` and `main`
- confirm whether the task is:
  - preparing the merge
  - validating the merge candidate
  - or closing a PWA release after merge
- treat `main` as live production
- verify that the release-facing PWA state is coherent before considering the task closed

Remember:

- Vercel production is tied to `main`
- `develop` is used for the development/testing PWA flow

### 7. Android release path

For Android release work:

- verify `versionCode`
- verify `versionName`
- confirm signing/release expectations from current project context
- treat Android Studio / bundle generation / Play Console steps as manual checkpoints unless the user explicitly asks for specific local commands

When relevant, the release path may include:

- build preparation
- `.aab` generation
- review before upload
- Play Console upload/update
- production visibility decisions

Do not claim Android release completion without the user-confirmed manual steps.

### 8. Stop for human validation

Always stop before treating release work as closed when the task affects:

- public versioning
- PWA production behavior
- Android release behavior
- Play Console release state
- migration messaging
- launch-facing documentation

At this point, report:

- what was prepared
- what was checked automatically
- what still needs manual validation
- what should happen next

### 9. Close the release only when explicitly requested

Only if the user explicitly asks to close the release workflow:

- prepare final documentation updates
- prepare release notes if needed
- prepare the release commit if requested
- prepare merge/tag/push steps if requested

Do not:

- create commits automatically
- tag automatically
- merge automatically
- push automatically

## Versioning rules for this repo

Treat these as the release-facing version sources to review together:

- `package.json`
- `android/app/build.gradle`
- visible version text in `src/components/SideMenu.vue`

If they intentionally differ, explain why.

If they should match for the target release, make them match deliberately.

## Documentation rules during release work

Use real implementation state as the source of truth, but keep documentation aligned.

When updating docs:

- preserve the distinction between launch scope and post-launch backlog
- avoid leaving stale release wording in place
- do not mark roadmap tasks as completed before human validation when visible behavior still needs checking

## Output expectations

When finishing a release-workflow task, report briefly:

- release target handled
- files reviewed or modified
- automatic checks performed
- manual checks still required
- assumptions made
- whether the release block is prepared, in validation, or truly closed
