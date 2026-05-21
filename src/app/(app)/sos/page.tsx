"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useRef, useCallback } from "react";
import { X } from "lucide-react";

const TOTAL_SECONDS = 15 * 60;
const BREATH_CYCLE_MS = 4000;
const INITIAL_AMPLITUDE = 20;
const FINAL_AMPLITUDE = 2;

function generateSinePath(amplitude: number, wavelength: number, width: number): string {
  let d = `M 0 40`;
  for (let x = 0; x <= width; x += 2) {
    const y = 40 + amplitude * Math.sin((2 * Math.PI * x) / wavelength);
    d += ` L ${x} ${y}`;
  }
  return d;
}

export default function SOSPage() {
  const router = useRouter();
  const [secondsLeft, setSecondsLeft] = useState(TOTAL_SECONDS);
  const [breatheIn, setBreatheIn] = useState(true);
  const [finished, setFinished] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const startTimeRef = useRef(Date.now());
  const [amplitude, setAmplitude] = useState(INITIAL_AMPLITUDE);

  // Detect prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Countdown timer
  useEffect(() => {
    if (finished) return;
    const interval = setInterval(() => {
      const elapsed = (Date.now() - startTimeRef.current) / 1000;
      const remaining = Math.max(0, TOTAL_SECONDS - Math.floor(elapsed));
      setSecondsLeft(remaining);

      // Decrease amplitude over time
      const progress = Math.min(elapsed / (TOTAL_SECONDS), 1);
      const amp = INITIAL_AMPLITUDE - (INITIAL_AMPLITUDE - FINAL_AMPLITUDE) * progress;
      setAmplitude(amp);

      if (remaining <= 0) {
        setFinished(true);
        clearInterval(interval);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [finished]);

  // Breathing cycle
  useEffect(() => {
    if (finished) return;
    const interval = setInterval(() => {
      setBreatheIn((prev) => !prev);
    }, BREATH_CYCLE_MS);
    return () => clearInterval(interval);
  }, [finished]);

  const handleExit = useCallback(() => {
    router.back();
  }, [router]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const timeDisplay = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  // Generate two cycles of the wave for seamless scrolling
  const waveWidth = 800;
  const sinePath = generateSinePath(amplitude, 200, waveWidth);

  return (
    <div className="fixed inset-0 z-[9999] bg-parchment flex flex-col items-center justify-center px-6">
      {/* Close button */}
      <button
        onClick={handleExit}
        className="absolute top-4 right-4 w-11 h-11 flex items-center justify-center rounded-full hover:bg-charcoal/[0.04] transition-colors"
        aria-label="Close"
      >
        <X size={24} strokeWidth={1.75} className="text-dust" />
      </button>

      {/* Breathing circle */}
      <div className="flex flex-col items-center gap-10">
        <div
          className={`w-[160px] h-[160px] rounded-full border-[3px] border-seafoam flex items-center justify-center ${
            !reducedMotion && !finished ? "animate-breathe" : ""
          }`}
          style={{ backgroundColor: "rgba(91, 158, 143, 0.06)" }}
        >
          <span className="uppercase text-[14px] font-bold tracking-widest text-seafoam select-none">
            {finished
              ? "You made it."
              : reducedMotion
              ? breatheIn
                ? "Breathe in"
                : "Breathe out"
              : breatheIn
              ? "Breathe in"
              : "Breathe out"}
          </span>
        </div>

        {/* Sine wave */}
        <div className="w-full max-w-md overflow-hidden" style={{ height: 80 }}>
          <svg
            width="100%"
            height="80"
            viewBox={`0 0 ${waveWidth / 2} 80`}
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <g className={!reducedMotion ? "animate-wave" : ""}>
              <path
                d={sinePath}
                fill="none"
                stroke={finished ? "#6B9E7A" : "rgba(91, 158, 143, 0.6)"}
                strokeWidth={2}
              />
            </g>
          </svg>
        </div>

        {/* Reassurance text */}
        <div className="flex flex-col items-center gap-2">
          <p className="font-display text-[22px] text-charcoal">
            {finished ? "You made it." : "This will pass"}
          </p>
          {!finished && (
            <p className="font-mono text-stone text-sm">
              {timeDisplay} remaining
            </p>
          )}
        </div>

        {/* Exit button */}
        <button
          onClick={handleExit}
          className="mt-4 px-8 py-3 rounded-full border border-sand text-stone text-sm font-medium transition-colors hover:border-seafoam hover:text-seafoam"
          style={{ backgroundColor: "transparent" }}
        >
          I&apos;m okay now
        </button>
      </div>
    </div>
  );
}
