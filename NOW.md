# NOW — Fast Guide PWA

What's currently true. History lives in git commits.

Last updated: 2026-05-20 — deployed to Vercel, polish pass complete

## Current State
App is live at https://clean-ten-sand.vercel.app. All screens built, tested, and deployed. Auto-deploys on push to main.

**11 routes, all working:**
- `/pin` — Set/enter 4-digit PIN (per-device isolation via localStorage)
- `/setup` — Start date + target days (1, 3, 5, 7, 10)
- `/` — Dashboard (progress, quick actions, checklist preview with bullet/dash indicators, SOS FAB)
- `/guide` — Daily Guide with day selector and collapsible sections
- `/checklist` — Grouped checklist with amber bloom, water bottle tracker, perfect day badge
- `/vitals` — BP, HR, weight, energy/mood logging with edit/delete on entries
- `/sos` — Breathing exercise with 15-min sine wave + teal glow circle
- `/stop` — Stop criteria with muted-red header
- `/refeeding` — Refeeding guide with meal plan
- `/settings` — Duration, start date, PIN, reset

**Design system:** Brand guidelines in `FastGuide_Brand_Guidelines.md`, preview in `fastguide_design_preview.html`.

## Active / In Flight
Nothing in progress.

## Queued
- Generate proper PWA app icon (currently placeholder teal square)
- Add audio cues to SOS breathing screen (user-sourced breath sounds)
- Wire up service worker for offline support (`next-pwa` installed but not configured)
- Test on actual mobile device
- Consider adding standalone craving toolkit screen
- Empty states for vitals and first-launch experience

## Known Issues
- PWA icons are placeholder solid-teal squares — need real branded icons
- `next-pwa` service worker not wired up yet (offline support pending)
