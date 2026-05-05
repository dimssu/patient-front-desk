"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  CalendarRange,
  ChevronDown,
  ChevronRight,
  Phone,
  Plus,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { providers, providerById } from "@/data/providers";
import { appointments, statusTone } from "@/data/appointments";
import { patientById } from "@/data/patients";
import { scheduleRequests } from "@/data/scheduling";
import {
  insuranceVerifications,
  insuranceStatusLabel,
  insuranceStatusTone,
} from "@/data/insurance";
import { Avatar } from "@/components/Avatar";
import { AIBadge } from "@/components/AIBadge";
import { formatTime12, timeToMinutes } from "@/lib/format";

const HOUR_HEIGHT = 60; // px per hour
const START_HOUR = 8;
const END_HOUR = 18;
const HOURS = Array.from({ length: END_HOUR - START_HOUR }, (_, i) => START_HOUR + i);

export default function SchedulingPage() {
  const [activeProviders, setActiveProviders] = useState<string[]>(
    providers.map((p) => p.id)
  );
  const [openSection, setOpenSection] = useState<"sched" | "ins" | "both">("both");

  const visibleProviders = providers.filter((p) =>
    activeProviders.includes(p.id)
  );

  return (
    <div className="px-8 py-7 max-w-[1620px] mx-auto">
      {/* Header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="font-display text-[26px] leading-tight font-semibold tracking-tight text-text">
            Scheduling &amp; insurance
          </h1>
          <p className="text-[13px] text-text-mute mt-1">
            Live calendar across {providers.length} providers · {scheduleRequests.length}{" "}
            requests pending · {insuranceVerifications.filter((i) => i.status !== "verified").length}{" "}
            insurance items open
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-8 px-3 inline-flex items-center gap-1.5 rounded-md border border-border bg-bg-elev text-[12.5px] text-text-mute hover:text-text hover:border-border-strong transition-colors">
            <CalendarRange className="w-3.5 h-3.5" />
            Day
          </button>
          <button className="h-8 px-3 inline-flex items-center gap-1.5 rounded-md bg-text text-bg-elev text-[12.5px] font-medium hover:bg-text/85 transition-colors">
            <Plus className="w-3.5 h-3.5" />
            New appointment
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-5">
        {/* Calendar */}
        <div className="col-span-8 card overflow-hidden">
          {/* Provider chips */}
          <div className="flex items-center gap-2 px-4 h-12 border-b border-border flex-wrap">
            <span className="text-[11px] uppercase tracking-wider font-semibold text-text-soft mr-1">
              Providers
            </span>
            {providers.map((p) => {
              const active = activeProviders.includes(p.id);
              return (
                <button
                  key={p.id}
                  onClick={() =>
                    setActiveProviders((prev) =>
                      prev.includes(p.id)
                        ? prev.filter((x) => x !== p.id)
                        : [...prev, p.id]
                    )
                  }
                  className={`h-7 px-2 inline-flex items-center gap-1.5 rounded-full border text-[11.5px] transition-colors ${
                    active
                      ? "bg-text/[0.04] border-border-strong text-text"
                      : "bg-bg-elev border-border text-text-soft hover:text-text"
                  }`}
                >
                  <span
                    className="w-2 h-2 rounded-full"
                    style={{ background: p.color }}
                  />
                  {p.short}
                </button>
              );
            })}
            <div className="ml-auto text-[11.5px] text-text-soft">
              May 4, 2026 · Mon
            </div>
          </div>

          {/* Calendar grid */}
          <div className="overflow-auto">
            <div
              className="grid"
              style={{
                gridTemplateColumns: `64px repeat(${visibleProviders.length}, minmax(0, 1fr))`,
                minWidth: 64 + visibleProviders.length * 140,
              }}
            >
              {/* Header row */}
              <div className="bg-text/[0.02] border-b border-border" />
              {visibleProviders.map((p) => (
                <div
                  key={p.id}
                  className="bg-text/[0.02] border-b border-l border-border px-3 py-2"
                >
                  <div className="flex items-center gap-2">
                    <span
                      className="w-2 h-2 rounded-full"
                      style={{ background: p.color }}
                    />
                    <div className="min-w-0">
                      <div className="text-[12px] font-medium text-text truncate">
                        {p.short}
                      </div>
                      <div className="text-[10.5px] text-text-soft truncate">
                        {p.specialty}
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Time rows */}
              {HOURS.map((hour) => (
                <RowGroup
                  key={hour}
                  hour={hour}
                  providers={visibleProviders}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Right rail: queues */}
        <div className="col-span-4 space-y-4">
          {/* Needs scheduling */}
          <div className="card overflow-hidden">
            <button
              onClick={() =>
                setOpenSection(openSection === "sched" ? "both" : "sched")
              }
              className="w-full flex items-center justify-between px-4 h-11 border-b border-border hover:bg-text/[0.015]"
            >
              <div className="flex items-center gap-2">
                <CalendarRange className="w-3.5 h-3.5 text-text-mute" />
                <h3 className="font-display text-[13.5px] font-semibold tracking-tight">
                  Needs scheduling
                </h3>
                <span className="text-[11px] font-mono text-text-soft tabular">
                  {scheduleRequests.length}
                </span>
              </div>
              {openSection === "ins" ? (
                <ChevronRight className="w-3.5 h-3.5 text-text-soft" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-text-soft" />
              )}
            </button>

            {openSection !== "ins" && (
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.025 } },
                }}
                className="divide-y divide-border max-h-[480px] overflow-auto"
              >
                {scheduleRequests.map((req) => {
                  const p = patientById(req.patientId)!;
                  const sugProvider = providerById(req.suggestedProviderId)!;
                  return (
                    <motion.li
                      key={req.id}
                      variants={{
                        hidden: { opacity: 0, y: 4 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.22 } },
                      }}
                      className="px-4 py-3 hover:bg-text/[0.015] cursor-pointer"
                    >
                      <div className="flex items-start gap-2.5">
                        <Avatar name={p.name} size={28} />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center gap-2">
                            <span className="text-[12.5px] font-medium text-text truncate">
                              {p.name}
                            </span>
                            <span className="text-[10.5px] text-text-soft tabular">
                              {p.mrn}
                            </span>
                          </div>
                          <div className="text-[11.5px] text-text-soft mt-0.5">
                            {req.source} · requested {req.requestedDate}
                          </div>
                          <div className="text-[12px] text-text-mute leading-snug mt-1.5">
                            {req.reason}
                          </div>

                          <div className="mt-2 rounded-md bg-accent-soft/40 border border-accent/20 p-2.5">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-1.5 text-[10.5px] uppercase tracking-wider text-accent-deep font-medium">
                                <Sparkles className="w-2.5 h-2.5" />
                                AI suggested
                              </div>
                              <span className="text-[10.5px] text-text-soft">
                                {req.visitType}
                              </span>
                            </div>
                            <div className="mt-1 flex items-center justify-between gap-2">
                              <div className="text-[12.5px] font-medium text-text leading-tight">
                                {req.suggestedSlot}
                              </div>
                              <div className="flex items-center gap-1.5 shrink-0">
                                <span
                                  className="w-2 h-2 rounded-full"
                                  style={{ background: sugProvider.color }}
                                />
                                <span className="text-[11px] text-text-mute">
                                  {sugProvider.short}
                                </span>
                              </div>
                            </div>
                            <div className="text-[11px] text-text-mute mt-1 leading-snug">
                              {req.fitReason}
                            </div>
                          </div>

                          <div className="mt-2 flex items-center gap-2">
                            <button className="h-7 px-2.5 rounded-md bg-text text-bg-elev text-[11.5px] font-medium hover:bg-text/85">
                              Accept slot
                            </button>
                            <button className="h-7 px-2.5 rounded-md border border-border bg-bg-elev text-[11.5px] text-text-mute hover:text-text hover:border-border-strong">
                              Pick another
                            </button>
                          </div>
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </motion.ul>
            )}
          </div>

          {/* Insurance queue */}
          <div className="card overflow-hidden">
            <button
              onClick={() =>
                setOpenSection(openSection === "ins" ? "both" : "ins")
              }
              className="w-full flex items-center justify-between px-4 h-11 border-b border-border hover:bg-text/[0.015]"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-3.5 h-3.5 text-text-mute" />
                <h3 className="font-display text-[13.5px] font-semibold tracking-tight">
                  Insurance verification
                </h3>
                <span className="text-[11px] font-mono text-text-soft tabular">
                  {insuranceVerifications.length}
                </span>
              </div>
              {openSection === "sched" ? (
                <ChevronRight className="w-3.5 h-3.5 text-text-soft" />
              ) : (
                <ChevronDown className="w-3.5 h-3.5 text-text-soft" />
              )}
            </button>

            {openSection !== "sched" && (
              <motion.ul
                initial="hidden"
                animate="show"
                variants={{
                  hidden: {},
                  show: { transition: { staggerChildren: 0.025 } },
                }}
                className="divide-y divide-border max-h-[480px] overflow-auto"
              >
                {insuranceVerifications.map((iv) => {
                  const p = patientById(iv.patientId)!;
                  const tone = insuranceStatusTone[iv.status];
                  return (
                    <motion.li
                      key={iv.id}
                      variants={{
                        hidden: { opacity: 0, y: 4 },
                        show: { opacity: 1, y: 0, transition: { duration: 0.22 } },
                      }}
                      className="px-4 py-3 hover:bg-text/[0.015]"
                    >
                      <div className="flex items-start gap-2.5">
                        <Avatar name={p.name} size={28} />
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between gap-2">
                            <div className="min-w-0">
                              <div className="text-[12.5px] font-medium text-text truncate">
                                {p.name}
                              </div>
                              <div className="text-[11px] text-text-soft truncate">
                                {iv.plan}
                              </div>
                            </div>
                            <span
                              className={`shrink-0 inline-flex items-center gap-1.5 h-[22px] px-2 rounded-full text-[11px] font-medium ${tone.bg} ${tone.text}`}
                            >
                              <span className={`dot ${tone.dot}`} />
                              {insuranceStatusLabel[iv.status]}
                            </span>
                          </div>

                          <div className="text-[11px] text-text-soft mt-1 tabular">
                            Last checked {iv.lastChecked}
                          </div>

                          <div className="text-[11.5px] text-text-mute leading-snug mt-1.5">
                            {iv.aiNote}
                          </div>

                          {iv.phoneScript && (
                            <div className="mt-2 rounded-md border border-border bg-bg p-2.5">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-1.5 text-[10.5px] uppercase tracking-wider text-text-soft font-medium">
                                  <Phone className="w-2.5 h-2.5" />
                                  AI-drafted phone script
                                </div>
                                <AIBadge label="Draft" size="xs" />
                              </div>
                              <div className="text-[11.5px] text-text-mute leading-snug mt-1.5 italic">
                                &ldquo;{iv.phoneScript}&rdquo;
                              </div>
                              <div className="mt-2 flex items-center gap-2">
                                <button className="h-7 px-2.5 inline-flex items-center gap-1.5 rounded-md bg-text text-bg-elev text-[11.5px] font-medium hover:bg-text/85">
                                  <Phone className="w-3 h-3" />
                                  Call now
                                </button>
                                <button className="h-7 px-2.5 rounded-md border border-border text-[11.5px] text-text-mute hover:text-text hover:border-border-strong">
                                  Copy script
                                </button>
                              </div>
                            </div>
                          )}

                          {iv.status === "verified" && (
                            <div className="mt-2 flex gap-3 text-[11px] text-text-mute">
                              <span>
                                Copay{" "}
                                <span className="text-text font-mono tabular">
                                  ${iv.copay}
                                </span>
                              </span>
                              <span>
                                Deductible left{" "}
                                <span className="text-text font-mono tabular">
                                  ${iv.deductibleRemaining}
                                </span>
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </motion.li>
                  );
                })}
              </motion.ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------- calendar row ----------------- */

function RowGroup({
  hour,
  providers,
}: {
  hour: number;
  providers: typeof import("@/data/providers").providers;
}) {
  return (
    <>
      <div
        className="border-b border-border text-[11px] text-text-soft tabular text-right pr-2 pt-1"
        style={{ height: HOUR_HEIGHT }}
      >
        {formatTime12(`${hour.toString().padStart(2, "0")}:00`)}
      </div>
      {providers.map((p) => (
        <ProviderCell key={p.id} provider={p} hour={hour} />
      ))}
    </>
  );
}

function ProviderCell({
  provider,
  hour,
}: {
  provider: import("@/data/providers").Provider;
  hour: number;
}) {
  const cellAppts = appointments.filter((a) => {
    const m = timeToMinutes(a.time);
    return a.providerId === provider.id && m >= hour * 60 && m < (hour + 1) * 60;
  });

  return (
    <div
      className="relative border-b border-l border-border"
      style={{ height: HOUR_HEIGHT }}
    >
      {/* half-hour line */}
      <div
        className="absolute left-0 right-0 border-t border-dashed border-border/70"
        style={{ top: HOUR_HEIGHT / 2 }}
      />
      {cellAppts.map((appt) => {
        const m = timeToMinutes(appt.time) - hour * 60;
        const top = (m / 60) * HOUR_HEIGHT;
        const height = (appt.durationMin / 60) * HOUR_HEIGHT - 2;
        const patient = patientById(appt.patientId)!;
        const tone = statusTone[appt.status];
        return (
          <Link
            key={appt.id}
            href={`/patient/${appt.patientId}`}
            className={`absolute left-1 right-1 rounded-md border ${tone.border} ${tone.bg} px-1.5 py-1 text-[11px] overflow-hidden hover:shadow-sm transition-shadow`}
            style={{
              top,
              height,
              borderLeft: `3px solid ${provider.color}`,
            }}
          >
            <div className={`flex items-center gap-1 font-medium tabular ${tone.text}`}>
              {formatTime12(appt.time)}
              {appt.aiHandled && (
                <Sparkles className="w-2.5 h-2.5 ml-auto text-accent-deep" />
              )}
            </div>
            <div className="text-text font-medium truncate text-[11.5px]">
              {patient.name}
            </div>
            <div className="text-text-soft truncate text-[10.5px]">
              {appt.visitType}
            </div>
          </Link>
        );
      })}
    </div>
  );
}
