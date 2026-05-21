"use client";

import { useState, useEffect, useCallback } from "react";
import TopBar from "@/components/TopBar";
import ChecklistItem from "@/components/ChecklistItem";
import { checklistItems } from "@/lib/content";
import { getChecklists, setChecklistItem, getFastConfig, getFastProgress } from "@/lib/storage";

const groups = ["Electrolytes", "Supplements", "Basics"] as const;

export default function ChecklistPage() {
  const [currentDay, setCurrentDay] = useState(1);
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const config = getFastConfig();
    if (config) {
      const progress = getFastProgress(config);
      setCurrentDay(progress.currentDay);
    }

    // Load checklist state for current day
    const all = getChecklists();
    const config2 = getFastConfig();
    if (config2) {
      const progress = getFastProgress(config2);
      const dayKey = `day${progress.currentDay}`;
      setCheckedState(all[dayKey] || {});
    }
  }, []);

  const handleChange = useCallback(
    (itemId: string, checked: boolean) => {
      setChecklistItem(currentDay, itemId, checked);
      setCheckedState((prev) => ({ ...prev, [itemId]: checked }));
    },
    [currentDay]
  );

  const handleReset = useCallback(() => {
    const cleared: Record<string, boolean> = {};
    checklistItems.forEach((item) => {
      cleared[item.id] = false;
      setChecklistItem(currentDay, item.id, false);
    });
    setCheckedState(cleared);
  }, [currentDay]);

  const completedCount = checklistItems.filter((item) => checkedState[item.id]).length;
  const totalCount = checklistItems.length;

  return (
    <div className="min-h-screen bg-parchment">
      <TopBar title="Daily Checklist" showBack />

      {/* Progress */}
      <div className="px-5 pt-5 pb-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-charcoal">
            {completedCount}/{totalCount} completed
          </span>
          <span className="text-sm text-stone">Day {currentDay}</span>
        </div>
        <div className="w-full h-2 bg-sand rounded-full overflow-hidden">
          <div
            className="h-full bg-seafoam rounded-full transition-all duration-300"
            style={{ width: `${(completedCount / totalCount) * 100}%` }}
          />
        </div>
      </div>

      {/* Grouped checklist items */}
      <div className="px-5 py-4 space-y-4">
        {groups.map((group) => {
          const items = checklistItems.filter((item) => item.group === group);
          return (
            <div
              key={group}
              className="bg-white rounded-xl border border-sand px-5 py-4"
            >
              <span className="text-[11px] font-bold tracking-widest uppercase text-dust block mb-2">
                {group}
              </span>
              <div className="divide-y divide-sand/50">
                {items.map((item) => (
                  <ChecklistItem
                    key={item.id}
                    label={item.label}
                    checked={!!checkedState[item.id]}
                    onChange={(checked) => handleChange(item.id, checked)}
                  />
                ))}
              </div>
            </div>
          );
        })}
      </div>

      {/* Reset button */}
      <div className="px-5 pb-10 pt-2">
        <button
          onClick={handleReset}
          className="w-full py-3 rounded-xl border border-sand text-stone text-sm font-medium hover:bg-sand/30 transition-colors"
        >
          Reset Day
        </button>
      </div>
    </div>
  );
}
