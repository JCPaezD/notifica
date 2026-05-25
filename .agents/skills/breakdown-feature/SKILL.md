---
name: breakdown-feature
description: Break a sufficiently designed Notifica feature, fix, improvement, refactor, or roadmap slice into small execution-ready tasks. Use when there is enough design clarity but the work is too large, mixed, risky, or dependency-heavy for one clean implementation pass. Skip when the design can be implemented directly, and do not use to decide what belongs in a version or roadmap block.
---

# Breakdown Feature

Use this skill to turn a designed change into a small set of clear implementation tasks.

The goal is not to redesign the feature. The goal is safer, more incremental execution.

See `.agents/workflow.md` for the shared workflow map.

## Core Rules

When using this skill:

- work from an already designed or sufficiently clear change
- split work into meaningful tasks, not micro-steps
- give each task one clear objective
- define completion criteria
- identify only real dependencies
- propose a practical execution order
- prefer boundaries that reduce risk and make validation easier

Do not break work down just to make it look organized.

## Boundaries

Use this skill for executable task slicing after enough design clarity exists.

Do not use it to decide roadmap placement or version scope. That belongs to `plan-version`.

Do not use it to design behavior, architecture, components, or contracts. That belongs to `design-spec`.

## Output Format

Return the main result in normal markdown.

Use Spanish for conversation output when the user is working in Spanish. Keep persistent documentation text in the target file's established language.

**Feature**
- <name>

**Breakdown Goal**
- why this breakdown exists

**Tasks**
1. **Title**
   - <task>
   **Goal**
   - what this task must achieve
   **Completion Criteria**
   - what must be true for this task to count as done
   **Dependencies**
   - only when they matter

2. **Title**
   - <task>
   **Goal**
   - what this task must achieve
   **Completion Criteria**
   - what must be true for this task to count as done
   **Dependencies**
   - only when they matter

**Execution Order**
1. <task>
2. <task>

**Risks**
- only if they affect task splitting

**Next Step**
- implement-feature

## Documentation Rule

This skill is conversation-first by default.

Update tracked documentation only when the breakdown materially changes how planned work should be represented, or when the user explicitly wants the breakdown reflected in planning docs.
