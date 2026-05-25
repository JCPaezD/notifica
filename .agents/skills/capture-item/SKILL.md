---
name: capture-item
description: Convert raw or mixed Notifica development notes, informal feedback, unclear bug reports, small doubts, feature ideas, and loosely written change requests into clear structured workflow items. Use when Codex needs to capture chaotic input, split mixed points, classify them, preserve useful context, suggest the next workflow step, close trivial points, or register approved items so they are not lost. Skip when the item is already clear enough for planning, design, debugging, implementation, or release workflow.
---

# Capture Item

Use this skill to turn messy input into a small number of clear, useful items.

The goal is to avoid losing notes, reduce ambiguity early, and route each point to the next safe workflow step.

See `.agents/workflow.md` for the shared workflow map.

## Core Rules

When using this skill:

- identify whether the input contains one item or multiple items
- split items only when there is a real difference in goal, problem, or follow-up
- classify each item clearly
- preserve important context without copying noise
- assign an explicit `Next Step`
- avoid premature design or implementation planning
- use the latest safe next step instead of forcing the full workflow chain

Do not over-structure weak notes into fake precision.

## Boundaries

Use this skill for intake, not final clarification.

This skill may include light clarification only to decide whether a note is real, worth preserving, or ready to route. Stop before deciding technical behavior, architecture, components, contracts, or executable tasks.

Do not automatically route to `refine-item` after capture. Route there only when meaningful ambiguity blocks planning or design.

## Output Format

Return the main result in normal markdown, not in a fenced code block unless literal formatting is required.

Use Spanish for conversation output when the user is working in Spanish. Keep persistent documentation text in the target file's established language.

For structured items, use:

**Type**
- feature | bug | improvement | idea | question

**Title**
- short and clear

**Description**
- context
- observed problem or idea

**Impact**
- user | technical | workflow | mixed

**Notes**
- relevant observations

**Next Step**
- close | refine-item | plan-version | design-spec | debug-root-cause | implement-feature | backlog | document-now

## Documentation Rule

Do not let non-trivial notes disappear.

If the result is clear enough to preserve and the user approves documenting it, update the relevant destination:

- `docs/dev/Notifica-Roadmap.md` for public roadmap or backlog placement
- `docs/dev/dev-notes.md` for stable technical or workflow decisions
- `../notifica_docs/` for private plans, strategy, raw analysis, or internal notes

Do not write to documentation by default when the item is still vague or is immediately moving into another skill.
