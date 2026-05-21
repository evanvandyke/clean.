"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { getPin, setPin, getFastConfig } from "@/lib/storage";

type Mode = "set" | "confirm" | "enter";

export default function PinPage() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [mode, setMode] = useState<Mode>("enter");
  const [pin, setPinValue] = useState("");
  const [firstPin, setFirstPin] = useState("");
  const [error, setError] = useState(false);
  const [shake, setShake] = useState(false);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const stored = getPin();
    if (stored) {
      setMode("enter");
    } else {
      setMode("set");
    }
    setReady(true);
  }, []);

  const handleSuccess = useCallback(() => {
    const config = getFastConfig();
    if (config) {
      router.replace("/");
    } else {
      router.replace("/setup");
    }
  }, [router]);

  const triggerError = useCallback(() => {
    setError(true);
    setShake(true);
    setPinValue("");
    setTimeout(() => {
      setError(false);
      setShake(false);
    }, 600);
  }, []);

  const handleComplete = useCallback(
    (entered: string) => {
      if (mode === "set") {
        setFirstPin(entered);
        setPinValue("");
        setMode("confirm");
      } else if (mode === "confirm") {
        if (entered === firstPin) {
          setPin(entered);
          handleSuccess();
        } else {
          triggerError();
          setFirstPin("");
          setMode("set");
        }
      } else {
        const stored = getPin();
        if (entered === stored) {
          handleSuccess();
        } else {
          triggerError();
        }
      }
    },
    [mode, firstPin, handleSuccess, triggerError]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value.replace(/\D/g, "").slice(0, 4);
      setPinValue(value);
      if (value.length === 4) {
        // Small delay so user sees the last dot fill
        setTimeout(() => handleComplete(value), 150);
      }
    },
    [handleComplete]
  );

  const focusInput = () => {
    inputRef.current?.focus();
  };

  const heading =
    mode === "set"
      ? "Set your PIN"
      : mode === "confirm"
      ? "Confirm your PIN"
      : "Enter your PIN";

  if (!ready) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-dvh bg-parchment" />
    );
  }

  return (
    <div
      className="flex-1 flex flex-col items-center justify-center min-h-dvh bg-parchment px-6"
      onClick={focusInput}
    >
      {/* Wordmark */}
      <h1 className="font-display text-3xl text-charcoal mb-2 select-none">
        Fast Guide<span className="text-seafoam">.</span>
      </h1>

      {/* Tagline */}
      <p className="text-stone italic text-sm mb-12 select-none">
        Breathe through it. One sip at a time.
      </p>

      {/* Heading */}
      <p className="text-charcoal font-medium text-base mb-8">{heading}</p>

      {/* PIN dots */}
      <div
        className={`flex gap-4 mb-6 ${shake ? "animate-shake" : ""}`}
        role="group"
        aria-label="PIN entry"
      >
        {[0, 1, 2, 3].map((i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded-full border-2 transition-all duration-150 ${
              error
                ? "border-muted-red bg-muted-red/30"
                : pin.length > i
                ? "border-seafoam bg-seafoam"
                : "border-sand bg-transparent"
            }`}
          />
        ))}
      </div>

      {/* Hidden input for mobile keyboard */}
      <input
        ref={inputRef}
        type="tel"
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="off"
        maxLength={4}
        value={pin}
        onChange={handleChange}
        autoFocus
        className="sr-only"
        aria-label="PIN input"
      />

      {/* Error message */}
      <div className="h-6 flex items-center">
        {error && (
          <p className="text-muted-red text-sm animate-fade-in">
            {mode === "set" ? "PINs didn’t match. Try again." : "Wrong PIN. Try again."}
          </p>
        )}
      </div>

      {/* Shake keyframe injected via style tag */}
      <style jsx>{`
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          20% { transform: translateX(-8px); }
          40% { transform: translateX(8px); }
          60% { transform: translateX(-6px); }
          80% { transform: translateX(6px); }
        }
        .animate-shake {
          animation: shake 400ms ease-in-out;
        }
      `}</style>
    </div>
  );
}
