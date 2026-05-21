# Brand Guidelines — Fast Guide

**Breathe through it. One sip at a time.**

**Theme Type:** Light only

---

## Brand Identity

Fast Guide borrows its pacing from Calm — that slow, deliberate, "the world can wait" cadence — and wraps it in Headspace's rounded warmth. The canvas is a soft parchment cream, not clinical white. The UI chrome is almost entirely achromatic: warm grays, warm off-whites, warm charcoal text. Color enters the experience through content and state — a seafoam teal for actions and the breathing wave, a honeyed amber when you complete a checklist item, a muted coral when the app needs your attention.

The density is moderate. Cards breathe but don't waste space. A fasting person lying on a couch at 2am should be able to read everything at arm's length without squinting, but shouldn't have to scroll endlessly either. Typography mixes a warm serif display face (DM Serif Display) for headlines — lending the contemplative quality of a meditation journal — with a clean rounded sans (DM Sans) for body text, keeping everything approachable and friendly.

What makes this design unforgettable is the SOS button: a single tap that drops you into a full-screen breathing experience where a sine wave crests and subsides over 15 minutes, breathing with you, reminding you that this craving will pass — and it actually does.

**Key Characteristics:**

- Warm cream canvas `#FAF8F5` — never clinical white
- Achromatic chrome with seafoam teal `#5B9E8F` reserved for verbs and the signature wave
- Serif display + sans-serif body pairing (DM Serif Display + DM Sans)
- Soft, buoyant shadows with large blur radius `rgba(0,0,0,0.06)`
- Fully-pilled primary buttons with 500px radius
- Large tap targets (min 48x48px) — fasting hands shake
- The SOS breathing wave as the emotional anchor of the entire experience

---

## Signature Details — Don't Drop These

The 3 details that make this design memorable. These must survive every implementation pass. If a developer or AI agent drops one of these, the design becomes generic.

1. **The Breathing Wave (SOS Screen)** — When the user taps the SOS button, a full-screen breathing experience opens. A sine wave rendered in seafoam teal `#5B9E8F` animates across the screen, its amplitude gradually decreasing over 15 minutes. A central breathing circle pulses at a 4-second inhale / 4-second exhale rhythm with a soft teal glow: `box-shadow: 0 0 40px rgba(91, 158, 143, 0.3)` on inhale, collapsing to `0 0 15px rgba(91, 158, 143, 0.1)` on exhale. Optional audio cues (breath in/out sounds) sync to the visual rhythm. The wave literally subsides as the craving passes. Nobody else does this.

2. **Amber Completion Bloom** — When a checklist item is checked off, the checkbox doesn't just tick. It blooms with a soft amber glow `box-shadow: 0 0 12px rgba(196, 147, 90, 0.4)` that fades over 600ms using `ease-out`. The checkmark itself renders in `#C4935A`. By end of day when everything is checked, the whole list has a warm, accomplished tone.

3. **The Wordmark Period** — "Fast Guide" renders with a seafoam teal period: "Fast Guide**.**" The period is `color: #5B9E8F` while the rest of the wordmark is `#1A1816`. It's a small tell that connects to the wave — water, continuity, calm.

---

# SECTION 1: BRAND FOUNDATION

---

## 1.1 Color System

### Primary Colors

#### Seafoam Teal
- **HEX:** `#5B9E8F`
- **RGB:** `91, 158, 143`
- **Semantic Meaning:** Verbs, actions, the breathing wave, progress. The one color that says "tap me" or "this is alive."
- **Primary Use:** Primary buttons, active states, the SOS wave, links, toggle-on states, the wordmark period
- **Visual Weight:** 8-12% — restrained, appearing only where interaction lives

#### Warm Amber
- **HEX:** `#C4935A`
- **RGB:** `196, 147, 90`
- **Semantic Meaning:** Completion, nourishment, achievement. The feeling of a warm cup of bone broth.
- **Primary Use:** Completed checkmarks, progress bar fill, completion celebration bloom, streak indicators
- **Visual Weight:** 5-8% — appears through user action, not decoration

#### Warm Charcoal
- **HEX:** `#1A1816`
- **RGB:** `26, 24, 22`
- **Semantic Meaning:** Authority, readability, grounding
- **Primary Use:** Headlines, primary body text, the wordmark
- **Visual Weight:** 20-25% — the dominant reading surface

### Secondary / Accent Colors

#### Muted Coral
- **HEX:** `#C4705E`
- **Semantic Meaning:** Caution, attention needed, warning states
- **Primary Use:** "Watch for" sections, warning badges, the stop criteria accent

#### Soft Rose
- **HEX:** `#D4786A`
- **Semantic Meaning:** Urgency without alarm — a warmer error
- **Primary Use:** Stop criteria screen header, emergency callouts, the non-negotiable list

### Background Colors

#### Parchment Cream
- **HEX:** `#FAF8F5`
- **Usage:** Main page background, foundation layer. Warm, never clinical.

#### Clean White
- **HEX:** `#FFFFFF`
- **Usage:** Card backgrounds, elevated surfaces, checklist containers.

#### Bright White
- **HEX:** `#FFFFFF`
- **Usage:** Modals, bottom sheets, the SOS overlay background (with reduced opacity for the wave to breathe over).

### Text Colors

#### Warm Black
- **HEX:** `#1A1816`
- **Contrast Ratio on Parchment:** `16.2:1` (AAA)
- **Usage:** Headings, primary body text, day titles.

#### Stone Gray
- **HEX:** `#6B6560`
- **Contrast Ratio on Parchment:** `5.1:1` (AA)
- **Usage:** Supporting text, descriptions, "What's happening" body copy, labels.

