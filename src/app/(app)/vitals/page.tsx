"use client";

import { useState, useEffect, useCallback } from "react";
import TopBar from "@/components/TopBar";
import {
  getVitals,
  setVitalsEntry,
  getFastConfig,
  getFastProgress,
  VitalsEntry,
} from "@/lib/storage";

type TimeOfDay = "morning" | "evening";

export default function VitalsPage() {
  const [timeOfDay, setTimeOfDay] = useState<TimeOfDay>("morning");
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [weight, setWeight] = useState("");
  const [energy, setEnergy] = useState<number | null>(null);
  const [mood, setMood] = useState<number | null>(null);
  const [notes, setNotes] = useState("");
  const [entries, setEntries] = useState<[string, VitalsEntry][]>([]);
  const [saved, setSaved] = useState(false);

  // Load previous entries
  useEffect(() => {
    const all = getVitals();
    const sorted = Object.entries(all).sort(
      (a, b) => new Date(b[1].timestamp).getTime() - new Date(a[1].timestamp).getTime()
    );
    setEntries(sorted);
  }, [saved]);

  const handleSave = useCallback(() => {
    const config = getFastConfig();
    const day = config ? getFastProgress(config).currentDay : 1;
    const key = `day${day}-${timeOfDay}`;

    const entry: VitalsEntry = {
      timestamp: new Date().toISOString(),
      ...(systolic ? { systolic: Number(systolic) } : {}),
      ...(diastolic ? { diastolic: Number(diastolic) } : {}),
      ...(heartRate ? { heartRate: Number(heartRate) } : {}),
      ...(weight ? { weight: Number(weight) } : {}),
      ...(energy !== null ? { energy } : {}),
      ...(mood !== null ? { mood } : {}),
      ...(notes ? { notes } : {}),
    };

    setVitalsEntry(key, entry);
    setSaved(true);

    // Reset form
    setSystolic("");
    setDiastolic("");
    setHeartRate("");
    setWeight("");
    setEnergy(null);
    setMood(null);
    setNotes("");

    setTimeout(() => setSaved(false), 2000);
  }, [timeOfDay, systolic, diastolic, heartRate, weight, energy, mood, notes]);

  const inputClass =
    "w-[100px] min-h-[48px] rounded-lg border border-sand px-3 py-2 text-center font-mono text-charcoal focus:border-seafoam focus:outline-none transition-colors";

  return (
    <div className="flex flex-col min-h-screen bg-parchment">
      <TopBar title="Log Vitals" showBack />

      <div className="px-6 py-6 pb-32 flex flex-col gap-8">
        {/* Morning / Evening toggle */}
        <div className="flex gap-2">
          {(["morning", "evening"] as TimeOfDay[]).map((t) => (
            <button
              key={t}
              onClick={() => setTimeOfDay(t)}
              className={`flex-1 py-3 rounded-full text-sm font-semibold capitalize transition-colors ${
                timeOfDay === t
                  ? "bg-seafoam text-white"
                  : "bg-sand/50 text-stone hover:bg-sand"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Blood pressure */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-stone">Blood Pressure</label>
          <div className="flex items-center gap-3">
            <input
              type="number"
              inputMode="numeric"
              placeholder="SYS"
              value={systolic}
              onChange={(e) => setSystolic(e.target.value)}
              className={inputClass}
            />
            <span className="text-dust text-lg">/</span>
            <input
              type="number"
              inputMode="numeric"
              placeholder="DIA"
              value={diastolic}
              onChange={(e) => setDiastolic(e.target.value)}
              className={inputClass}
            />
          </div>
        </div>

        {/* Heart rate */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-stone">Heart Rate</label>
          <input
            type="number"
            inputMode="numeric"
            placeholder="BPM"
            value={heartRate}
            onChange={(e) => setHeartRate(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Weight */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-stone">
            Weight <span className="text-dust font-normal">(optional)</span>
          </label>
          <input
            type="number"
            inputMode="decimal"
            placeholder="lbs"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            className={inputClass}
          />
        </div>

        {/* Energy */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-stone">Energy</label>
          <div className="flex gap-2">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setEnergy(n)}
                className={`w-8 h-8 rounded-full text-xs font-mono font-semibold transition-colors ${
                  energy !== null && n <= energy
                    ? "bg-seafoam text-white"
                    : "bg-sand/50 text-stone hover:bg-sand"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Mood */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-stone">Mood</label>
          <div className="flex gap-2">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setMood(n)}
                className={`w-8 h-8 rounded-full text-xs font-mono font-semibold transition-colors ${
                  mood !== null && n <= mood
                    ? "bg-seafoam text-white"
                    : "bg-sand/50 text-stone hover:bg-sand"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Notes */}
        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-stone">Notes</label>
          <textarea
            rows={3}
            placeholder="How are you feeling?"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full min-h-[48px] rounded-lg border border-sand px-4 py-3 font-body text-charcoal placeholder:text-dust focus:border-seafoam focus:outline-none transition-colors resize-none"
          />
        </div>

        {/* Save button */}
        <button
          onClick={handleSave}
          className="w-full py-3.5 rounded-full bg-seafoam text-white font-semibold text-[15px] transition-colors hover:bg-seafoam-dark active:bg-seafoam-deeper"
        >
          {saved ? "Saved ✓" : "Save"}
        </button>

        {/* Previous entries */}
        {entries.length > 0 && (
          <div className="flex flex-col gap-4">
            <h3 className="text-sm font-semibold text-stone uppercase tracking-wide">
              Previous Entries
            </h3>
            <div className="flex flex-col gap-2">
              {entries.map(([key, entry]) => {
                const date = new Date(entry.timestamp);
                const label = key.includes("morning") ? "AM" : key.includes("evening") ? "PM" : "";
                return (
                  <div
                    key={key}
                    className="bg-warm-bg rounded-lg px-4 py-3 flex flex-col gap-1"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs text-stone">
                        {date.toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}{" "}
                        {label}
                      </span>
                      <span className="text-xs text-dust capitalize">
                        {key.replace("-", " · ")}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-charcoal">
                      {entry.systolic && entry.diastolic && (
                        <span className="font-mono">
                          BP {entry.systolic}/{entry.diastolic}
                        </span>
                      )}
                      {entry.heartRate && (
                        <span className="font-mono">HR {entry.heartRate}</span>
                      )}
                      {entry.energy && (
                        <span>Energy {entry.energy}/10</span>
                      )}
                      {entry.mood && <span>Mood {entry.mood}/10</span>}
                    </div>
                    {entry.notes && (
                      <p className="text-xs text-stone mt-1 italic">{entry.notes}</p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
