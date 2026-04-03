---
name: debug-root-cause
description: Use this skill when a bug is persistent, unclear, or has resisted initial implementation attempts. This includes repeated failed fixes, inconsistent behavior, UI issues with unclear causes, state mismatches, cache issues, platform-specific differences, or when the root cause is unknown. Do not use for implementing features or applying fixes. This skill is for diagnosis only.
---

# Debug Root Cause Skill

This skill switches Codex into diagnostic mode.

Use it to understand problems, not to fix them.

It must not produce implementation changes unless explicitly requested after the diagnosis.

## Purpose

The goal is to:

- identify the real root cause of a problem
- avoid speculative fixes
- avoid iterative patching
- produce a clear, evidence-based explanation

## When to use

Use this skill when:

- a bug persists after reasonable implementation attempts
- multiple fixes have failed or partially worked
- behavior is inconsistent or difficult to explain
- UI does not match expected state
- platform-specific differences are suspected between:
  - browser/PWA
  - Android native
  - desktop browser environments
- async, timing, lifecycle, or rendering issues are suspected
- versioned assets, manifest behavior, service worker behavior, or cached state may be involved
- the correct layer of the problem is unknown

Do not use it when:

- implementing new features
- applying straightforward fixes
- making small, obvious corrections

## Core rules

During this skill:

- do not modify code
- do not propose speculative fixes
- do not iterate on possible solutions
- do not expand scope unnecessarily
- if the bug depends on an external tool, CLI, API, browser/platform contract, Capacitor plugin, PWA behavior, manifest semantics, or Play Console rule, verify the relevant official documentation or other primary source before concluding the root cause
- do not treat local code assumptions as sufficient evidence when the failing behavior depends on external system semantics

Focus only on understanding the problem.

## Diagnostic process

Follow this sequence.

### 1. Understand the problem

- restate the issue clearly
- identify expected vs actual behavior
- identify where the mismatch occurs
- note whether the problem is:
  - functional
  - visual
  - platform-specific
  - release-related
  - version/caching related

### 2. Identify involved parts of the system

- relevant components
- composables / services / utilities
- state sources
- rendering layers
- persistence layers such as localStorage
- service worker / manifest / static assets when relevant
- Android native layer or Capacitor integration when relevant

Do not explore unrelated parts of the repo.

### 3. Trace data and control flow

- how data moves through the system
- where state is created, transformed, and consumed
- where desynchronization may occur

Focus on:

- state vs UI mismatches
- lifecycle timing
- async boundaries
- cached values or stale persisted state
- platform conditionals
- differences between PWA and Capacitor execution paths
- external contracts and configuration semantics when the behavior depends on a browser, plugin, build system, manifest, or deployment platform

### 4. Identify likely root causes

Provide a small set of plausible causes:

- incorrect assumptions
- wrong source of truth
- timing issues
- stale cache or persisted state
- missing invalidation
- rendering constraints
- platform-specific behavior
- side effects or race conditions

Do not guess broadly. Keep it focused.

### 4.5. Verify external contract

When the bug involves an external dependency or platform behavior:

- check the official documentation or other primary source
- confirm valid options, config keys, and expected behavior
- compare documented behavior against the local implementation
- distinguish clearly between:
  - local assumption
  - documented behavior
  - observed runtime behavior

Do not finalize the diagnosis until these are aligned when the issue depends on an external contract.

### 5. Propose validation strategy

If needed, suggest:

- minimal logging points
- state inspection
- ordering verification
- controlled reproduction steps
- platform-by-platform comparison steps

Diagnostics must be:

- scoped
- temporary
- high-signal

### 6. Conclusion

Provide:

- most likely root cause
- why previous attempts failed
- what must be confirmed before fixing
- if external behavior was involved, state what was confirmed from documentation versus what was confirmed from runtime reproduction

## Output expectations

Return:

- clear explanation of the problem
- involved parts of the system
- root cause hypothesis
- validation plan if needed

Do not include:

- code changes
- patches
- implementation steps

## Relationship with implementation work

This skill is complementary to implementation skills:

- implementation skills build and modify
- `debug-root-cause` investigates and explains

Do not mix both behaviors in the same response.

Once diagnosis is complete:

- either stop and wait for user input
- or explicitly request permission to switch back to implementation