#### Dust Gray
- **HEX:** `#9E9790`
- **Contrast Ratio on Parchment:** `3.1:1` (AA Large)
- **Usage:** Captions, timestamps, checklist metadata ("7/12 completed"), vitals units.

### Border Colors

#### Warm Sand
- **HEX:** `#E8E4DF`
- **Usage:** Default borders, dividers, card outlines, section separators.

#### Seafoam Teal
- **HEX:** `#5B9E8F`
- **Usage:** Focus rings, active input borders, selected card outlines.

### Status Colors

#### Success — Sage
- **HEX:** `#6B9E7A`
- **Usage:** Fast completion celebration, positive vitals trends, "on track" indicators.

#### Error — Muted Red
- **HEX:** `#B85450`
- **Usage:** Stop criteria items, validation errors, "break the fast" urgency.

#### Warning — Warm Coral
- **HEX:** `#C4705E`
- **Usage:** "Watch for" sections, electrolyte deficit warnings, day-specific cautions.

#### Info — Soft Blue
- **HEX:** `#6B8EB5`
- **Usage:** Informational callouts, "What's happening inside" section accents, tips.

---

## 1.2 Typography System

### Font Stack

```css
/* Display & Headers */
font-family: 'DM Serif Display', Georgia, 'Times New Roman', serif;

/* Body */
font-family: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;

/* Monospace (vitals data, timers, day counters) */
font-family: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;
```

**Font sourcing:** All three available via Google Fonts. Load via `next/font/google` for zero layout shift.

### Type Scale

| Element | Size | Line Height | Weight | Letter Spacing | Notes |
|---|---|---|---|---|---|
| Display | 36px | 1.2 | 400 | -0.02em | DM Serif Display. Day titles on guide screens. |
| H1 | 28px | 1.25 | 400 | -0.01em | DM Serif Display. Screen titles. |
| H2 | 22px | 1.3 | 400 | 0 | DM Serif Display. Section headers ("What's happening"). |
| H3 | 18px | 1.35 | 600 | 0 | DM Sans. Card titles, checklist group headers. |
| H4 | 16px | 1.4 | 600 | 0 | DM Sans. Sub-section labels. |
| H5 | 14px | 1.4 | 600 | 0.01em | DM Sans. Small labels. |
| H6 | 12px | 1.4 | 600 | 0.04em | DM Sans. Overline-style small headers. |
| Body Large | 18px | 1.6 | 400 | 0 | DM Sans. Daily guide body copy — readable at arm's length. |
| Body Regular | 16px | 1.55 | 400 | 0 | DM Sans. General body text. |
| Body Small | 14px | 1.5 | 400 | 0 | DM Sans. Secondary descriptions. |
| Caption | 12px | 1.4 | 500 | 0.01em | DM Sans. Metadata, timestamps, units. |
| Overline | 11px | 1.4 | 700 | 0.08em | DM Sans. Uppercase. Section category labels ("DAILY ESSENTIALS"). |

### Font Weights

- **Regular (400):** Body text, serif headlines (DM Serif Display only ships 400)
- **Medium (500):** Captions, secondary emphasis, checklist item labels
- **Semibold (600):** Sans-serif headers (H3-H6), button labels, active nav items
- **Bold (700):** Overline labels, strong emphasis, counter numbers

### Principles

- Serif for contemplation, sans-serif for action. Headlines that invite reading use DM Serif Display. UI elements that prompt doing use DM Sans.
- Body text at 18px on mobile guide screens. Fasting people read while lying down — arm's length readability is non-negotiable.
- Monospace for numbers that change: the day counter ("Day 3 — Hour 62"), vitals readings, the craving timer countdown.
- Weight contrast does hierarchy, not size alone. A 16px semibold label next to 16px regular body text reads clearly without needing different sizes.

---

## 1.3 Spacing System

Based on 8px grid.

| Token | Value | Usage |
|---|---|---|
| space-xs | 4px | Inline icon gaps, tight internal padding |
| space-sm | 8px | Between related elements, icon + label gap |
| space-md | 16px | Card internal padding, list item padding |
| space-lg | 24px | Between cards, section gaps within a screen |
| space-xl | 32px | Between major sections, screen edge padding |
| space-2xl | 48px | Top/bottom screen padding, before/after hero elements |
| space-3xl | 64px | Section dividers on long-scroll screens (daily guide) |

---

## 1.4 Border System

### Border Widths

| Token | Value | Usage |
|---|---|---|
| border-width-thin | 1px | Default card borders, dividers |
| border-width-default | 1.5px | Input borders, selected states |
| border-width-thick | 2px | Active tab indicators |
| border-width-focus | 2px | Focus rings (with 2px offset) |

### Border Radius

| Token | Value | Usage |
|---|---|---|
| radius-none | 0 | Never used — everything has some softness |
| radius-sm | 8px | Small badges, tags, input fields |
| radius-md | 12px | Cards, containers, modals |
| radius-lg | 16px | Large cards, bottom sheets |
| radius-xl | 24px | SOS button, feature callout cards |
| radius-full | 500px | Primary buttons (fully pilled), avatars, breathing circle |

**Radius philosophy:** Generously rounded. Everything feels soft and approachable — Headspace's pillow-soft surfaces. Primary buttons are fully pilled. Cards are 12px. Nothing is sharp.

---

## 1.5 Shadow System

