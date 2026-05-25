---
name: design-spec
description: Turn a clear, selected Notifica item or roadmap slice into a concise implementation-ready design spec. Use when Codex needs to decide exact behavior, scope, technical approach, affected areas, contracts, rules, risks, and validation before implementation. Skip for obvious small changes that can safely go directly to implement-feature, and do not use for version-wide planning or executable task breakdown.
---

# Design Spec

Use this skill to turn a clear selected item into a concise design that is ready to feed `implement-feature`.

The goal is to reduce ambiguity before implementation and define a practical design that fits Notifica.

See `.agents/workflow.md` for the shared workflow map.

## Core Rules

When using this skill:

- work from an already refined or otherwise clear item
- define exact goal and scope
- identify affected repo areas
- state key design decisions clearly
- surface constraints, invariants, risks, and edge cases
- produce a high-level implementation plan
- prefer the simplest design that is sufficient and coherent with the repository

Do not write code in this skill.

## Boundaries

Use this skill for one selected item or slice, not for a whole version.

Use `plan-version` for roadmap placement and macro-slicing. Use `breakdown-feature` only when the approved design is too large, mixed, risky, or dependency-heavy for one clean implementation pass.

## Output Format

Return the main result in normal markdown.

Use Spanish for conversation output when the user is working in Spanish. Keep persistent spec artifacts or documentation text in the target artifact's established language.

# Feature: <name>

## Context
- why this exists now

## Exact Goal
- what must be achieved

## Scope
- includes
- does not include

## Technical Design
- affected components or areas
- data flow
- key decisions

## Contracts / Rules
- invariants
- restrictions
- behavioral rules

## Risks / Edge Cases
- important risks
- important edge cases

## Implementation Plan
1. ordered step
2. ordered step

## Documentation Impact
- roadmap
- dev-notes
- private docs
- none

## Documentation Rule

This skill is conversation-first by default.

Update tracked documentation only when:

- the design establishes a stable decision worth preserving
- the decision materially affects architecture, workflow, platform behavior, or long-term UX behavior
- the user approves the update
