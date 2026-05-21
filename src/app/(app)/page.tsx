"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import TopBar from "@/components/TopBar";
import { getFastConfig, getFastProgress, getChecklists } from "@/lib/storage";
import { getGuideForDay, checklistItems } from "@/lib/content";
import { CheckSquare, Activity, BookOpen, AlertTriangle } from "lucide-react";
import type { FastConfig, ChecklistState } from "@/lib/storage";
import type { DayGuide } from "@/lib/content";

interface Progress {
  currentDay: number;
  currentHour: number;
  totalHours: number;
  elapsedHours: number;
  percentComplete: number;
  hoursRemaining: number;
  isComplete: boolean;
}

const quickActions = [
  {
    label: "Checklist",
    href: "/checklist",
    icon: CheckSquare,
    border: "rgba(196,147,90,0.25)",
    bg: "rgba(196,147,90,0.04)",
    color: "#A07A45",
  },
  {
    label: "Log Vitals",
    href: "/vitals",
    icon: Activity,
    border: "rgba(107,142,181,0.25)",
    bg: "rgba(107,142,181,0.04)",
    color: "#5A7A9E",
  },
  {
    label: "Day Guide",
    href: "/guide",
    icon: BookOpen,
    border: "rgba(91,158,143,0.25)",
    bg: "rgba(91,158,143,0.04)",
    color: "#4E8A7D",
  },
  {
    label: "Stop Criteria",
    href: "/stop",
    icon: AlertTriangle,
    border: "rgba(184,84,80,0.25)",
    bg: "rgba(184,84,80,0.04)",
    color: "#B85450",
  },
];

export default function DashboardPage() {
  const [config, setConfig] = useState<FastConfig | null>(null);
  const [progress, setProgress] = useState<Progress | null>(null);
  const [guide, setGuide] = useState<DayGuide | null>(null);
  const [todayChecklist, setTodayChecklist] = useState<ChecklistState>({});

  // Load data on mount
  useEffect(() => {
    const cfg = getFastConfig();
    if (!cfg) return;
    setConfig(cfg);

    const prog = getFastProgress(cfg);
    setProgress(prog);
    setGuide(getGuideForDay(prog.currentDay));

    const checklists = getChecklists();
    setTodayChecklist(checklists[`day${prog.currentDay}`] || {});
  }, []);

  // Update progress every minute
  useEffect(() => {
    if (!config) return;

    const interval = setInterval(() => {
      const prog = getFastProgress(config);
      setProgress(prog);
      setGuide(getGuideForDay(prog.currentDay));

      const checklists = getChecklists();
      setTodayChecklist(checklists[`day${prog.currentDay}`] || {});
    }, 60_000);

    return () => clearInterval(interval);
  }, [config]);

  const completedCount = checklistItems.filter((item) => todayChecklist[item.id]).length;
  const totalItems = checklistItems.length;
  const previewItems = checklistItems.slice(0, 5);

  if (!config || !progress || !guide) {
    return (
      <>
        <TopBar title="Fast Guide." showSettings={true} />
        <div className="flex items-center justify-center min-h-[60vh]">
          <p className="text-dust text-sm">Loading...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <TopBar title="Fast Guide." showSettings={true} />

      <main className="px-5 py-6 pb-32 space-y-5">
        {/* Header Section */}
        <section>
          <p className="text-[11px] font-semibold tracking-widest uppercase text-dust">
            DAY {progress.currentDay} OF {config.targetDays}
          </p>
          <h2 className="font-display text-[28px] text-charcoal mt-1">
            {guide.subtitle}
          </h2>
        </section>

        {/* Status Card */}
        <section className="bg-white border border-sand rounded-2xl p-5 shadow">
          <h3 className="font-display text-[22px] text-charcoal">
            Day {progress.currentDay} — Hour {progress.currentHour}
          </h3>
          <p className="font-mono text-sm text-stone mt-1">
            {progress.percentComplete.toFixed(1)}% complete
          </p>

          {/* Progress Bar */}
          <div className="mt-3 h-2 rounded-full bg-sand overflow-hidden">
            <div
              className="h-full rounded-full transition-all duration-500"
              style={{
                width: `${Math.min(progress.percentComplete, 100)}%`,
                background: "linear-gradient(90deg, #5B9E8F, #C4935A)",
              }}
            />
          </div>

          <p className="text-xs text-dust mt-2">
            ~{Math.round(progress.hoursRemaining)} hours remaining
          </p>
        </section>

        {/* Today's Card */}
        <section className="bg-white border border-sand rounded-xl p-5 shadow-sm">
          <p className="text-[11px] font-semibold tracking-widest uppercase text-dust">
            WHAT TO EXPECT TODAY
          </p>
          <h3 className="font-display text-lg text-charcoal mt-2">
            {guide.subtitle}
          </h3>
          <p className="text-[15px] text-stone leading-relaxed mt-2">
            {guide.whatToExpect[0]}
          </p>
        </section>

        {/* Quick Actions Grid */}
        <section className="grid grid-cols-2 gap-3">
          {quickActions.map((action) => {
            const Icon = action.icon;
            return (
              <Link
                key={action.href}
                href={action.href}
                className="bg-white border rounded-xl p-4 flex flex-col items-center gap-2 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                style={{
                  borderColor: action.border,
                  backgroundColor: action.bg,
                }}
              >
                <Icon size={24} strokeWidth={1.75} style={{ color: action.color }} />
                <span
                  className="text-[13px] font-semibold"
                  style={{ color: action.color }}
                >
                  {action.label}
                </span>
              </Link>
            );
          })}
        </section>

        {/* Checklist Preview */}
        <section className="bg-white border border-sand rounded-xl p-5 shadow-sm">
          <p className="text-[11px] font-semibold tracking-widest uppercase text-dust">
            TODAY&apos;S CHECKLIST &middot; {completedCount}/{totalItems}
          </p>

          <ul className="mt-3 space-y-2.5">
            {previewItems.map((item) => {
              const checked = todayChecklist[item.id] || false;
              return (
                <li key={item.id} className="flex items-center gap-3">
                  <div
                    className={`w-5 h-5 rounded flex items-center justify-center border ${
                      checked
                        ? "bg-amber border-amber"
                        : "border-sand bg-white"
                    }`}
                  >
                    {checked && (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        className="text-white"
                      >
                        <path
                          d="M2.5 6L5 8.5L9.5 3.5"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </div>
                  <span
                    className={`text-sm ${
                      checked ? "text-dust line-through" : "text-charcoal"
                    }`}
                  >
                    {item.label}
                  </span>
                </li>
              );
            })}
          </ul>

          <Link
            href="/checklist"
            className="block mt-4 text-sm font-semibold text-seafoam hover:text-seafoam-dark transition-colors"
          >
            View full checklist &rarr;
          </Link>
        </section>
      </main>

      {/* SOS FAB */}
      <Link
        href="/sos"
        className="fixed bottom-[88px] right-6 w-14 h-14 bg-seafoam rounded-full flex items-center justify-center text-white font-semibold text-sm z-100 hover:bg-seafoam-dark transition-colors"
        style={{ boxShadow: "0 4px 14px rgba(91,158,143,0.25)" }}
      >
        SOS
      </Link>
    </>
  );
}
