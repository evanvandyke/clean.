"use client";

import { useState, useCallback, useRef } from "react";
import { Check } from "lucide-react";

interface ChecklistItemProps {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}

export default function ChecklistItem({ label, checked, onChange }: ChecklistItemProps) {
  const [blooming, setBlooming] = useState(false);
  const boxRef = useRef<HTMLDivElement>(null);

  const toggle = useCallback(() => {
    const next = !checked;
    if (next) {
      setBlooming(true);
      setTimeout(() => setBlooming(false), 600);
    }
    onChange(next);
  }, [checked, onChange]);

  return (
    <button
      onClick={toggle}
      className="flex items-center gap-3 w-full py-2.5 text-left group"
      role="checkbox"
      aria-checked={checked}
    >
      <div
        ref={boxRef}
        className={`w-6 h-6 rounded-[6px] border-2 flex items-center justify-center shrink-0 transition-all duration-150 ${
          checked
            ? "bg-amber border-amber"
            : "bg-white border-muted-stone group-hover:border-seafoam"
        } ${blooming ? "animate-bloom" : ""}`}
      >
        {checked && <Check size={14} strokeWidth={2.5} className="text-white" />}
      </div>
      <span
        className={`text-base transition-all duration-150 ${
          checked ? "line-through text-dust font-normal" : "text-charcoal font-medium"
        }`}
      >
        {label}
      </span>
    </button>
  );
}