```css
/* Shadow Level 0 — Flat */
box-shadow: none;
/* Usage: Inactive cards, pressed states */

/* Shadow Level 1 — Whisper */
box-shadow: 0 1px 3px rgba(26, 24, 22, 0.04), 0 1px 2px rgba(26, 24, 22, 0.06);
/* Usage: Default card elevation, resting state for interactive cards */

/* Shadow Level 2 — Soft */
box-shadow: 0 4px 12px rgba(26, 24, 22, 0.06), 0 1px 4px rgba(26, 24, 22, 0.04);
/* Usage: Hovered cards, active sections, bottom nav */

/* Shadow Level 3 — Lifted */
box-shadow: 0 8px 24px rgba(26, 24, 22, 0.08), 0 2px 8px rgba(26, 24, 22, 0.04);
/* Usage: Modals, bottom sheets, the SOS overlay */

/* Shadow Level 4 — Float */
box-shadow: 0 16px 48px rgba(26, 24, 22, 0.1), 0 4px 16px rgba(26, 24, 22, 0.06);
/* Usage: Dragged elements, toast notifications */

/* Signature: Breathing Glow */
box-shadow: 0 0 40px rgba(91, 158, 143, 0.3);
/* Usage: The breathing circle on inhale — collapses to 0 0 15px rgba(91,158,143,0.1) on exhale */

/* Signature: Amber Bloom */
box-shadow: 0 0 12px rgba(196, 147, 90, 0.4);
/* Usage: Checklist item completion bloom — fades over 600ms */
```

**Shadow philosophy:** Soft and buoyant, like Headspace's lifted cards. Shadows use the warm charcoal base color (not pure black) so they feel organic, not synthetic. The two signature shadows — the breathing teal glow and the amber completion bloom — are the only colored shadows in the entire system. Everything else is neutral.

---

## 1.6 Animation System

### Timing

| Token | Value | Usage |
|---|---|---|
| transition-fast | 150ms ease-out | Checkbox ticks, hover backgrounds, icon state changes |
| transition-base | 300ms ease-out | Card hover lifts, section expand/collapse, nav transitions |
| transition-slow | 500ms ease-out | Modal/sheet entrance, SOS overlay opening, celebration moments |

### Easing Functions

```css
--ease-default: cubic-bezier(0.25, 0.1, 0.25, 1.0);
--ease-in: cubic-bezier(0.42, 0, 1.0, 1.0);
--ease-out: cubic-bezier(0, 0, 0.58, 1.0);
--ease-in-out: cubic-bezier(0.42, 0, 0.58, 1.0);
--ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1.0);
--ease-breathe: cubic-bezier(0.45, 0.05, 0.55, 0.95);
```

### Signature Motions

- **Breathing pulse (SOS)**: The breathing circle scales from `1.0` to `1.15` over 4 seconds (inhale) using `--ease-breathe`, then back to `1.0` over 4 seconds (exhale). Continuous loop. The glow shadow animates in sync.
- **Craving wave (SOS)**: A sine wave SVG path animates continuously. Amplitude starts at 100% and decreases linearly to 0% over 15 minutes. Wave frequency: ~0.8Hz (calm, ocean-like). Stroke color: `#5B9E8F` at 60% opacity.
- **Amber bloom (checklist)**: On check, the checkbox background transitions to `#C4935A` in 150ms, then a `box-shadow` bloom expands from 0 to `0 0 12px rgba(196,147,90,0.4)` over 200ms, then fades to 0 over 400ms. Total: 600ms.
- **Section expand**: Collapsible sections in the daily guide expand with `max-height` transition at 300ms `--ease-out` with `opacity` fading from 0 to 1 over the same duration.

Respect `prefers-reduced-motion`: all transitions collapse to 0ms when set. The breathing wave falls back to a static visual with text cues ("Breathe in... Breathe out...").

---

## 1.7 Layout Foundation

### Container Widths

| Breakpoint | Container Max-Width |
|---|---|
| Mobile | 100% (edge-to-edge with 20px padding) |
| Tablet | 540px (centered) |
| Desktop | 540px (centered) |
| Large Desktop | 540px (centered) |

**Layout philosophy:** Single-column, phone-first, always. Even on desktop, the app renders in a centered phone-width column. This is a PWA that lives on phones. Desktop is an afterthought — it should look like a phone app centered on a warm background, not a stretched-out web page.

### Responsive Breakpoints

```css
--breakpoint-mobile: 0px;
--breakpoint-tablet: 640px;
--breakpoint-desktop: 1024px;
--breakpoint-large: 1280px;
```

### Grid System

- **Columns:** 1 (single column always)
- **Gutter:** N/A (single column)
- **Margin:** 20px on mobile, auto-centered on tablet+

---

# SECTION 2: HERO COMPONENT — SOS Breathing Screen

The most important component in this design system. This is the moment people will describe to their friends. It's the emotional anchor — the thing you reach for at 2am when you're lying on the couch, Day 2, feeling rough, and your brain is screaming "just eat something."

When you tap the SOS button, the screen transforms. Everything else disappears. It's just you, the wave, and your breath.

**Anatomy:**
```
┌─────────────────────────────────┐
│                                 │
│     ✕ (close, top-right)        │
│                                 │
│                                 │
│         ┌─────────┐             │
│         │         │             │
│         │ BREATHE │             │ ← Breathing circle, pulses
│         │   IN    │             │    with teal glow
│         │         │             │
│         └─────────┘             │
│                                 │
│    ～～～～～～～～～～～～～～～  │ ← Sine wave, amplitude
│                                 │    decreasing over 15min
│                                 │
│     "This will pass"            │ ← Reassurance text
│     12:47 remaining             │ ← Countdown in mono
│                                 │
│    ┌─────────────────────┐      │
│    │   I'm okay now  ☺   │      │ ← Exit button (pilled)
│    └─────────────────────┘      │
│                                 │
└─────────────────────────────────┘
```

**Specifications:**

