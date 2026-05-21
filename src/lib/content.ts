export interface DayGuide {
  day: number;
  title: string;
  subtitle: string;
  whatsHappening: string;
  whatToExpect: string[];
  tips: string[];
  watchFor: string[];
}

export const dailyGuides: DayGuide[] = [
  {
    day: 1,
    title: "Day 1",
    subtitle: "This Isn't That Bad",
    whatsHappening:
      "Glycogen (stored sugar) is depleting. Insulin is dropping. Your body still has plenty of fuel. Hunger is mostly habit.",
    whatToExpect: [
      "Hungry at normal meal times — passes in 15-20 minutes",
      "Hands may reach for food on autopilot",
      "Energy is mostly normal",
      "May feel slightly off by evening",
    ],
    tips: [
      "Stay busy. Boredom is harder than hunger today.",
      "When a craving hits, put salt on your tongue. It works.",
      "Walk 10-15 minutes if hunger spikes.",
      "Sparkling water gives your mouth something to do.",
    ],
    watchFor: ["Nothing concerning expected today. Easy day."],
  },
  {
    day: 2,
    title: "Day 2",
    subtitle: "The Wall",
    whatsHappening:
      "Glycogen is fully depleted. Your body is switching from burning sugar to burning fat (ketosis). This transition is uncomfortable but temporary.",
    whatToExpect: [
      "Real physical hunger (different from yesterday's habitual hunger)",
      "Brain fog, possible headache",
      "Low energy, irritability",
      "This is the hardest day for most people",
    ],
    tips: [
      "Electrolytes are critical today. Do not skip any.",
      "Bone broth is your best weapon. Use it when it's hard.",
      "Light activity helps — walk, stretch, move gently.",
      "Don't make big decisions or do intense work today.",
      "The fog is temporary. It's just your brain switching fuel sources.",
      "Evening may feel hard. Have tea, broth, and something to watch.",
    ],
    watchFor: [
      "Sustained dizziness that doesn't improve with salt and water.",
      "Vision changes lasting more than 30 minutes.",
    ],
  },
  {
    day: 3,
    title: "Day 3",
    subtitle: "The Shift",
    whatsHappening:
      "Ketosis is established. Autophagy (cellular cleanup) is accelerating. Brain is switching to ketone fuel. Growth hormone is 2-3x baseline.",
    whatToExpect: [
      "The fog lifts — usually morning of Day 3",
      "Hunger significantly reduced",
      "Taste buds heightened (broth tastes amazing)",
      "Possible emotional surfacing — old feelings, vivid dreams",
      "A sense of quiet or clarity",
    ],
    tips: [
      "Maintain electrolytes even though you feel better. Feeling good doesn't mean you don't need sodium.",
      "If emotions surface, let them. Journal if that helps.",
      'This is where most people say "oh, this is what they were talking about."',
      "Some digestive clearing is normal (bile dumping). Stay near a bathroom.",
    ],
    watchFor: [
      "Persistent diarrhea (more than 2-3 episodes). Adjust electrolyte concentration — dilute more, sip slower.",
    ],
  },
  {
    day: 4,
    title: "Day 4",
    subtitle: "Deep Clean",
    whatsHappening:
      "Autophagy at peak intensity. Stem cell activation underway. Immune system regenerating. Growth hormone 3-5x baseline. Visceral fat being targeted.",
    whatToExpect: [
      "Hunger mostly absent",
      "Mental clarity sharpening",
      "Energy stable but not high — calm and consistent",
      "Possible headaches (electrolytes or just the process)",
      "More reflective than usual",
    ],
    tips: [
      "Don't skip electrolytes because you feel good. This is where deficits build silently.",
      "Bone broth morning and evening — non-negotiable.",
      "Light activity is fine. Nothing intense.",
      "Drink plenty of water.",
    ],
    watchFor: [
      "Muscle twitching (calves, quads, anywhere) — increase electrolytes immediately",
      "Tingling or buzzing sensations — electrolyte deficit signal",
      "Lightheadedness when standing — sit down, salt, water, electrolytes",
      "If any of these don't resolve within a couple hours, consider breaking the fast",
    ],
  },
  {
    day: 5,
    title: "Day 5",
    subtitle: "The Harvest",
    whatsHappening:
      "Everything from Day 4, deeper. Autophagy continues at peak. Immune system rebuilding. Inflammation significantly reduced. Brain fully adapted to ketones.",
    whatToExpect: [
      "Stable energy, clear mind",
      "Hunger essentially gone",
      "Body may feel different — less pain, more ease",
      "Emotionally calm or reflective",
    ],
    tips: [
      "Stay consistent with electrolytes. Cumulative depletion is the risk now.",
      "Track water intake. Minimum 80oz plus extra if you have any digestive clearing.",
      "Check blood pressure if you have a monitor. Morning and evening.",
      "Light movement. Nothing strenuous.",
    ],
    watchFor: [
      "Same as Day 4. The risk of electrolyte depletion increases each day.",
      "Any muscle twitching, nerve tingling, persistent dizziness, or heart irregularities means it's time to eat.",
      "Stopping at Day 5 is a massive accomplishment.",
    ],
  },
  {
    day: 6,
    title: "Day 6",
    subtitle: "The Quiet",
    whatsHappening:
      "Deep autophagy. Stem cells actively building new immune cells. Every system running on clean fuel. The body is doing renovation work it can't do while processing food.",
    whatToExpect: [
      "Calm, clear, present",
      "Energy is efficient, not high",
      "Sleep may have improved",
      "Possible reduction in chronic pain or inflammation",
      "Emotionally peaceful",
    ],
    tips: [
      "Still doing electrolytes. Yes, still. Even now.",
      "Light walks, stretching, rest.",
      "Start thinking about refeeding — review the plan so you're ready.",
      "Journal if you want. This day often produces clarity.",
    ],
    watchFor: [
      "Same criteria as Days 4-5. Listen to your body. If something feels wrong, trust that feeling.",
    ],
  },
  {
    day: 7,
    title: "Day 7",
    subtitle: "Completion",
    whatsHappening:
      "Maximum autophagy benefit achieved. Full immune regeneration cycle completed. Insulin sensitivity fully reset. Inflammatory markers at their lowest.",
    whatToExpect: [
      "Similar to Day 6",
      "Possible excitement about eating tomorrow",
      "A sense of accomplishment",
      "The quiet is familiar now",
    ],
    tips: [
      "Electrolytes through the entire day",
      "Light activity only",
      "Prep your refeeding food so it's ready tomorrow",
      "Take a final blood pressure reading and compare to Day 1",
    ],
    watchFor: [
      "Same criteria. You're almost there. Don't push through warning signs on the last day.",
    ],
  },
];

