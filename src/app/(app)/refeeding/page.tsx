"use client";

import TopBar from "@/components/TopBar";
import { refeedingGuide } from "@/lib/content";

export default function RefeedingPage() {
  return (
    <>
      <TopBar title="Refeeding Guide" showBack />

      <main className="px-5 py-6 pb-32 space-y-6">
        {/* Header */}
        <section>
          <h2 className="font-display text-[28px] text-charcoal">
            Breaking the Fast
          </h2>
          <p className="text-[18px] text-stone leading-relaxed mt-2">
            How you refeed matters as much as the fast itself.
          </p>
        </section>

        {/* Dot separator */}
        <p className="text-center text-dust tracking-[0.5em] text-sm">
          &middot; &middot; &middot;
        </p>

        {/* Day 1 Meals */}
        <section className="bg-white border border-sand rounded-xl p-5 shadow-sm">
          <p className="text-[11px] font-bold tracking-widest uppercase text-dust">
            {refeedingGuide.day1.title.toUpperCase()}
          </p>
          <div className="mt-4 space-y-5">
            {refeedingGuide.day1.meals.map((meal, i) => (
              <div key={i}>
                <p className="text-[11px] font-bold tracking-widest uppercase text-seafoam">
                  {meal.time.toUpperCase()}
                </p>
                <p className="text-[18px] text-charcoal leading-relaxed mt-1">
                  {meal.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Dot separator */}
        <p className="text-center text-dust tracking-[0.5em] text-sm">
          &middot; &middot; &middot;
        </p>

        {/* Foods to Avoid */}
        <section>
          <p className="text-[11px] font-bold tracking-widest uppercase text-dust">
            FOODS TO AVOID
          </p>
          <ul className="mt-3 space-y-2.5">
            {refeedingGuide.avoid.map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span
                  className="mt-[7px] w-2 h-2 rounded-full flex-shrink-0"
                  style={{ backgroundColor: "var(--color-coral)" }}
                />
                <span className="text-[18px] text-charcoal leading-relaxed">
                  {item}
                </span>
              </li>
            ))}
          </ul>
        </section>

        {/* Dot separator */}
        <p className="text-center text-dust tracking-[0.5em] text-sm">
          &middot; &middot; &middot;
        </p>

        {/* Supplements Note */}
        <section
          className="rounded-xl p-5"
          style={{
            backgroundColor: "rgba(107,142,181,0.08)",
            border: "1px solid rgba(107,142,181,0.15)",
          }}
        >
          <p className="text-[11px] font-bold tracking-widest uppercase text-soft-blue-label mb-2">
            NOTE
          </p>
          <p className="text-[18px] leading-relaxed" style={{ color: "var(--color-soft-blue-label)" }}>
            {refeedingGuide.note}
          </p>
        </section>
      </main>
    </>
  );
}
