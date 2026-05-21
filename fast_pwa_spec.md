# Fast Guide PWA — Implementation Spec

## Overview
A mobile-first PWA that guides users through a 1-10 day water fast with daily guides, checklists, and basic vitals tracking. Quick and dirty. Ship tonight.

## Tech Stack
- Next.js (App Router)
- Vercel deployment
- localStorage for all user data (no backend DB needed for MVP)
- PWA manifest + service worker for installability
- Tailwind CSS

## Architecture Decisions
- **No backend/database.** All data lives in localStorage. Each device is naturally isolated.
- **PIN gate** is just a simple 4-digit code screen on first visit. Stored in localStorage. Not real auth — just a door to prevent random access. Hardcode an initial PIN or let the first user set one.
- **No accounts, no email, no OAuth.** Just open the link, enter PIN, use the app.
- **Content is baked into the app.** The daily guides are static content, not fetched from anywhere.

## Screens / Flow

### 1. Welcome / PIN Screen
- App name: "Fast Guide" (or whatever feels right)
- 4-digit PIN input
- First visit: "Set your PIN" → saves to localStorage
- Return visit: "Enter your PIN" → validates against stored PIN
- Clean, minimal, centered

### 2. Setup Screen (shown once, after PIN)
- "When did you start your fast?" — date/time picker, defaults to now
- "How many days are you aiming for?" — selector: 3, 5, 7, 10
- Save → goes to Dashboard

### 3. Dashboard (main screen)
- **Current status:** "Day 3 — Hour 62" (calculated from start time)
- **Progress bar** or visual showing how far through the fast
- **Today's card:** Summary of what to expect today (pulled from daily guide content)
- **Quick actions:**
  - "Daily Checklist" → goes to checklist for current day
  - "Log Vitals" → goes to vitals entry
  - "Craving Help" → goes to craving toolkit
  - "Stop Criteria" → always accessible, one tap
- **Navigation** to view any day's guide (not just current day)

### 4. Daily Guide Screen
- Day title and subtitle (e.g., "Day 2 — The Wall")
- "What's happening inside" — collapsible section
- "What to expect" — collapsible section
- "Tips" — collapsible section
- "Watch for" — collapsible section (styled slightly differently — these are warnings)

### 5. Daily Checklist Screen
- **Electrolyte schedule:**
  - [ ] Morning LMNT (half packet in 32oz water)
  - [ ] Morning bone broth with salt
  - [ ] Midday LMNT
  - [ ] Afternoon LMNT
  - [ ] Evening bone broth with salt
  - [ ] Pre-bed LMNT
  - [ ] Magnesium 200mg with bone broth
  - [ ] Chamomile tea
- **Basics:**
  - [ ] 80oz water minimum
  - [ ] Supplements taken
  - [ ] Checked in with fasting buddy
- Checkboxes persist in localStorage per day
- Visual progress (e.g., "7/12 completed")
- Reset button per day if needed

### 6. Vitals Log Screen
- Simple form:
  - Blood pressure (systolic/diastolic) — two number inputs
  - Heart rate — number input
  - Weight (optional) — number input
  - Energy (1-10 slider or tap)
  - Mood (1-10 slider or tap)
  - Notes — short text field
- "Morning" or "Evening" toggle (can log twice per day)
- Saves to localStorage keyed by day + time of day
- Show history: simple list of previous entries so you can see trends

### 7. Craving Toolkit Screen (quick access)
- List of craving-busting techniques with icons:
  - 🧂 Salt on tongue
  - 🫖 Hot tea
  - 🥣 Bone broth
  - 💨 Sparkling water
  - 🚶 Walk 10-15 minutes
  - 🪥 Brush teeth
  - 📓 Journal
  - 🫙 Pickle juice
- Maybe a simple timer: "This craving will pass. Time remaining: ~15 minutes" with a countdown from when they open the screen

### 8. Stop Criteria Screen (always one tap away)
- Red/warning styled
- The non-negotiable list:
  - Muscle twitching not resolving with electrolytes
  - Tingling/buzzing sensations
  - Sustained dizziness
  - Heart palpitations
  - Confusion
  - Persistent diarrhea (3+ episodes after Day 3)
  - Chest pain (call 911)
  - Something feels wrong — trust it
- "Break Your Fast Safely" button → shows refeeding instructions

### 9. Refeeding Guide Screen
- Step-by-step refeeding protocol
- What to eat first
- What to avoid
- Day-by-day refeeding plan

## Daily Guide Content

Use the content from the companion document "7_day_fast_daily_guide.md" — it has all 7 days written out with:
- What's happening inside
- What to expect
- Tips
- Watch for

For Days 8-10, just repeat Day 7's "deep autophagy continues" messaging with a note to monitor closely.

### Variable Duration Support

The app supports 1-10 day fasts (selectable in Setup and editable in Settings). Content strategy by day:
- **Days 1-7:** Full unique daily guide content from `7_day_fast_daily_guide.md`
- **Days 8-10:** Repeat Day 7's deep autophagy messaging with "Day X — Continuing" title and a note to monitor closely. The checklist and vitals remain identical.
- **Shorter fasts (3-5 days):** Same daily content for Days 1-N. Progress bar and countdown adjust to the selected target. Refeeding guide is always accessible regardless of target length.

### Settings Screen (accessible from Dashboard gear icon)

- **Fast duration:** Selector to change target days (1-10). Recalculates progress and countdown.
- **Start date/time:** Editable. For users who started before installing the app.
- **Reset fast:** Destructive action to clear all data and start over.
- **PIN:** Change PIN option.

## Design Direction
- **Light theme.** Warm parchment cream (#FAF8F5) — soft enough for nighttime use without blasting the user.
- **Calm, minimal, warm.** Think health app meets meditation app. Not clinical.
- **Mobile-first.** This lives on phones. Desktop is an afterthought.
- **Large tap targets.** Fasting people have shaky hands sometimes.
- **Muted colors with one accent.** Soft greens or warm amber for progress/positive states. Soft red/orange for warnings.
- **Clean typography.** Readable at arm's length when lying down.
- **No clutter.** Every screen should have one primary action.

## PWA Requirements
- manifest.json with app name, icons, theme color, display: standalone
- Service worker for offline capability (the guides should work without internet)
- "Add to Home Screen" prompt or instructions

## localStorage Schema

```
{
  "pin": "1234",
  "fastConfig": {
    "startDate": "2026-05-22T13:00:00",
    "targetDays": 7
  },
  "checklists": {
    "day1": {
      "morningLMNT": true,
      "morningBroth": true,
      "middayLMNT": false,
      ...
    },
    "day2": { ... }
  },
  "vitals": {
    "day1_morning": {
      "systolic": 132,
      "diastolic": 88,
      "heartRate": 93,
      "weight": 200,
      "energy": 7,
      "mood": 6,
      "notes": "Feeling good"
    },
    "day1_evening": { ... }
  }
}
```

## Scope Boundaries (NOT building tonight)
- No backend / no database
- No real authentication
- No multi-device sync
- No social features
- No push notifications (maybe later)
- No data export (maybe later)
- No onboarding tutorial

## Deployment
- `npx create-next-app@latest fast-guide`
- Build it
- `vercel deploy` or push to GitHub → auto-deploy

## One More Thing
The companion content document "7_day_fast_daily_guide.md" has all the daily guide text. Ingest that as the content source. Don't rewrite the medical/fasting content — it's been carefully reviewed.