**Container:**
- Full viewport height and width (`100vh × 100vw`)
- Background: `#FAF8F5` (parchment cream)
- Padding: 32px horizontal, safe-area-inset top/bottom
- Flex column, center-aligned
- z-index: 9999 (above everything)

**Close button (✕):**
- Position: absolute, top-right, 16px from edges
- Size: 44×44px tap target
- Icon: 20px, color `#9E9790`
- No border, transparent background
- Hover: background `rgba(26,24,22,0.04)`, radius-full

**Breathing Circle:**
- Size: 160×160px
- Border: 3px solid `#5B9E8F`
- Border-radius: 50%
- Background: `rgba(91, 158, 143, 0.06)`
- Contains centered text: "BREATHE IN" / "BREATHE OUT" (DM Sans, 14px, 700 weight, `0.08em` tracking, color `#5B9E8F`)
- Animation: `scale(1.0)` → `scale(1.15)` over 4s (`--ease-breathe`), hold 0ms, then `scale(1.15)` → `scale(1.0)` over 4s. Continuous.
- Shadow animation: inhale → `0 0 40px rgba(91,158,143,0.3)`, exhale → `0 0 15px rgba(91,158,143,0.1)`. Same timing.
- Text alternates between "BREATHE IN" (during scale-up) and "BREATHE OUT" (during scale-down)

**Sine Wave:**
- SVG element, full container width, height 80px
- Stroke: `#5B9E8F` at 60% opacity, 2px width, no fill
- Path: continuous sine wave, 3-4 visible wavelengths
- Animation: wave translates horizontally at ~0.8Hz (left-to-right scroll creates ocean movement)
- Amplitude: starts at 100% (40px peak-to-trough), linearly decreasing. At 7.5 minutes: 50%. At 15 minutes: flat line (0%).
- When flat: wave stroke transitions to `#6B9E7A` (success sage) and text changes to "You made it."

**Reassurance Text:**
- "This will pass" — DM Serif Display, 22px, 400 weight, `#1A1816`
- Countdown: JetBrains Mono, 16px, 500 weight, `#6B6560`. Format: "12:47 remaining"
- Spacing: 8px between the two lines, 32px below the wave

**Exit Button:**
- "I'm okay now" — DM Sans, 16px, 600 weight
- Background: transparent, border: 1.5px solid `#E8E4DF`
- Color: `#6B6560`
- Padding: 14px 32px
- Border-radius: 500px (pilled)
- Hover: background `rgba(91,158,143,0.06)`, border-color `#5B9E8F`
- Positioned at bottom of screen, 48px from bottom edge

**Audio (optional, user-sourced):**
- Inhale sound: plays during scale-up (0-4s of each cycle)
- Exhale sound: plays during scale-down (4-8s of each cycle)
- Volume: soft (0.3 gain)
- Mute toggle: small icon in top-left, 44×44px target

**SOS Trigger Button (on Dashboard):**
- Label: "SOS" or wave icon (🌊)
- Position: fixed bottom-right on dashboard, 24px from edges
- Size: 56×56px
- Background: `#5B9E8F`
- Color: `#FFFFFF`
- Border-radius: 50%
- Shadow: `0 4px 14px rgba(91, 158, 143, 0.25)` — teal-tinted, not black
- Icon: 24px wave or lifebuoy
- Hover: scale(1.05), shadow expands to `0 6px 20px rgba(91,158,143,0.3)`

---

# SECTION 3: COMPONENT APPLICATION MAP

---

## 3.1 Buttons

### Primary Button

**Purpose:** Main calls to action — "Start Fast", "Save", "Log Vitals".

```css
/* Default State */
background: #5B9E8F;
color: #FFFFFF;
padding: 14px 28px;
border: none;
border-radius: 500px;
font-family: 'DM Sans', sans-serif;
font-size: 16px;
font-weight: 600;
letter-spacing: 0.01em;
text-transform: none;
box-shadow: 0 2px 8px rgba(91, 158, 143, 0.2);
transition: all 300ms ease-out;
min-height: 48px;

/* Hover */
background: #4E8A7D;
box-shadow: 0 4px 14px rgba(91, 158, 143, 0.25);
transform: translateY(-1px);

/* Active / Pressed */
background: #437A6D;
box-shadow: 0 1px 4px rgba(91, 158, 143, 0.15);
transform: translateY(0);

/* Disabled */
background: #D0CDC9;
color: #9E9790;
box-shadow: none;
cursor: not-allowed;
```

### Secondary Button

**Purpose:** Alternate actions — "View All Days", "Reset Checklist", "I'm okay now".

```css
/* Default State */
background: transparent;
color: #6B6560;
padding: 14px 28px;
border: 1.5px solid #E8E4DF;
border-radius: 500px;
font-family: 'DM Sans', sans-serif;
font-size: 16px;
font-weight: 600;
min-height: 48px;
transition: all 300ms ease-out;

/* Hover */
background: rgba(91, 158, 143, 0.06);
border-color: #5B9E8F;
color: #5B9E8F;

/* Active */
background: rgba(91, 158, 143, 0.1);

/* Disabled */
color: #D0CDC9;
border-color: #E8E4DF;
```

### Tertiary / Ghost Button

**Purpose:** Low-emphasis actions — "Skip", "Maybe Later", navigation links.

```css
/* Default State */
background: transparent;
color: #5B9E8F;
padding: 14px 20px;
border: none;
border-radius: 500px;
font-family: 'DM Sans', sans-serif;
font-size: 16px;
font-weight: 500;
min-height: 48px;
transition: all 150ms ease-out;

/* Hover */
background: rgba(91, 158, 143, 0.06);

/* Active */
background: rgba(91, 158, 143, 0.1);
```

