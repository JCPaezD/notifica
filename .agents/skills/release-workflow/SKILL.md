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
- `package-lock.json` when version metadata changes
- `android/app/build.gradle`
- visible version text in `src/components/SideMenu.vue`
- launch/release documentation in:
  - `docs/dev/release-process.md`
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
- `package-lock.json` when package version metadata has been changed or will be changed
- `android/app/build.gradle`
- visible version text in `src/components/SideMenu.vue`
- relevant release process notes in `docs/dev/release-process.md`
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
- `package-lock.json` if the package version was updated
- `android/app/build.gradle`
- visible version text in `src/components/SideMenu.vue`

If `package.json` version changes, do not leave `package-lock.json` stale.
Regenerate or update it using the normal package-manager workflow instead of editing it manually.

Then review whether these documents must also change:

- `README.md`
- `docs/dev/release-process.md`
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

### Pull request review and branch protection

Keep the `develop` -> `main` pull request for release traceability, diff review,
status checks, and the final production decision. A project review of the diff
and a GitHub review approval are separate gates.

Before instructing the user to approve or merge a release pull request, inspect:

- the pull request author
- the required review count and other protection rules on `main`
- the checks and merge methods currently available

The pull request author cannot approve their own pull request. If branch
protection requires approvals, use one of these paths:

- an independent collaborator with review permission approves the pull request;
- in a solo-maintainer repository, preserve the pull request and its checks, but
  use an administrator bypass only after explicit user authorization immediately
  before the production merge.

Do not lower branch protection just for this release, create a second account
only to self-approve, or treat a comment review as an approval. When using the
solo-maintainer path, record the reason and verify that all other protection
requirements, including linear history and successful checks, remain satisfied.

### 7. Android release path

For Android release work:

- verify `versionCode`
- verify `versionName`
- confirm signing/release expectations from current project context
- treat Android Studio / bundle generation / Play Console steps as manual checkpoints unless the user explicitly asks for specific local commands

When relevant, the release path may include:

- build preparation
- `.aab` generation
- archived human-named `.aab` copy in `android/app/release/`
- review before upload
- Play Console upload/update
- production visibility decisions

After generating a release `.aab`, create a dated/versioned archival copy in `android/app/release/` using a human-readable filename before uploading it to Play Console.

Before Play Console submission, explicitly prepare:

- release notes
- visible release name when used
- initial publication regions

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
- bypass required pull request reviews automatically

## Versioning rules for this repo

Treat these as the release-facing version sources to review together:

- `package.json`
- `android/app/build.gradle`
- visible version text in `src/components/SideMenu.vue`

Also ensure `package-lock.json` remains aligned with `package.json` when the package version changes.

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
