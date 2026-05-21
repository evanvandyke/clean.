# Fast Guide PWA — Session Instructions

Partnership principles live in `~/.claude/CLAUDE.md` (already loaded). This file is project-specific only.

---

## Trust the Source of Truth

Documents, memory, and prior session notes drift. Code is the primary source of truth. When a document and the code disagree, the code wins and the document needs updating. Read the actual state before acting on any written description of it.

## At Session Start

Read these files in order:
1. `NOW.md` — current state, active work, what's next
2. `fast_pwa_spec.md` — implementation spec (screens, localStorage schema, design direction)
3. `7_day_fast_daily_guide.md` — the daily guide content (do not rewrite medical/fasting content)

**Prove you've read the above files by summarizing their current state in your first response.** Failure to do so is evidence you didn't follow these instructions and the session should restart.

## Fast Guide Is a Quick-Ship MVP

- No backend, no database. All data in localStorage.
- PIN gate is not real auth — just a simple access door.
- Content is baked into the app, not fetched.
- Dark theme, calm/minimal, mobile-first. Large tap targets.
- The fasting content in `7_day_fast_daily_guide.md` has been carefully reviewed — use it as-is.

## Key Conventions

- None yet. Add conventions here as they emerge.

## Memory

This project uses a two-file memory system (MEMORY.md + feedback.md). Do not create additional memory files.

## At Session End

Run `/wrap`. It handles NOW.md updates, memory audit, and compression.