### Destructive Button

**Purpose:** "End Fast", "Reset All Data" — rare but necessary.

```css
/* Default State */
background: transparent;
color: #B85450;
padding: 14px 28px;
border: 1.5px solid #B85450;
border-radius: 500px;
font-family: 'DM Sans', sans-serif;
font-size: 16px;
font-weight: 600;
min-height: 48px;
transition: all 300ms ease-out;

/* Hover */
background: #B85450;
color: #FFFFFF;

/* Active */
background: #A14844;
```

### SOS Floating Action Button

**Purpose:** The craving emergency button. Always visible on the dashboard.

```css
/* Default */
position: fixed;
bottom: 88px; /* above bottom nav */
right: 24px;
width: 56px;
height: 56px;
background: #5B9E8F;
color: #FFFFFF;
border: none;
border-radius: 50%;
box-shadow: 0 4px 14px rgba(91, 158, 143, 0.25);
font-size: 20px;
display: flex;
align-items: center;
justify-content: center;
transition: all 300ms ease-out;
z-index: 100;

/* Hover */
transform: scale(1.05);
box-shadow: 0 6px 20px rgba(91, 158, 143, 0.3);

/* Active */
transform: scale(0.95);
box-shadow: 0 2px 8px rgba(91, 158, 143, 0.2);
```

---

## 3.2 Form Elements

### Text Input

```css
/* Default */
background: #FFFFFF;
color: #1A1816;
padding: 14px 16px;
border: 1.5px solid #E8E4DF;
border-radius: 8px;
font-family: 'DM Sans', sans-serif;
font-size: 16px;
line-height: 1.5;
transition: border-color 150ms ease-out, box-shadow 150ms ease-out;
min-height: 48px;

/* Placeholder */
color: #9E9790;

/* Focus */
border-color: #5B9E8F;
box-shadow: 0 0 0 3px rgba(91, 158, 143, 0.12);
outline: none;

/* Disabled */
background: #F2EFEB;
color: #9E9790;
```

### Checkbox (Checklist Items)

```css
/* Default (unchecked) */
width: 24px;
height: 24px;
border: 2px solid #D0CDC9;
border-radius: 6px;
background: #FFFFFF;
transition: all 150ms ease-out;
cursor: pointer;

/* Hover */
border-color: #5B9E8F;

/* Checked */
background: #C4935A;
border-color: #C4935A;
/* Checkmark: white SVG, 2px stroke */
/* Bloom animation: box-shadow 0 0 12px rgba(196,147,90,0.4) → 0 over 600ms */

/* Checked + settled (after bloom fades) */
background: #C4935A;
border-color: #C4935A;
box-shadow: none;
```

### Toggle / Switch

```css
/* Track — Off */
width: 48px;
height: 28px;
background: #D0CDC9;
border-radius: 14px;
transition: background 300ms ease-out;
padding: 2px;

/* Track — On */
background: #5B9E8F;

/* Thumb */
width: 24px;
height: 24px;
background: #FFFFFF;
border-radius: 50%;
box-shadow: 0 1px 3px rgba(26, 24, 22, 0.1);
transition: transform 300ms cubic-bezier(0.34, 1.56, 0.64, 1.0); /* spring */
/* Off: translateX(0) */
/* On: translateX(20px) */
```

### Number Input (Vitals)

```css
/* Same as Text Input but with: */
font-family: 'JetBrains Mono', monospace;
font-size: 18px;
font-weight: 500;
text-align: center;
width: 100px;
/* Accompanying label: DM Sans, 14px, 500, #6B6560 */
```

---

## 3.3 Cards & Containers

### Default Card

```css
background: #FFFFFF;
border: 1px solid #E8E4DF;
border-radius: 12px;
padding: 20px;
box-shadow: 0 1px 3px rgba(26, 24, 22, 0.04), 0 1px 2px rgba(26, 24, 22, 0.06);
```

### Interactive Card (Daily Guide day selector, Quick Actions)

```css
/* Default — same as Default Card plus: */
cursor: pointer;
transition: all 300ms ease-out;

/* Hover */
box-shadow: 0 4px 12px rgba(26, 24, 22, 0.06), 0 1px 4px rgba(26, 24, 22, 0.04);
transform: translateY(-2px);
border-color: #5B9E8F;
```

### Semantic Quick Action Cards

Quick action cards get a subtle semantic tint — thin colored border + 4% background wash — to create visual differentiation and help users scan faster. Each card maps to a palette color:

```css
/* Checklist — Amber (completion, doing) */
border-color: rgba(196, 147, 90, 0.25);
background: rgba(196, 147, 90, 0.04);
/* Icon + label: #A07A45 */

/* Log Vitals — Soft Blue (info, data) */
border-color: rgba(107, 142, 181, 0.25);
background: rgba(107, 142, 181, 0.04);
/* Icon + label: #5A7A9E */

/* Day Guide — Seafoam (navigation, primary) */
border-color: rgba(91, 158, 143, 0.25);
background: rgba(91, 158, 143, 0.04);
/* Icon + label: #4E8A7D */

/* Stop Criteria — Muted Red (urgency, warning) */
border-color: rgba(184, 84, 80, 0.25);
background: rgba(184, 84, 80, 0.04);
/* Icon + label: #B85450 */
```

This pattern can extend to any card that benefits from semantic grouping. The key: 0.25 opacity border + 0.04 opacity background fill. Enough lift to notice, not enough to shout.

### Elevated Card (Current Day status card)

```css
background: #FFFFFF;
border: 1px solid #E8E4DF;
border-radius: 16px;
padding: 24px;
box-shadow: 0 8px 24px rgba(26, 24, 22, 0.08), 0 2px 8px rgba(26, 24, 22, 0.04);
```

