"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { Home, BookOpen, CheckSquare, Activity } from "lucide-react";

const tabs = [
  { href: "/", label: "Home", icon: Home },
  { href: "/guide", label: "Guide", icon: BookOpen },
  { href: "/checklist", label: "Checklist", icon: CheckSquare },
  { href: "/vitals", label: "Vitals", icon: Activity },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-sand flex justify-around items-center pb-[env(safe-area-inset-bottom,8px)] pt-2 min-h-[56px]"
      style={{ boxShadow: "0 -2px 8px rgba(26,24,22,0.04)" }}>
      {tabs.map(({ href, label, icon: Icon }) => {
        const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
        return (
          <Link
            key={href}
            href={href}
            className="flex flex-col items-center gap-0.5 min-w-[60px]"
          >
            <Icon
              size={22}
              strokeWidth={1.75}
              className={isActive ? "text-seafoam" : "text-dust"}
            />
            <span
              className={`text-[11px] ${
                isActive ? "text-seafoam font-semibold" : "text-dust font-medium"
              }`}
            >
              {label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}
