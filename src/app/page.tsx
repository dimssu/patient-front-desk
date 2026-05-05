"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Clock,
  FileCheck,
  MessageSquareWarning,
  PhoneOff,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  TimerReset,
  UserCheck,
} from "lucide-react";
import { appointments } from "@/data/appointments";
import { providerById } from "@/data/providers";
import { patientById } from "@/data/patients";
import { exceptions, exceptionLabel } from "@/data/exceptions";
import { Avatar } from "@/components/Avatar";
import { StatusPill } from "@/components/StatusPill";
import { AIBadge } from "@/components/AIBadge";
import { formatTime12, timeToMinutes } from "@/lib/format";

const stats = [
  {
    key: "booked",
    label: "Booked today",
    value: 18,
    delta: "+2 vs. yesterday",
    icon: Stethoscope,
    tone: "default" as const,
  },
  {
    key: "checked_in",
    label: "Checked in",
    value: 3,
    delta: "Last: 8:54 AM",
    icon: UserCheck,
    tone: "info" as const,
  },
  {
    key: "in_room",
    label: "In room",
    value: 1,
    delta: "Avg time 14m",
    icon: TimerReset,
    tone: "warn" as const,
  },
  {
    key: "waiting",
    label: "Waiting >15 min",
    value: 2,
    delta: "Acceptable threshold",
    icon: Clock,
    tone: "warn" as const,
  },
  {
    key: "no_show",
    label: "No-show",
    value: 1,
    delta: "Outreach sent",
    icon: PhoneOff,
    tone: "danger" as const,
  },
];

const toneStyles: Record<string, { value: string; chip: string }> = {
  default: { value: "text-text", chip: "bg-text/[0.04] text-text-mute" },
  info: { value: "text-info", chip: "bg-info-soft text-info" },
  warn: { value: "text-warn", chip: "bg-warn-soft text-warn" },
  danger: { value: "text-danger", chip: "bg-danger-soft text-danger" },
};

function isMorning(time: string) {
  return timeToMinutes(time) < 12 * 60;
}

const sortedAppts = [...appointments].sort(
  (a, b) => timeToMinutes(a.time) - timeToMinutes(b.time)
);
const morning = sortedAppts.filter((a) => isMorning(a.time));
const afternoon = sortedAppts.filter((a) => !isMorning(a.time));