---

## 3.4 Navigation

### Top Bar / Header

```css
position: sticky;
top: 0;
z-index: 50;
background: rgba(250, 248, 245, 0.85);
backdrop-filter: blur(12px);
-webkit-backdrop-filter: blur(12px);
border-bottom: 1px solid #E8E4DF;
padding: 12px 20px;
min-height: 56px;
display: flex;
align-items: center;
justify-content: space-between;
/* Title: DM Sans, 16px, 600, #1A1816 */
/* Back button: 44×44 tap target, Lucide arrow-left, 20px, #6B6560 */
```

### Bottom Nav (mobile PWA)

```css
position: fixed;
bottom: 0;
left: 0;
right: 0;
z-index: 50;
background: #FFFFFF;
border-top: 1px solid #E8E4DF;
box-shadow: 0 -2px 8px rgba(26, 24, 22, 0.04);
padding: 8px 0 env(safe-area-inset-bottom, 8px);
display: flex;
justify-content: space-around;
min-height: 56px;

/* Tab item */
/* Icon: 22px, Lucide */
/* Label: DM Sans, 11px, 500 */
/* Inactive: color #9E9790 */
/* Active: color #5B9E8F, icon filled or weight change */
```

---

## 3.5 Typography Application

### Page Title (H1)

```css
font-family: 'DM Serif Display', serif;
font-size: 28px;
font-weight: 400;
line-height: 1.25;
letter-spacing: -0.01em;
color: #1A1816;
margin-bottom: 8px;
```

### Wordmark / Logo Treatment

```css
font-family: 'DM Serif Display', serif;
font-size: 24px;
font-weight: 400;
color: #1A1816;
letter-spacing: -0.01em;
/* The period is a separate <span> with color: #5B9E8F */
/* "Fast Guide" + <span style="color: #5B9E8F">.</span> */
```

### Body Paragraph

```css
font-family: 'DM Sans', sans-serif;
font-size: 16px;
font-weight: 400;
line-height: 1.55;
color: #6B6560;
```

### Link

```css
color: #5B9E8F;
text-decoration: none;
font-weight: 500;
transition: color 150ms ease-out;

/* Hover */
color: #4E8A7D;
text-decoration: underline;
text-underline-offset: 3px;

/* Focus */
outline: 2px solid #5B9E8F;
outline-offset: 2px;
border-radius: 2px;
```

---

## 3.6 Status Indicators

### Success / Error / Warning / Info badges

```css
/* Shared */
display: inline-flex;
align-items: center;
gap: 6px;
padding: 6px 12px;
border-radius: 500px;
font-family: 'DM Sans', sans-serif;
font-size: 13px;
font-weight: 600;

/* Success */
background: rgba(107, 158, 122, 0.1);
color: #5A8A6A;

/* Error */
background: rgba(184, 84, 80, 0.1);
color: #B85450;

/* Warning */
background: rgba(196, 112, 94, 0.1);
color: #B86450;

/* Info */
background: rgba(107, 142, 181, 0.1);
color: #5A7A9E;
```

### Toasts / Notifications

```css
background: #1A1816;
color: #FFFFFF;
padding: 14px 20px;
border-radius: 12px;
box-shadow: 0 8px 24px rgba(26, 24, 22, 0.15);
font-family: 'DM Sans', sans-serif;
font-size: 14px;
font-weight: 500;
/* Enter: slide up from bottom, 300ms ease-out */
/* Exit: fade out, 200ms */
/* Duration: 4 seconds */
```

---

## 3.7 Dividers & Ornaments

### Horizontal Divider

```css
border: none;
height: 1px;
background: #E8E4DF;
margin: 24px 0;
```

### Section Dot Separator

A centered dot (`·`) used between day guide sections as a breathing marker.

```css
text-align: center;
color: #D0CDC9;
font-size: 20px;
margin: 32px 0;
letter-spacing: 0.5em;
/* Renders as: · · · */
```

---

## 3.8 Icons

**Icon library:** Lucide React
**Stroke width:** 1.75px
**Style:** Line (outline) — filled only for active bottom nav tabs

### Icon Sizes

```css
--icon-xs: 14px;
--icon-sm: 18px;
--icon-md: 22px;
--icon-lg: 28px;
--icon-xl: 36px;
```

---

# SECTION 4: IMPLEMENTATION

## 4.1 CSS Variables (Drop in `:root`)

