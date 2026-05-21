# NOW — Fast Guide PWA

What's currently true. History lives in git commits.

Last updated: 2026-05-20 — full app build complete

## Current State
All screens built and tested. Production build passes with zero TypeScript errors. Pushed to GitHub.

**11 routes, all working:**
- `/pin` — Set/enter 4-digit PIN
- `/setup` — Start date + target days (1-10)
- `/` — Dashboard (progress, quick actions, checklist preview, SOS FAB)
- `/guide` — Daily Guide with day selector and collapsible sections
- `/checklist` — Grouped checklist with amber bloom animation
- `/vitals` — BP, HR, weight, energy/mood logging with history
- `/sos` — Breathing exercise with 15-min sine wave + teal glow circle
- `/stop` — Stop criteria with muted-red header
- `/refeeding` — Refeeding guide with meal plan
- `/settings` — Duration, start date, PIN, reset

**Design system applied:**
- Parchment cream canvas, DM Serif Display + DM Sans + JetBrains Mono
- Seafoam teal accent, amber completion bloom, semantic quick action cards
- Lucide icons (no emoji), PWA manifest

## Active / In Flight
- Vercel deployment — Evan needs to import repo at vercel.com/new (CLI token expired)

## Queued
- Generate proper PWA app icon (currently placeholder teal square)
- Add audio cues to SOS breathing screen (user-sourced breath sounds)
- Test on actual mobile device after Vercel deploy
- Consider adding craving toolkit screen (salt, tea, broth, walk, etc. — currently accessible via SOS)
- Empty states for vitals (no entries yet) and first-launch experience

## Known Issues
- PWA icons are placeholder solid-teal squares — need real branded icons
- Vercel CLI token expired — deploy via web import instead
- `next-pwa` package installed but service worker not wired up yet (offline support pending)
