"use client";

import { useState, useEffect, useCallback } from "react";
import TopBar from "@/components/TopBar";
import ChecklistItem from "@/components/ChecklistItem";
import { checklistItems } from "@/lib/content";
import {
  getChecklists,
  setChecklistItem,
  getFastConfig,
  getFastProgress,
  getWaterOz,
  setWaterOz,
} from "@/lib/storage";

const groups = ["Electrolytes", "Supplements", "Basics"] as const;
const WATER_TARGET = 80;
const WATER_INCREMENT = 10;

function WaterBottle({ oz, onAdd, onRemove }: { oz: number; onAdd: () => void; onRemove: () => void }) {
  const fillPercent = Math.min(oz / WATER_TARGET, 1);
  const bottleWidth = 120;
  const bottleHeight = 200;
  const wallThickness = 3;
  const cornerRadius = 16;
  const neckWidth = 50;
  const neckHeight = 24;
  const innerWidth = bottleWidth - wallThickness * 2;
  const innerHeight = bottleHeight - wallThickness * 2 - neckHeight;
  const fillHeight = innerHeight * fillPercent;
  const innerY = wallThickness + neckHeight;

  return (
    <div className="flex flex-col items-center gap-3">
      <svg
        width={bottleWidth}
        height={bottleHeight}
        viewBox={`0 0 ${bottleWidth} ${bottleHeight}`}
        className="drop-shadow-sm"
      >
        {/* Bottle outline */}
        <path
          d={`
            M ${(bottleWidth - neckWidth) / 2} 0
            L ${(bottleWidth - neckWidth) / 2} ${neckHeight - 8}
            Q ${(bottleWidth - neckWidth) / 2} ${neckHeight} ${wallThickness} ${neckHeight + 8}
            L ${wallThickness} ${bottleHeight - cornerRadius}
            Q ${wallThickness} ${bottleHeight - wallThickness} ${cornerRadius} ${bottleHeight - wallThickness}
            L ${bottleWidth - cornerRadius} ${bottleHeight - wallThickness}
            Q ${bottleWidth - wallThickness} ${bottleHeight - wallThickness} ${bottleWidth - wallThickness} ${bottleHeight - cornerRadius}
            L ${bottleWidth - wallThickness} ${neckHeight + 8}
            Q ${bottleWidth - wallThickness} ${neckHeight} ${(bottleWidth + neckWidth) / 2} ${neckHeight - 8}
            L ${(bottleWidth + neckWidth) / 2} 0
            Z
          `}
          fill="none"
          stroke="#5B9E8F"
          strokeWidth={wallThickness}
          strokeOpacity={0.3}
        />
        {/* Water fill */}
        {fillPercent > 0 && (
          <rect
            x={wallThickness + 1}
            y={innerY + innerHeight - fillHeight}
            width={innerWidth - 2}
            height={fillHeight}
            rx={fillHeight >= innerHeight ? 0 : 6}
            fill="#5B9E8F"
            fillOpacity={0.6}
          />
        )}
        {/* Cap */}
        <rect
          x={(bottleWidth - neckWidth + 4) / 2}
          y={0}
          width={neckWidth - 4}
          height={6}
          rx={3}
          fill="#5B9E8F"
          fillOpacity={0.3}
        />
      </svg>

      <span className="font-mono text-sm text-charcoal">
        {oz}/{WATER_TARGET} oz
      </span>

      <div className="flex items-center gap-3">
        <button
          onClick={onRemove}
          disabled={oz <= 0}
          className="w-9 h-9 rounded-full bg-seafoam/15 text-seafoam font-bold text-lg flex items-center justify-center disabled:opacity-30 transition-opacity active:scale-95"
          aria-label="Remove 10oz"
        >
          &minus;
        </button>
        <span className="text-xs text-dust font-medium w-12 text-center">10 oz</span>
        <button
          onClick={onAdd}
          disabled={oz >= WATER_TARGET}
          className="w-9 h-9 rounded-full bg-seafoam/15 text-seafoam font-bold text-lg flex items-center justify-center disabled:opacity-30 transition-opacity active:scale-95"
          aria-label="Add 10oz"
        >
          +
        </button>
      </div>
    </div>
  );
}

function PerfectDayBadge() {
  return (
    <div className="mx-5 mt-5 mb-0 animate-fade-in">
      <div className="rounded-xl border border-seafoam/40 bg-seafoam/5 px-5 py-4 flex items-center gap-3">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="shrink-0">
          <path
            d="M12 2L14.09 8.26L20.18 8.64L15.54 12.74L17.12 18.77L12 15.27L6.88 18.77L8.46 12.74L3.82 8.64L9.91 8.26L12 2Z"
            fill="#5B9E8F"
            fillOpacity={0.6}
            stroke="#5B9E8F"
            strokeWidth={1.5}
            strokeLinejoin="round"
          />
        </svg>
        <span className="font-display text-lg text-charcoal">Perfect Day</span>
      </div>
    </div>
  );
}

export default function ChecklistPage() {
  const [currentDay, setCurrentDay] = useState(1);
  const [checkedState, setCheckedState] = useState<Record<string, boolean>>({});
  const [waterOz, setWaterOzState] = useState(0);

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
      setWaterOzState(getWaterOz(progress.currentDay));
    }
  }, []);

  const handleChange = useCallback(
    (itemId: string, checked: boolean) => {
      setChecklistItem(currentDay, itemId, checked);
      setCheckedState((prev) => ({ ...prev, [itemId]: checked }));
    },
    [currentDay]
  );

  const handleAddWater = useCallback(() => {
    const next = Math.min(waterOz + WATER_INCREMENT, WATER_TARGET);
    setWaterOz(currentDay, next);
    setWaterOzState(next);
  }, [currentDay, waterOz]);

  const handleRemoveWater = useCallback(() => {
    const next = Math.max(waterOz - WATER_INCREMENT, 0);
    setWaterOz(currentDay, next);
    setWaterOzState(next);
  }, [currentDay, waterOz]);

  const handleReset = useCallback(() => {
    const cleared: Record<string, boolean> = {};
    checklistItems.forEach((item) => {
      cleared[item.id] = false;
      setChecklistItem(currentDay, item.id, false);
    });
    setCheckedState(cleared);
    setWaterOz(currentDay, 0);
    setWaterOzState(0);
  }, [currentDay]);

  const completedCount = checklistItems.filter((item) => checkedState[item.id]).length;
  const totalCount = checklistItems.length;
  const allChecked = completedCount === totalCount;
  const isPerfectDay = allChecked && waterOz >= WATER_TARGET;

  return (
    <div className="min-h-screen bg-parchment">
      <TopBar title="Daily Checklist" showBack />

      {/* Perfect Day Badge */}
      {isPerfectDay && <PerfectDayBadge />}

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

      {/* Water Intake */}
      <div className="px-5 pb-4">
        <div className="bg-white rounded-xl border border-sand px-5 py-5">
          <span className="text-[11px] font-bold tracking-widest uppercase text-dust block mb-4">
            Water Intake
          </span>
          <WaterBottle oz={waterOz} onAdd={handleAddWater} onRemove={handleRemoveWater} />
        </div>
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