```css
:root {
  /* Primary Colors */
  --seafoam: #5B9E8F;
  --amber: #C4935A;
  --charcoal: #1A1816;
  
  /* Secondary / Accent */
  --coral: #C4705E;
  --rose: #D4786A;
  
  /* Backgrounds */
  --bg-primary: #FAF8F5;
  --bg-secondary: #FFFFFF;
  --bg-tertiary: #FFFFFF;
  
  /* Text */
  --text-primary: #1A1816;
  --text-secondary: #6B6560;
  --text-tertiary: #9E9790;
  
  /* Borders */
  --border-subtle: #E8E4DF;
  --border-strong: #5B9E8F;
  
  /* Status */
  --success: #6B9E7A;
  --error: #B85450;
  --warning: #C4705E;
  --info: #6B8EB5;
  
  /* Spacing (8px grid) */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  
  /* Radius */
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-full: 500px;
  
  /* Shadows */
  --shadow-0: none;
  --shadow-1: 0 1px 3px rgba(26,24,22,0.04), 0 1px 2px rgba(26,24,22,0.06);
  --shadow-2: 0 4px 12px rgba(26,24,22,0.06), 0 1px 4px rgba(26,24,22,0.04);
  --shadow-3: 0 8px 24px rgba(26,24,22,0.08), 0 2px 8px rgba(26,24,22,0.04);
  --shadow-4: 0 16px 48px rgba(26,24,22,0.1), 0 4px 16px rgba(26,24,22,0.06);
  --shadow-breathe: 0 0 40px rgba(91,158,143,0.3);
  --shadow-breathe-rest: 0 0 15px rgba(91,158,143,0.1);
  --shadow-bloom: 0 0 12px rgba(196,147,90,0.4);
  --shadow-sos-fab: 0 4px 14px rgba(91,158,143,0.25);
  
  /* Transitions */
  --transition-fast: 150ms ease-out;
  --transition-base: 300ms ease-out;
  --transition-slow: 500ms ease-out;
  
  /* Easing */
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1.0);
  --ease-breathe: cubic-bezier(0.45, 0.05, 0.55, 0.95);
  
  /* Typography */
  --font-display: 'DM Serif Display', Georgia, 'Times New Roman', serif;
  --font-body: 'DM Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono: 'JetBrains Mono', 'SF Mono', 'Fira Code', monospace;
  
  --font-size-display: 36px;
  --font-size-h1: 28px;
  --font-size-h2: 22px;
  --font-size-h3: 18px;
  --font-size-h4: 16px;
  --font-size-body-lg: 18px;
  --font-size-body: 16px;
  --font-size-body-sm: 14px;
  --font-size-caption: 12px;
  --font-size-overline: 11px;
  
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
}
```

## 4.2 Theme Strategy

Light only. No dark theme toggle, no `prefers-color-scheme` media query. The warm cream `#FAF8F5` canvas with generous contrast ratios remains comfortable for nighttime use — it's soft enough to not blast the user at 2am, without the engineering overhead of maintaining two themes for an MVP shipping tonight. If a dark theme becomes necessary later, the CSS variable architecture supports it cleanly — swap the background/text/border values under a `.dark` class or media query.

---

# SECTION 5: DESIGN PRINCIPLES

### 1. Breathe With the User
The pacing of the interface mirrors the pacing of the fast. Nothing is urgent except actual medical warnings. Transitions are slow. Whitespace is generous. The app should lower your heart rate, not raise it.

### 2. Color Earns Its Place
The UI is achromatic by default. Color appears only when it's doing real semantic work: teal for "do this," amber for "you did it," coral for "watch out." If a new element doesn't fit one of those three meanings, it stays gray.

### 3. One Primary Action Per Screen
Every screen has one thing it wants you to do. The dashboard's primary action is "check your daily checklist." The checklist's primary action is "check off items." The SOS screen's primary action is "breathe." Secondary actions exist but don't compete.

### 4. Readable at Arm's Length
Body text on guide screens is 18px. Tap targets are 48px minimum. Monospace counters are generous. This app gets used by people lying down, hands shaky, in varying states of discomfort. The design serves them.

### 5. The Wave Is Sacred
The breathing wave animation is the soul of this app. It doesn't get simplified to a progress bar. It doesn't get replaced with a static image. It breathes, it crests, it subsides. The craving passes. That's the promise.

---

# SECTION 6: ACCESSIBILITY REQUIREMENTS

## Contrast Ratios

- **Body text on parchment:** `16.2:1` (AAA) — `#1A1816` on `#FAF8F5`
- **Secondary text on parchment:** `5.1:1` (AA) — `#6B6560` on `#FAF8F5`
- **Teal on parchment:** `3.8:1` (AA Large) — `#5B9E8F` on `#FAF8F5`
- **Teal on white button:** White on `#5B9E8F` = `4.1:1` (AA)
- **Focus indicators:** `#5B9E8F` with 2px width, 2px offset

## Touch Targets

- **Minimum size:** 48×48px (larger than WCAG minimum — fasting hands shake)
- **Spacing between adjacent targets:** 8px minimum

## Keyboard Navigation

- All interactive elements keyboard-accessible
- Focus indicators: 2px `#5B9E8F` outline with 2px offset
- Tab order follows visual order
- Skip-to-content link in header

## Screen Readers

- Semantic HTML throughout
- ARIA labels on icon-only buttons (SOS FAB: "Emergency craving help")
- Status announcements via `aria-live` for checklist completions and timer updates
- Breathing circle: `aria-label` alternates between "Breathe in" and "Breathe out"

## Motion & Animation

- Respect `prefers-reduced-motion: reduce` — all transitions collapse to 0ms
- Breathing wave: falls back to alternating text ("Breathe in... Breathe out...") with no animation
- No content flashes more than 3 times per second
- Amber bloom: falls back to instant color change

---

# SECTION 7: DO'S AND DON'TS

## Do

- Use the parchment cream `#FAF8F5` as the base canvas — never pure white `#FFF` for the page background
- Reserve teal `#5B9E8F` exclusively for interactive elements and the breathing wave
- Use DM Serif Display for any text that invites contemplation (day titles, section headers, reassurance copy)
- Use DM Sans for any text that prompts action (buttons, labels, checklists, nav)
- Use JetBrains Mono for any number that changes (day counter, timer, vitals)
- Make the SOS FAB visible on every primary screen — it's always one tap away
- Implement the amber bloom animation on checklist completion — it's the micro-reward
- Keep the sine wave amplitude decrease linear over 15 minutes — no acceleration, no deceleration
- Test every screen at 3× text size — fasting users may have impaired vision

## Don't

