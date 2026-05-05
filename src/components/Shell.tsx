"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Activity,
  CalendarRange,
  ChartLine,
  ShieldCheck,
  Stethoscope,
  Users,
  Sparkles,
} from "lucide-react";
import { useState } from "react";

const navItems = [
  { href: "/", label: "Today", icon: Activity, key: "today" },
  { href: "/patients", label: "Patients", icon: Users, key: "patients" },
  { href: "/scheduling", label: "Scheduling", icon: CalendarRange, key: "scheduling" },
  { href: "/insurance", label: "Insurance", icon: ShieldCheck, key: "insurance" },
  { href: "/reports", label: "Reports", icon: ChartLine, key: "reports" },
];

const todayLabel = new Date().toLocaleDateString("en-US", {
  weekday: "long",
  month: "long",
  day: "numeric",
});

export function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [aiOn, setAiOn] = useState(true);

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <aside className="w-[232px] shrink-0 border-r border-border bg-bg-elev/60 flex flex-col">
        <div className="px-5 pt-6 pb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-accent/10 ring-1 ring-accent/20 flex items-center justify-center">
              <Stethoscope className="w-[18px] h-[18px] text-accent-deep" strokeWidth={2.2} />
            </div>
            <div>
              <div className="font-display text-[15px] font-semibold tracking-tight text-text">
                Front Desk
              </div>
              <div className="text-[11px] text-text-soft -mt-0.5">Riverbend Clinic</div>
            </div>
          </div>
        </div>

        <nav className="px-3 pt-1 pb-4 flex-1">
          <div className="px-2 mb-1.5 text-[10.5px] font-medium text-text-soft uppercase tracking-wider">
            Workspace
          </div>
          <ul className="space-y-0.5">
            {navItems.map((item) => {
              const active =
                item.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(item.href);
              const Icon = item.icon;
              return (
                <li key={item.key}>
                  <Link
                    href={item.href}
                    className={`group flex items-center gap-2.5 px-2.5 h-8 rounded-md text-[13px] transition-colors ${
                      active
                        ? "bg-text/[0.04] text-text font-medium"
                        : "text-text-mute hover:text-text hover:bg-text/[0.025]"
                    }`}
                  >
                    <Icon
                      className={`w-[15px] h-[15px] ${
                        active ? "text-accent-deep" : "text-text-soft"
                      }`}
                      strokeWidth={2}
                    />
                    <span>{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          <div className="px-2 mt-6 mb-1.5 text-[10.5px] font-medium text-text-soft uppercase tracking-wider">
            Providers
          </div>
          <ul className="space-y-0.5">
            {[
              "Dr. Mara Aleksandrov",
              "Dr. Elena Park",
              "Dr. Samuel Okafor",
              "Lila Bennett, NP",
              "Carlos Vega, PA",
            ].map((p) => (
              <li
                key={p}
                className="px-2.5 h-7 flex items-center gap-2 text-[12.5px] text-text-mute hover:text-text rounded-md hover:bg-text/[0.025] cursor-default"
              >
                <span className="dot bg-success" />
                <span className="truncate">{p}</span>
              </li>
            ))}
          </ul>
        </nav>

        <div className="border-t border-border px-3 py-3">
          <div className="flex items-center gap-2.5 px-2 py-1.5">
            <div className="w-7 h-7 rounded-full bg-text/[0.06] flex items-center justify-center text-[11px] font-semibold text-text">
              AS
            </div>
            <div className="min-w-0">
              <div className="text-[12.5px] font-medium text-text leading-tight truncate">
                Amelia Soto
              </div>
              <div className="text-[11px] text-text-soft leading-tight">Front desk lead</div>
            </div>
          </div>
        </div>
      </aside>

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        {/* Top bar */}
        <header className="h-12 border-b border-border bg-bg-elev/80 backdrop-blur-sm flex items-center px-6 gap-4 sticky top-0 z-30">
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-medium text-text">Riverbend Family Clinic</span>
            <span className="text-text-soft">·</span>
            <span className="text-[12.5px] text-text-mute tabular">{todayLabel}</span>
          </div>

          <div className="flex-1" />

          <div className="flex items-center gap-3">
            <div className="hidden md:flex items-center gap-2 text-[12px] text-text-mute">
              <span className="dot bg-success pulse-soft" />
              <span>EHR sync · 12s ago</span>
            </div>

            <button
              onClick={() => setAiOn((v) => !v)}
              className={`flex items-center gap-2 h-8 pl-2.5 pr-3 rounded-full border transition-colors ${
                aiOn
                  ? "border-accent/30 bg-accent-soft/40 text-accent-deep"
                  : "border-border bg-bg-elev text-text-mute"
              }`}
              aria-pressed={aiOn}
            >
              <Sparkles className="w-3.5 h-3.5" strokeWidth={2.2} />
              <span className="text-[12px] font-medium">
                AI assist {aiOn ? "on" : "off"}
              </span>
              <span
                className={`relative w-7 h-4 rounded-full transition-colors ${
                  aiOn ? "bg-accent" : "bg-text/15"
                }`}
              >
                <span
                  className={`absolute top-0.5 w-3 h-3 rounded-full bg-white shadow-sm transition-all ${
                    aiOn ? "left-3.5" : "left-0.5"
                  }`}
                />
              </span>
            </button>
          </div>
        </header>

        <main className="flex-1 min-w-0">{children}</main>
      </div>
    </div>
  );
}