export default function Dashboard() {
  return (
    <div className="px-8 py-7 max-w-[1480px] mx-auto">
      {/* Header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <h1 className="font-display text-[26px] leading-tight font-semibold tracking-tight text-text">
            Waiting room
          </h1>
          <p className="text-[13px] text-text-mute mt-1">
            Today at a glance · Monday, May 4, 2026
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="h-8 px-3 rounded-md border border-border bg-bg-elev text-[12.5px] text-text-mute hover:text-text hover:border-border-strong transition-colors">
            Export day sheet
          </button>
          <button className="h-8 px-3 rounded-md bg-text text-bg-elev text-[12.5px] font-medium hover:bg-text/85 transition-colors">
            Add walk-in
          </button>
        </div>
      </div>

      {/* Stat ribbon */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.04 } },
        }}
        className="grid grid-cols-5 gap-3 mb-6"
      >
        {stats.map((s) => {
          const Icon = s.icon;
          const tone = toneStyles[s.tone];
          return (
            <motion.div
              key={s.key}
              variants={{
                hidden: { opacity: 0, y: 6 },
                show: { opacity: 1, y: 0, transition: { duration: 0.25 } },
              }}
              className="card p-4"
            >
              <div className="flex items-start justify-between">
                <div className="text-[11.5px] uppercase tracking-wider text-text-soft font-medium">
                  {s.label}
                </div>
                <div
                  className={`w-6 h-6 rounded-md flex items-center justify-center ${tone.chip}`}
                >
                  <Icon className="w-3.5 h-3.5" strokeWidth={2.2} />
                </div>
              </div>
              <div
                className={`font-display text-[32px] leading-[1.1] font-semibold tracking-tight tabular mt-2 ${tone.value}`}
              >
                {s.value}
              </div>
              <div className="text-[11.5px] text-text-soft mt-0.5">
                {s.delta}
              </div>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Main grid */}
      <div className="grid grid-cols-12 gap-5">
        {/* Appointments */}
        <div className="col-span-8 card overflow-hidden">
          <div className="flex items-center justify-between px-5 h-12 border-b border-border">
            <div className="flex items-center gap-3">
              <h2 className="font-display text-[14px] font-semibold tracking-tight text-text">
                Today&rsquo;s appointments
              </h2>
              <span className="text-[12px] text-text-soft tabular">
                {appointments.length} scheduled
              </span>
            </div>
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1 rounded-md border border-border p-0.5 text-[11.5px]">
                <button className="h-6 px-2 rounded bg-text/[0.06] text-text font-medium">
                  All providers
                </button>
                <button className="h-6 px-2 rounded text-text-mute hover:text-text">
                  Mine
                </button>
              </div>
            </div>
          </div>

          <ApptGroup label="Morning" rows={morning} />
          <div className="border-t border-border" />
          <ApptGroup label="Afternoon" rows={afternoon} />
        </div>

        {/* Right rail */}
        <div className="col-span-4 space-y-5">
          {/* AI handled */}
          <div className="card p-5">
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-accent-deep" />
                  <h3 className="font-display text-[13.5px] font-semibold tracking-tight">
                    AI handled today
                  </h3>
                </div>
                <p className="text-[11.5px] text-text-soft mt-0.5">
                  Updated 12 seconds ago
                </p>
              </div>
              <div className="text-[11px] font-mono text-accent-deep bg-accent-soft px-2 py-0.5 rounded-full">
                live
              </div>
            </div>

            <ul className="space-y-3">
              <AIStat
                icon={FileCheck}
                label="Intake forms auto-completed"
                value={12}
                sub="of 14 patients today"
              />
              <AIStat
                icon={ShieldCheck}
                label="Insurance verifications passed"
                value={9}
                sub="2 pending, 1 needs call"
              />
              <AIStat
                icon={MessageSquareWarning}
                label="Reminders + intake links sent"
                value={28}
                sub="Tomorrow + day-of"
              />
              <AIStat
                icon={CheckCircle2}
                label="Records reconciled"
                value={6}
                sub="Pharmacy + prior charts"
              />
            </ul>

            <div className="mt-4 pt-4 border-t border-border flex items-center justify-between">
              <div className="text-[11.5px] text-text-soft">
                Time saved (est.)
              </div>
              <div className="text-[12px] font-mono font-semibold text-text tabular">
                3h 42m
              </div>
            </div>
          </div>

          {/* Needs your eye */}
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between px-5 h-11 border-b border-border">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-3.5 h-3.5 text-warn" />
                <h3 className="font-display text-[13.5px] font-semibold tracking-tight">
                  Needs your eye
                </h3>
                <span className="text-[11px] font-mono text-text-soft">
                  {exceptions.length}
                </span>
              </div>
              <button className="text-[11.5px] text-text-mute hover:text-text">
                Filter
              </button>
            </div>
            <ul className="divide-y divide-border">
              {exceptions.map((ex) => {
                const p = patientById(ex.patientId)!;
                const Icon =
                  ex.type === "insurance_denied"
                    ? ShieldCheck
                    : ex.type === "intake_incomplete"
                      ? FileCheck
                      : MessageSquareWarning;
                const toneText =
                  ex.type === "insurance_denied"
                    ? "text-danger"
                    : ex.type === "intake_incomplete"
                      ? "text-warn"
                      : "text-info";
                return (
                  <li
                    key={ex.id}
                    className="px-5 py-3 hover:bg-text/[0.015] cursor-pointer transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`mt-0.5 ${toneText}`}>
                        <Icon className="w-3.5 h-3.5" strokeWidth={2.2} />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2 min-w-0">
                            <Avatar name={p.name} size={18} />
                            <span className="text-[12.5px] font-medium text-text truncate">
                              {p.name}
                            </span>
                            <span className="text-[10.5px] text-text-soft tabular">
                              {p.mrn}
                            </span>
                          </div>
                          <span className="text-[10.5px] text-text-soft tabular shrink-0 ml-2">
                            {ex.ageMin}m
                          </span>
                        </div>
                        <div className="text-[11px] uppercase tracking-wider font-medium text-text-soft mt-1.5">
                          {exceptionLabel[ex.type]}
                        </div>
                        <div className="text-[12px] text-text-mute mt-0.5 leading-snug">
                          {ex.detail}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function ApptGroup({
  label,
  rows,
}: {
  label: string;
  rows: typeof appointments;
}) {
  return (
    <div>
      <div className="flex items-center gap-3 px-5 py-2.5 bg-text/[0.02] border-b border-border">
        <span className="text-[10.5px] font-semibold uppercase tracking-wider text-text-soft">
          {label}
        </span>
        <span className="text-[10.5px] tabular text-text-soft">
          {rows.length} appts
        </span>
      </div>
      <motion.ul
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.025 } },
        }}
        className="divide-y divide-border"
      >
        {rows.map((appt) => {
          const patient = patientById(appt.patientId)!;
          const provider = providerById(appt.providerId)!;
          const isWaiting =
            appt.status === "checked_in" && (appt.waitingMin ?? 0) > 15;
          return (
            <motion.li
              key={appt.id}
              variants={{
                hidden: { opacity: 0, y: 4 },
                show: { opacity: 1, y: 0, transition: { duration: 0.22 } },
              }}
            >
              <Link
                href={`/patient/${appt.patientId}`}
                className="block hover:bg-text/[0.015] transition-colors"
              >
                <div className="grid grid-cols-[72px_1fr_180px_120px_140px_28px] gap-4 items-center px-5 py-3">
                  <div>
                    <div className="text-[13px] font-mono font-semibold tabular text-text">
                      {formatTime12(appt.time)}
                    </div>
                    <div className="text-[10.5px] text-text-soft tabular">
                      {appt.durationMin} min
                    </div>
                  </div>

                  <div className="flex items-center gap-3 min-w-0">
                    <Avatar name={patient.name} size={32} />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] font-medium text-text truncate">
                          {patient.name}
                        </span>
                        <span className="text-[11px] text-text-soft tabular">
                          {patient.age}
                          {patient.gender}
                        </span>
                      </div>
                      <div className="text-[11.5px] text-text-soft truncate">
                        {appt.chiefComplaint}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 min-w-0">
                    <span
                      className="w-1.5 h-6 rounded-full"
                      style={{ background: provider.color }}
                    />
                    <div className="min-w-0">
                      <div className="text-[12px] font-medium text-text truncate">
                        {provider.name}
                      </div>
                      <div className="text-[10.5px] text-text-soft truncate">
                        {provider.specialty}
                      </div>
                    </div>
                  </div>

                  <div className="text-[11.5px] text-text-mute font-medium">
                    {appt.visitType}
                  </div>

                  <div className="flex items-center gap-1.5 flex-wrap">
                    <StatusPill status={appt.status} />
                    {appt.aiHandled && <AIBadge size="xs" />}
                    {isWaiting && (
                      <span className="inline-flex items-center gap-1 text-[10.5px] text-warn font-medium tabular">
                        <Clock className="w-3 h-3" />
                        {appt.waitingMin}m
                      </span>
                    )}
                  </div>

                  <div className="text-text-soft">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </Link>
            </motion.li>
          );
        })}
      </motion.ul>
    </div>
  );
}

function AIStat({
  icon: Icon,
  label,
  value,
  sub,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
  value: number;
  sub: string;
}) {
  return (
    <li className="flex items-center gap-3">
      <div className="w-7 h-7 rounded-md bg-accent-soft text-accent-deep flex items-center justify-center shrink-0">
        <Icon className="w-3.5 h-3.5" strokeWidth={2.2} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="text-[12.5px] text-text leading-tight">{label}</div>
        <div className="text-[11px] text-text-soft mt-0.5">{sub}</div>
      </div>
      <div className="font-mono text-[15px] font-semibold tabular text-text">
        {value}
      </div>
    </li>
  );
}