- Don't use more than one accent color on a single screen (teal OR amber OR coral, not multiple)
- Don't apply the teal glow shadow to anything except the SOS breathing circle
- Don't make the stop criteria screen look like a normal warning — it should feel serious (muted red header, not playful)
- Don't add illustrations or mascots — this isn't Duolingo, it's Calm. The content is the visual.
- Don't use uppercase for body text or buttons — uppercase is reserved for overline labels only
- Don't speed up the breathing animation — 4 seconds in, 4 seconds out is calibrated to a calming breath rate
- Don't replace the sine wave with a progress bar — the wave IS the design
- Don't use emoji as icons anywhere in the UI — use Lucide line icons exclusively. Emoji breaks the calm, chic aesthetic.
- Don't use pure black `#000000` anywhere — always use warm charcoal `#1A1816`

---

# SECTION 8: AGENT PROMPT GUIDE

## Quick Color Reference

```
Primary Action:    Seafoam Teal     #5B9E8F
Completion:        Warm Amber       #C4935A
Warning:           Muted Coral      #C4705E
Error / Stop:      Muted Red        #B85450
Success:           Sage             #6B9E7A
Info:              Soft Blue        #6B8EB5
Text (Main):       Warm Charcoal    #1A1816
Text (Secondary):  Stone Gray       #6B6560
Text (Tertiary):   Dust Gray        #9E9790
Background:        Parchment Cream  #FAF8F5
Cards:             White            #FFFFFF
Borders:           Warm Sand        #E8E4DF
```

## Example Component Prompts

Use these as prompt templates when asking an AI agent to build a component in this design system.

- **SOS Breathing Screen:** "Build a full-screen breathing exercise component. Cream background #FAF8F5. Centered 160px circle with 3px #5B9E8F border that pulses scale(1.0→1.15) over 4s ease-breathe. Text alternates 'BREATHE IN' / 'BREATHE OUT' in DM Sans 14px 700 #5B9E8F. Below: SVG sine wave in #5B9E8F at 60% opacity, amplitude decreasing to 0 over 15 minutes. Countdown in JetBrains Mono 16px #6B6560. Pilled exit button at bottom."

- **Primary button:** "Build a primary button: DM Sans 16px 600, #FFF on #5B9E8F, 14px 28px padding, border-radius 500px, shadow 0 2px 8px rgba(91,158,143,0.2). Hover: translateY(-1px), #4E8A7D. 48px min-height."

- **Checklist card:** "Build a checklist component with items. Each item: 24px checkbox with 6px radius, 2px #D0CDC9 border. On check: fill #C4935A, white checkmark SVG, bloom shadow 0 0 12px rgba(196,147,90,0.4) fading over 600ms. Label: DM Sans 16px 500 #1A1816, line-through when checked. Card: white bg, 1px #E8E4DF border, 12px radius, 20px padding."

- **Day guide card:** "Build a collapsible section card. Header: DM Serif Display 22px #1A1816 with Lucide chevron-down 18px #9E9790. Body: DM Sans 18px 400 #6B6560, line-height 1.6. Card: white bg, 12px radius, shadow-1. Expand: max-height + opacity 300ms ease-out."

- **Bottom nav:** "Build a 4-tab bottom nav: Home, Guide, Checklist, Vitals. Fixed bottom, white bg, 1px top border #E8E4DF. Lucide icons 22px, labels DM Sans 11px 500. Inactive: #9E9790. Active: #5B9E8F. Safe area padding at bottom."

---

# SECTION 9: ITERATION GUIDE — THE 10-POINT CHEAT SHEET

When in doubt, re-anchor on these 10 points. They summarize the entire system.

1. **Canvas:** Warm parchment cream `#FAF8F5` — never clinical white, never dark
2. **Accent:** Seafoam teal `#5B9E8F` reserved for verbs and the wave — nowhere else
3. **Typography:** DM Serif Display for contemplation (headlines), DM Sans for action (everything else), JetBrains Mono for changing numbers
4. **Density:** Moderate — 48px min tap targets, 18px body text on guides, 8px grid
5. **Signature:** The breathing wave SOS screen — 15-minute sine wave that subsides, 4s in/4s out breathing circle with teal glow
6. **Shadows:** Warm, soft, buoyant — use charcoal-tinted `rgba(26,24,22,x)` not black. Two colored exceptions: teal breathe glow and amber bloom.
7. **Motion:** Slow and calming — 300ms default, spring easing on toggles, breathing easing on the SOS circle
8. **Hero:** The SOS breathing screen IS the hero — spec it first, test it first, protect it always
9. **Dominant don't:** Don't let multiple accent colors compete on one screen — achromatic chrome, single semantic color per context
10. **The feeling:** Like being gently held during something hard. Calm's serenity with Headspace's warmth. The app breathes with you.

---

# QUICK REFERENCE

## Component Checklist

Before development, ensure specs exist for:
- [x] All button variants (Primary, Secondary, Tertiary, Destructive, SOS FAB)
- [x] Form elements (text input, checkbox, toggle, number input)
- [x] Hero component (SOS Breathing Screen — in full detail)
- [x] Cards (default, interactive, elevated)
- [x] Navigation (top bar with blur, bottom nav)
- [x] Section headers and dividers (dot separator)
- [x] Typography hierarchy (complete scale)
- [x] Responsive behavior (single-column, 540px max centered)
- [ ] Empty states for major views
- [ ] Loading and error states

## The Signature Details — One More Reminder

1. **The Breathing Wave** — 15-minute sine wave + breathing circle with teal glow. This is the soul of the app.
2. **Amber Completion Bloom** — Checkboxes bloom warm amber on completion, 600ms fade.
3. **The Teal Period** — "Fast Guide." with a `#5B9E8F` period. Small but distinctive.

---

**Version 1.0** • Light Theme
**Breathe through it. One sip at a time.**
