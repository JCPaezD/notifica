---
name: refine-item
description: Clarify already captured or documented Notifica items only when meaningful ambiguity blocks the next safe step. Use to tighten scope, intent, included and excluded behavior, important edge cases, assumptions, and simplifications before roadmap placement, design, debugging, or implementation. Skip when capture already made the item clear enough for planning, design, backlog, closure, or implementation.
---

# Refine Item

Use this skill to make an existing item precise enough to route safely.

The goal is not to design the implementation. The goal is to clarify what the item means.

See `.agents/workflow.md` for the shared workflow map.

## Core Rules

When using this skill:

- work from an already captured or documented item
- focus only on ambiguity that affects meaning, scope, or follow-up
- clarify what is included and excluded
- expose meaningful assumptions
- identify edge cases only when they affect scope or risk
- propose simplifications when they keep the value and reduce complexity
- end with a clear `Next Step`

Do not refine for polish.

## Boundaries

Use this skill to define the item, not the solution.

Exploratory design is allowed only when it helps validate the item's meaning or likely scope. Switch to `design-spec` once the work starts deciding behavior, architecture, components, contracts, or implementation rules.

## Output Format

Return the main result in normal markdown.

Use Spanish for conversation output when the user is working in Spanish. Keep persistent documentation text in the target file's established language.

**Refined Item**
- Type: feature | bug | improvement | idea | question
- Title: <clear title>

**Clarified Scope**
- includes
- excludes

**Resolved Ambiguities**
- ambiguity -> clarification

**Edge Cases**
- only important edge cases

**Simplifications**
- proposed simplification if useful

**Assumptions**
- only assumptions that affect the item definition

**Open Points**
- only if something still blocks certainty

**Next Step**
- close | plan-version | design-spec | debug-root-cause | implement-feature | backlog

## Documentation Rule

This skill is conversation-first by default.

Update tracked documentation only when:

- the item already exists in docs
- refinement materially changes its meaning or scope
- the user approves the update

Use `docs/dev/Notifica-Roadmap.md`, `docs/dev/dev-notes.md`, or `../notifica_docs/` according to the documentation surfaces in `.agents/workflow.md`.
