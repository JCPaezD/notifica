# Project Instructions

## Project context

- This repository is `Notifica`, a Vue 3 + TypeScript + Vite application with Tailwind CSS.
- The product ships in two closely related forms:
  - PWA deployed on Vercel
  - Android app built with Capacitor
- `main` is the production branch for the live PWA used by real users.
- `develop` is the working branch and the basis for the development PWA used for testing.
- `docs/dev/Notifica-Roadmap.md` and `docs/dev/dev-notes.md` are core project documents and must be treated as working sources of truth for scope, release flow, and known technical decisions.

## Shell and command execution

- The shared environment is Windows PowerShell.
- Do not use `&&` as a command separator.
- Prefer running commands in separate steps when order matters.
- Use parallel command execution only for read-only inspection tasks.

## Documentation and planning discipline

- Before implementing any non-trivial feature, fix, release task, or behavior change, read the relevant parts of:
  - `docs/dev/Notifica-Roadmap.md`
  - `docs/dev/dev-notes.md`
- If the change affects public-facing behavior, release flow, versioning, platform differences, or launch scope, review the documentation first and align the work with it.
- If the documentation is clearly outdated, do not silently ignore it. Update it deliberately as part of the task, or stop and clarify the mismatch.

## Branch and release awareness

- Treat `main` as a live production branch, not as a disposable integration branch.
- Treat `develop` as the active working branch for ongoing changes unless the user explicitly asks otherwise.
- Do not make assumptions about release closure from code alone when the task touches:
  - PWA deployment
  - Android release flow
  - Play Console preparation
  - visible app versioning
- When release-related work is requested, verify the current state in:
  - `package.json`
  - `android/app/build.gradle`
  - visible version text in the UI
  - relevant documentation blocks in `docs/dev/dev-notes.md` and `docs/dev/Notifica-Roadmap.md`

## Git safety

- Never run mutating Git commands in parallel.
- Keep `git add`, `git commit`, `git tag`, `git merge`, and `git push` strictly sequential.
- Wait for each Git command to finish before starting the next one.
- Do not create commits, tags, merges, or pushes unless the user explicitly asks for them.
- Do not treat `main` updates as routine. If a task would affect `main`, ensure the user intent is explicit.

## Validation and closure

- If a change affects UI, UX, layout, dialogs, interaction flow, wording visible to users, or cross-platform behavior, stop for human validation before treating the task as closed.
- If a change affects Android behavior, PWA behavior, version visibility, release preparation, or migration messaging, stop for human validation before marking release-related documentation or roadmap items as completed.
- Do not mark roadmap items as completed or prepare final closure docs before that validation.

## Editing discipline

- Avoid competing writes to the same file or resource.
- Re-read files before critical edits when there is any chance they changed during the task.
- If an editing approach fails repeatedly, stop retrying variants of the same patch and switch to a more deterministic edit strategy.
- Prefer clear block-level edits over fragile micro-patches when changing central logic or long documentation sections.

## Repo-specific implementation rules

- Reuse the existing component, composable, utility, and styling patterns before introducing new structures.
- Do not create parallel systems for platform handling, version display, theming, notifications, or release metadata if an existing path already exists.
- Respect the current app architecture:
  - Vue components in `src/components/`
  - reusable composables in `src/composables/`
  - shared constants and utilities in `src/constants/` and `src/utils/`
  - project documentation under `docs/dev/`
- For changes touching text, i18n, dark mode, Android integration, or release flow, check whether the behavior is already documented before deciding anything new.

## Launch-phase caution

- This project is in a controlled return-to-launch phase.
- Favor scope clarity and clean closure over opportunistic expansion.
- It is acceptable to include a clearly valuable improvement if it is well understood, low-friction, and does not reopen the project scope significantly.
- Do not silently escalate a launch task into a broad refactor or a redesign pass.
