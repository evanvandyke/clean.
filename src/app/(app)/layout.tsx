"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getPin, getFastConfig } from "@/lib/storage";
import BottomNav from "@/components/BottomNav";

export default function AppLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const pin = getPin();
    if (!pin) {
      router.replace("/pin");
      return;
    }
    const config = getFastConfig();
    if (!config) {
      router.replace("/setup");
      return;
    }
    setReady(true);
  }, [router]);

  if (!ready) {
    return (
      <div className="flex-1 flex items-center justify-center bg-parchment">
        <span className="font-display text-2xl text-charcoal">
          Fast Guide<span className="text-seafoam">.</span>
        </span>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col pb-[64px]">
      {children}
      <BottomNav />
    </div>
  );
}
