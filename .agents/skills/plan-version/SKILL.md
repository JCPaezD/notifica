---
name: plan-version
description: Build, adjust, or reorganize Notifica roadmap blocks, internal work blocks, and version plans from captured or refined items. Use when Codex needs to decide what belongs in a version or fortification block, choose roadmap placement, move backlog items, reorder priorities, create macro-slices for an approved block, clarify roadmap structure, or document an approved planning decision. Skip for already placed small changes that can safely move to design or implementation.
---

# Plan Version

Use this skill to turn candidate items into a coherent work block or roadmap adjustment.

`Version` may mean a public product version, a patch, a stabilization pass, or an internal block such as `v1.3.x Fortificacion tecnica`.

See `.agents/workflow.md` for the shared workflow map.

## Core Rules

When using this skill:

- plan at block level, not implementation level
- decide what enters now, what moves, and what stays out
- keep selected scope coherent and realistic
- explain why included items belong together
- explain why excluded or moved items should wait
- create macro-slices for real work blocks before implementation resumes
- make the next workflow step explicit

Do not turn planning into technical design.

## Boundaries

Use this skill for placement, scope, grouping, ordering, and macro-slicing.

Macro-slicing means selected areas, includes/excludes, general order, strong dependencies, and next step per slice. It does not mean executable implementation tasks.

Use `design-spec` after this skill for selected slices that need behavior or technical design. Use `breakdown-feature` after design when a slice is too large, mixed, or risky for one clean implementation pass.

## Output Format

Return the main result in normal markdown.

Use Spanish for conversation output when the user is working in Spanish. Keep roadmap text in the target file's established language.

**Version**
- <name or working label>

**Goal**
- what this block is trying to achieve

**Includes**
1. <item>
2. <item>

**Moves**
- <item> -> from <block> to <block>

**Excludes**
- <item> -> why not now

**Order**
1. <item or block>
2. <item or block>

**Macro-Slices**
- <slice> -> next step: design-spec | breakdown-feature | implement-feature | backlog

**Justification**
- short rationale

**Risks**
- only real risks

**Dependencies**
- explicit dependencies if they matter

**Open Questions**
- only if they materially affect the plan

**Next Step**
- refine-item | design-spec | breakdown-feature | document-now | implement-feature

## Documentation Rule

This skill may update documentation when the user approves the planning decision.

Use:

- `docs/dev/Notifica-Roadmap.md` for public roadmap or backlog changes
- `../notifica_docs/` for private living plans, internal strategy, raw analysis, or plans not yet ready for public project documentation
- `docs/dev/dev-notes.md` only when the planning discussion establishes a stable process or decision rule

When updating roadmap docs, prefer operational roadmap edits over long planning prose.

## Documentation Layering For Notifica

Keep the public roadmap and private planning deliberately separate. Before the
first planning edit for a new version, inspect the repository's current
roadmap and the relevant private planning references, especially:

- `../notifica_docs/planning/README.md`
- the closest previous private operational plan
- `docs/dev/archive/roadmap-history.md` when backlog movement or a prior version
  pattern matters

Use the layers this way:

- `docs/dev/Notifica-Roadmap.md`: public operational placement only. When a
  version is approved, add its current heading and move the selected backlog
  items under it. Do not copy private macro-slices, detailed exclusions,
  alternatives, privacy reasoning, technical contracts, or implementation
  design into the roadmap.
- `../notifica_docs/planning/`: detailed living version plan. Keep the goal,
  included and excluded scope, alternatives, dependencies, macro-slices,
  decisions, open questions, validation boundaries, and release relationship
  here.
- private checklist: track validation and closure for the selected version;
  do not reuse a closed release checklist for a new version.
- `docs/dev/dev-notes.md`: record only stable process or project decisions that
  should remain current, not the full private plan.

Follow this order:

1. Refine ambiguous items before placing them.
2. Prepare the detailed version plan privately and obtain approval for the
   macro scope.
3. Update the private plan/checklist with the approved decision.
4. Update the public roadmap with the concise operational backlog movement.
5. Use `design-spec` for the behavior and contracts of each selected slice;
   use `breakdown-feature` only after design when a slice needs further task
   decomposition.

During iterative planning, preserve every item already accepted into the
candidate scope, including cross-cutting tests, refactors, tooling, and
validation work. Reclassify or remove an accepted item only with an explicit
scope decision; do not lose it merely because later discussion focuses on a
different slice. Planning decides placement and boundaries, not the technical
design of each slice.
