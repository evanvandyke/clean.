"use client";

import { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import TopBar from "@/components/TopBar";
import { getFastConfig, getFastProgress } from "@/lib/storage";
import { getGuideForDay, type DayGuide } from "@/lib/content";

function CollapsibleSection({
  title,
  children,
  variant = "default",
}: {
  title: string;
  children: React.ReactNode;
  variant?: "default" | "warning";
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl border border-sand overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-5 py-4 text-left"
      >
        <span
          className={`font-display text-lg font-semibold ${
            variant === "warning" ? "text-coral" : "text-charcoal"
          }`}
        >
          {title}
        </span>
        <ChevronDown
          size={20}
          strokeWidth={1.75}
          className={`text-stone transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open && (
        <div className="px-5 pb-5 pt-0">
          {children}
        </div>
      )}
    </div>
  );
}

export default function GuidePage() {
  const [selectedDay, setSelectedDay] = useState(1);
  const [guide, setGuide] = useState<DayGuide | null>(null);
  const [targetDays, setTargetDays] = useState(7);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const config = getFastConfig();
    if (config) {
      const progress = getFastProgress(config);
      setSelectedDay(progress.currentDay);
      setTargetDays(config.targetDays);
    }
  }, []);

  useEffect(() => {
    setGuide(getGuideForDay(selectedDay));
  }, [selectedDay]);

  // Scroll active day button into view
  useEffect(() => {
    if (scrollRef.current) {
      const activeBtn = scrollRef.current.querySelector("[data-active='true']");
      if (activeBtn) {
        activeBtn.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
      }
    }
  }, [selectedDay]);

  if (!guide) return null;

  return (
    <div className="min-h-screen bg-parchment">
      <TopBar title="Daily Guide" showBack />

      {/* Day selector */}
      <div
        ref={scrollRef}
        className="flex gap-2 px-5 py-4 overflow-x-auto scrollbar-hide"
      >
        {Array.from({ length: targetDays }, (_, i) => i + 1).map((day) => (
          <button
            key={day}
            data-active={day === selectedDay}
            onClick={() => setSelectedDay(day)}
            className={`shrink-0 w-10 h-10 rounded-full text-sm font-semibold transition-colors ${
              day === selectedDay
                ? "bg-seafoam text-white"
                : "bg-white border border-sand text-stone hover:border-seafoam"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Day header */}
      <div className="px-5 pb-4">
        <h2 className="font-display text-[36px] leading-tight text-charcoal">
          {guide.title}
        </h2>
        <p className="text-stone text-lg mt-1">{guide.subtitle}</p>
      </div>

      {/* Sections */}
      <div className="px-5 pb-10 space-y-0">
        <CollapsibleSection title="What's happening inside">
          <p className="font-body text-lg leading-relaxed text-charcoal">
            {guide.whatsHappening}
          </p>
        </CollapsibleSection>

        <p className="text-muted-stone text-center py-3 tracking-[0.25em] text-sm select-none">
          · · ·
        </p>

        <CollapsibleSection title="What to expect">
          <ul className="space-y-2">
            {guide.whatToExpect.map((item, i) => (
              <li key={i} className="font-body text-lg leading-relaxed text-charcoal flex gap-2">
                <span className="text-stone mt-0.5 shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CollapsibleSection>

        <p className="text-muted-stone text-center py-3 tracking-[0.25em] text-sm select-none">
          · · ·
        </p>

        <CollapsibleSection title="Tips">
          <ul className="space-y-2">
            {guide.tips.map((item, i) => (
              <li key={i} className="font-body text-lg leading-relaxed text-charcoal flex gap-2">
                <span className="text-stone mt-0.5 shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CollapsibleSection>

        <p className="text-muted-stone text-center py-3 tracking-[0.25em] text-sm select-none">
          · · ·
        </p>

        <CollapsibleSection title="Watch for" variant="warning">
          <ul className="space-y-2">
            {guide.watchFor.map((item, i) => (
              <li key={i} className="font-body text-lg leading-relaxed text-charcoal flex gap-2">
                <span className="text-coral mt-0.5 shrink-0">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </CollapsibleSection>
      </div>
    </div>
  );
}