export function getGuideForDay(day: number): DayGuide {
  if (day <= 7) {
    return dailyGuides[day - 1];
  }
  return {
    day,
    title: `Day ${day}`,
    subtitle: "Continuing",
    whatsHappening:
      "Deep autophagy continues. Your body is maintaining the renovation work it started. Every system is running on clean, efficient fuel.",
    whatToExpect: [
      "Similar to Days 6-7",
      "Stable energy and clarity",
      "The quiet continues",
      "Monitor closely — extended fasts require extra attention",
    ],
    tips: [
      "Electrolytes are even more critical now. Do not skip.",
      "Check blood pressure morning and evening.",
      "Light activity only. Listen to your body.",
      "Review your refeeding plan — you'll need it soon.",
    ],
    watchFor: [
      "All previous criteria apply with increased importance.",
      "Any new symptoms at this stage should be taken seriously.",
      "When in doubt, break the fast. You've already accomplished something extraordinary.",
    ],
  };
}

export const checklistItems = [
  { id: "morningLMNT", label: "Morning electrolyte packet", group: "Electrolytes" },
  { id: "morningBroth", label: "Morning bone broth with salt", group: "Electrolytes" },
  { id: "middayLMNT", label: "Midday electrolyte packet", group: "Electrolytes" },
  { id: "afternoonLMNT", label: "Afternoon electrolyte packet", group: "Electrolytes" },
  { id: "eveningBroth", label: "Evening bone broth with salt", group: "Electrolytes" },
  { id: "prebedLMNT", label: "Pre-bed electrolyte packet", group: "Electrolytes" },
  { id: "magnesium", label: "Magnesium 200mg with bone broth", group: "Supplements" },
  { id: "chamomile", label: "Chamomile tea", group: "Supplements" },
  { id: "buddyCheckin", label: "Checked in with fasting buddy", group: "Basics" },
];

export const cravingTools = [
  { icon: "salt", label: "Salt on tongue", description: "Kills cravings fast" },
  { icon: "tea", label: "Hot tea", description: "Warmth and ritual help" },
  { icon: "broth", label: "Bone broth", description: "The heavy weapon for hard moments" },
  { icon: "water", label: "Sparkling water", description: "Gives your mouth something to do" },
  { icon: "walk", label: "Walk 10-15 min", description: "Hunger waves pass in 15-20 minutes" },
  { icon: "brush", label: "Brush your teeth", description: 'Mint signals "eating is done"' },
  { icon: "journal", label: "Journal", description: "Process what you're feeling" },
  { icon: "pickle", label: "Pickle juice", description: "Salt hit with flavor" },
];

export const stopCriteria = [
  { text: "Muscle twitching that doesn't stop with electrolytes within 2 hours", severity: "high" as const },
  { text: "Tingling, buzzing, or electric sensations in your body", severity: "high" as const },
  { text: "Sustained dizziness that doesn't resolve with salt, water, and rest", severity: "high" as const },
  { text: "Heart palpitations or irregular heartbeat", severity: "high" as const },
  { text: "Confusion (not brain fog — actual confusion)", severity: "high" as const },
  { text: "Persistent diarrhea (more than 3 episodes per day after Day 3)", severity: "medium" as const },
  { text: "Chest pain or pressure — call 911", severity: "critical" as const },
  { text: "Something feels deeply wrong and you can't explain it — trust that feeling", severity: "high" as const },
];

export const refeedingGuide = {
  day1: {
    title: "First meal (Day after fast)",
    meals: [
      { time: "Morning", description: "Bone broth only. Sip for 30 minutes." },
      { time: "A few hours later", description: "Small portion: eggs and avocado, or bone broth with soft vegetables" },
      { time: "Dinner", description: "Gentle protein (fish, chicken) with cooked vegetables. Small portions. Eat slowly. Stop before full." },
    ],
  },
  avoid: [
    "Sugar, soda, candy",
    "Bread, pasta, processed carbs",
    "Dairy (reintroduce slowly on Day 10+)",
    "Large portions",
    "Eating fast",
    "Fried food, fast food",
  ],
  note: "Resume any paused supplements on Day 9 with a meal containing fat.",
};
