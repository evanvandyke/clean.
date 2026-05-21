"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { setFastConfig, getFastConfig } from "@/lib/storage";

const DAY_OPTIONS = [1, 3, 5, 7, 10];

function toLocalDatetimeString(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, "0");
  const d = String(date.getDate()).padStart(2, "0");
  const h = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  return `${y}-${m}-${d}T${h}:${min}`;
}

export default function SetupPage() {
  const router = useRouter();
  const [startDate, setStartDate] = useState(() =>
    toLocalDatetimeString(new Date())
  );
  const [targetDays, setTargetDays] = useState<number | null>(null);

  // If config already exists, redirect to home
  useEffect(() => {
    const config = getFastConfig();
    if (config) {
      router.replace("/");
    }
  }, [router]);

  const handleStart = useCallback(() => {
    if (!targetDays) return;

    const dateValue = new Date(startDate);
    setFastConfig({
      startDate: dateValue.toISOString(),
      targetDays,
    });
    router.replace("/");
  }, [startDate, targetDays, router]);

  return (
    <div className="flex-1 flex flex-col min-h-dvh bg-parchment px-6 py-12">
      {/* Wordmark */}
      <div className="text-center mb-12">
        <h1 className="font-display text-3xl text-charcoal select-none">
          Fast Guide<span className="text-seafoam">.</span>
        </h1>
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col max-w-sm mx-auto w-full">
        {/* Start date/time */}
        <div className="mb-10">
          <label
            htmlFor="start-date"
            className="font-display text-xl text-charcoal block mb-4"
          >
            When did you start your fast?
          </label>
          <input
            id="start-date"
            type="datetime-local"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="w-full rounded-xl border-2 border-sand bg-white px-4 py-3 text-charcoal
                       font-body text-base outline-none
                       focus:border-seafoam focus:ring-1 focus:ring-seafoam/30
                       transition-colors min-h-[48px]"
          />
        </div>

        {/* Duration selector */}
        <div className="mb-auto">
          <p className="font-display text-xl text-charcoal mb-4">
            How many days?
          </p>
          <div className="flex flex-wrap gap-3">
            {DAY_OPTIONS.map((days) => (
              <button
                key={days}
                onClick={() => setTargetDays(days)}
                className={`rounded-full px-5 py-2.5 text-base font-medium min-h-[48px]
                           border-2 transition-all duration-150 select-none
                           ${
                             targetDays === days
                               ? "bg-seafoam border-seafoam text-white"
                               : "bg-white border-sand text-charcoal hover:border-stone"
                           }`}
              >
                {days}
              </button>
            ))}
          </div>
        </div>

        {/* Start button */}
        <div className="pt-8 pb-4">
          <button
            onClick={handleStart}
            disabled={!targetDays}
            className={`w-full rounded-xl py-4 text-lg font-semibold min-h-[48px]
                       transition-all duration-200 select-none
                       ${
                         targetDays
                           ? "bg-seafoam text-white active:bg-seafoam-dark"
                           : "bg-sand text-dust cursor-not-allowed"
                       }`}
          >
            Start Fast
          </button>
        </div>
      </div>
    </div>
  );
}
