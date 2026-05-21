"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import TopBar from "@/components/TopBar";
import {
  getFastConfig,
  setFastConfig,
  getPin,
  setPin,
  getChecklists,
  getFastProgress,
  clearAllData,
} from "@/lib/storage";
import type { FastConfig, ChecklistState } from "@/lib/storage";

const TARGET_OPTIONS = [1, 3, 5, 7, 10];

export default function SettingsPage() {
  const router = useRouter();
  const [config, setConfig] = useState<FastConfig | null>(null);
  const [editingDate, setEditingDate] = useState(false);
  const [dateValue, setDateValue] = useState("");

  // PIN flow
  const [pinStep, setPinStep] = useState<
    "idle" | "current" | "new" | "confirm"
  >("idle");
  const [pinInput, setPinInput] = useState("");
  const [newPin, setNewPin] = useState("");
  const [pinError, setPinError] = useState("");

  // Confirmation dialog
  const [showResetConfirm, setShowResetConfirm] = useState(false);

  useEffect(() => {
    const cfg = getFastConfig();
    if (cfg) {
      setConfig(cfg);
      setDateValue(cfg.startDate);
    }
  }, []);

  function handleTargetChange(days: number) {
    if (!config) return;
    const updated = { ...config, targetDays: days };
    setFastConfig(updated);
    setConfig(updated);
  }

  function handleDateSave() {
    if (!config || !dateValue) return;
    const updated = { ...config, startDate: dateValue };
    setFastConfig(updated);
    setConfig(updated);
    setEditingDate(false);
  }

  function handlePinSubmit() {
    if (pinStep === "current") {
      const stored = getPin();
      if (pinInput !== stored) {
        setPinError("Incorrect PIN");
        return;
      }
      setPinError("");
      setPinInput("");
      setPinStep("new");
    } else if (pinStep === "new") {
      if (pinInput.length < 4) {
        setPinError("PIN must be at least 4 digits");
        return;
      }
      setPinError("");
      setNewPin(pinInput);
      setPinInput("");
      setPinStep("confirm");
    } else if (pinStep === "confirm") {
      if (pinInput !== newPin) {
        setPinError("PINs don't match");
        return;
      }
      setPin(pinInput);
      setPinError("");
      setPinInput("");
      setNewPin("");
      setPinStep("idle");
    }
  }

  function handleResetChecklist() {
    if (!config) return;
    const progress = getFastProgress(config);
    const all = getChecklists();
    const dayKey = `day${progress.currentDay}`;
    delete all[dayKey];
    if (typeof window !== "undefined") {
      localStorage.setItem("checklists", JSON.stringify(all));
    }
  }

  function handleResetAll() {
    clearAllData();
    router.push("/pin");
  }

  const formatDate = (iso: string) => {
    try {
      const d = new Date(iso);
      return d.toLocaleString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      });
    } catch {
      return iso;
    }
  };

  return (
    <>
      <TopBar title="Settings" showBack />

      <main className="px-5 py-6 pb-32 space-y-6">
        {/* Fast Duration */}
        <section className="bg-white border border-sand rounded-xl p-5 shadow-sm">
          <p className="text-[11px] font-bold tracking-widest uppercase text-dust">
            FAST DURATION
          </p>
          <div className="flex items-center justify-between mt-3">
            <span className="text-[15px] text-charcoal font-medium">
              Target Days
            </span>
            <span className="text-[15px] text-stone font-mono">
              {config?.targetDays ?? "—"}
            </span>
          </div>
          <div className="flex gap-2 mt-3">
            {TARGET_OPTIONS.map((n) => (
              <button
                key={n}
                onClick={() => handleTargetChange(n)}
                className={`flex-1 py-2 rounded-full text-sm font-semibold transition-colors ${
                  config?.targetDays === n
                    ? "bg-seafoam text-white"
                    : "bg-sand/60 text-stone hover:bg-sand"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </section>

        {/* Start Date */}
        <section className="bg-white border border-sand rounded-xl p-5 shadow-sm">
          <p className="text-[11px] font-bold tracking-widest uppercase text-dust">
            START DATE
          </p>
          <div className="flex items-center justify-between mt-3">
            <span className="text-[15px] text-charcoal">
              {config ? formatDate(config.startDate) : "—"}
            </span>
            <button
              onClick={() => {
                setEditingDate(!editingDate);
                if (config) setDateValue(config.startDate);
              }}
              className="text-sm font-semibold text-seafoam hover:text-seafoam-dark transition-colors"
            >
              {editingDate ? "Cancel" : "Edit"}
            </button>
          </div>
          {editingDate && (
            <div className="mt-3 space-y-3">
              <input
                type="datetime-local"
                value={dateValue.slice(0, 16)}
                onChange={(e) => setDateValue(e.target.value)}
                className="w-full border border-sand rounded-lg px-3 py-2.5 text-sm text-charcoal bg-parchment focus:outline-none focus:ring-2 focus:ring-seafoam/30 focus:border-seafoam"
              />
              <button
                onClick={handleDateSave}
                className="w-full py-2.5 rounded-lg bg-seafoam text-white text-sm font-semibold hover:bg-seafoam-dark transition-colors"
              >
                Save
              </button>
            </div>
          )}
        </section>

        {/* PIN */}
        <section className="bg-white border border-sand rounded-xl p-5 shadow-sm">
          <p className="text-[11px] font-bold tracking-widest uppercase text-dust">
            PIN
          </p>

          {pinStep === "idle" ? (
            <button
              onClick={() => {
                setPinStep("current");
                setPinInput("");
                setPinError("");
              }}
              className="mt-3 w-full py-2.5 rounded-lg border border-sand text-sm font-semibold text-charcoal hover:bg-sand/40 transition-colors"
            >
              Change PIN
            </button>
          ) : (
            <div className="mt-3 space-y-3">
              <label className="block text-sm text-stone">
                {pinStep === "current" && "Enter current PIN"}
                {pinStep === "new" && "Enter new PIN"}
                {pinStep === "confirm" && "Confirm new PIN"}
              </label>
              <input
                type="password"
                inputMode="numeric"
                value={pinInput}
                onChange={(e) => {
                  setPinInput(e.target.value);
                  setPinError("");
                }}
                onKeyDown={(e) => e.key === "Enter" && handlePinSubmit()}
                className="w-full border border-sand rounded-lg px-3 py-2.5 text-sm text-charcoal text-center tracking-[0.3em] bg-parchment focus:outline-none focus:ring-2 focus:ring-seafoam/30 focus:border-seafoam"
                autoFocus
              />
              {pinError && (
                <p className="text-xs text-coral font-medium">{pinError}</p>
              )}
              <div className="flex gap-2">
                <button
                  onClick={() => {
                    setPinStep("idle");
                    setPinInput("");
                    setPinError("");
                    setNewPin("");
                  }}
                  className="flex-1 py-2.5 rounded-lg border border-sand text-sm font-semibold text-stone hover:bg-sand/40 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handlePinSubmit}
                  className="flex-1 py-2.5 rounded-lg bg-seafoam text-white text-sm font-semibold hover:bg-seafoam-dark transition-colors"
                >
                  {pinStep === "confirm" ? "Save" : "Next"}
                </button>
              </div>
            </div>
          )}
        </section>

        {/* Data */}
        <section className="bg-white border border-sand rounded-xl p-5 shadow-sm">
          <p className="text-[11px] font-bold tracking-widest uppercase text-dust">
            DATA
          </p>
          <div className="mt-3 space-y-3">
            <button
              onClick={handleResetChecklist}
              className="w-full py-2.5 rounded-lg border border-sand text-sm font-semibold text-charcoal hover:bg-sand/40 transition-colors"
            >
              Reset Checklist for Today
            </button>
            <button
              onClick={() => setShowResetConfirm(true)}
              className="w-full py-2.5 rounded-lg bg-coral/10 border border-coral/20 text-sm font-semibold text-coral hover:bg-coral/20 transition-colors"
            >
              Reset All Data
            </button>
          </div>
        </section>
      </main>

      {/* Reset Confirmation Dialog */}
      {showResetConfirm && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center bg-charcoal/40 backdrop-blur-sm px-6">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-lg space-y-4">
            <h3 className="font-display text-lg text-charcoal">
              Reset all data?
            </h3>
            <p className="text-sm text-stone leading-relaxed">
              This will erase your PIN, fast configuration, checklists, and
              vitals. This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowResetConfirm(false)}
                className="flex-1 py-2.5 rounded-lg border border-sand text-sm font-semibold text-stone hover:bg-sand/40 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleResetAll}
                className="flex-1 py-2.5 rounded-lg bg-coral text-white text-sm font-semibold hover:bg-coral/90 transition-colors"
              >
                Reset Everything
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
