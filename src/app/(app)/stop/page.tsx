"use client";

import { useRouter } from "next/navigation";
import TopBar from "@/components/TopBar";
import { stopCriteria } from "@/lib/content";

export default function StopPage() {
  const router = useRouter();

  return (
    <div className="flex flex-col min-h-screen bg-parchment">
      <TopBar title="Stop Criteria" showBack />

      {/* Header */}
      <div className="bg-muted-red px-6 py-8">
        <h2 className="font-display text-[26px] text-white leading-tight">
          When to Stop
        </h2>
        <p className="font-body text-white/80 mt-2 text-[15px]">
          Break the fast immediately if:
        </p>
      </div>

      {/* Criteria list */}
      <div className="px-6 py-6 flex flex-col gap-1">
        {stopCriteria.map((item, i) => {
          const isCritical = item.severity === "critical";
          return (
            <div
              key={i}
              className={`flex items-start gap-3 py-4 ${
                i < stopCriteria.length - 1 ? "border-b border-sand" : ""
              }`}
            >
              <div
                className={`mt-1.5 shrink-0 rounded-full ${
                  isCritical ? "w-3 h-3" : "w-2.5 h-2.5"
                }`}
                style={{
                  backgroundColor: isCritical ? "#991B1B" : "#B85450",
                }}
              />
              <p
                className={`font-body leading-relaxed ${
                  isCritical
                    ? "text-[16px] font-bold text-charcoal"
                    : "text-[15px] text-charcoal"
                }`}
              >
                {item.text}
              </p>
            </div>
          );
        })}
      </div>

      {/* Break fast button */}
      <div className="px-6 py-4">
        <button
          onClick={() => router.push("/refeeding")}
          className="w-full py-3.5 rounded-full border-2 border-muted-red text-muted-red font-semibold text-[15px] transition-colors hover:bg-muted-red hover:text-white"
          style={{ backgroundColor: "transparent" }}
        >
          Break Your Fast Safely
        </button>
      </div>

      {/* Footer note */}
      <div className="px-6 pb-28 pt-4">
        <p className="font-display italic text-stone text-[15px] leading-relaxed">
          Stopping at any point is a win. 3 days gets you into ketosis. 5 days
          is extraordinary. 7 days is the full cycle.
        </p>
      </div>
    </div>
  );
}
