"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft, Settings } from "lucide-react";

interface TopBarProps {
  title: string;
  showBack?: boolean;
  showSettings?: boolean;
}

export default function TopBar({ title, showBack = false, showSettings = false }: TopBarProps) {
  const router = useRouter();

  return (
    <header
      className="sticky top-0 z-50 border-b border-sand px-5 min-h-[56px] flex items-center justify-between"
      style={{
        background: "rgba(250,248,245,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      }}
    >
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={() => router.back()}
            className="w-11 h-11 flex items-center justify-center -ml-2 rounded-full hover:bg-charcoal/[0.04] transition-colors"
            aria-label="Go back"
          >
            <ArrowLeft size={20} strokeWidth={1.75} className="text-stone" />
          </button>
        )}
        <h1 className="text-base font-semibold text-charcoal">{title}</h1>
      </div>
      {showSettings && (
        <button
          onClick={() => router.push("/settings")}
          className="w-11 h-11 flex items-center justify-center -mr-2 rounded-full hover:bg-charcoal/[0.04] transition-colors"
          aria-label="Settings"
        >
          <Settings size={20} strokeWidth={1.75} className="text-stone" />
        </button>
      )}
    </header>
  );
}
