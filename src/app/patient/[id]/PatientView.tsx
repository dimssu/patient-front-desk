"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import {
  AlertCircle,
  ArrowLeft,
  CalendarClock,
  CheckCircle2,
  CheckSquare,
  ClipboardList,
  CreditCard,
  FileText,
  Phone,
  Pill,
  Printer,
  Sparkles,
  Square,
  Stethoscope,
} from "lucide-react";
import { Avatar } from "@/components/Avatar";
import { AIBadge } from "@/components/AIBadge";
import { StatusPill } from "@/components/StatusPill";
import { ConfidenceRing } from "@/components/ConfidenceRing";
import { Patient } from "@/data/patients";
import { Appointment } from "@/data/appointments";
import { Provider } from "@/data/providers";
import {
  ActionItem,
  AISummary,
  HistoryItem,
  IntakeField,
  Medication,
} from "@/data/intake";
import {
  InsuranceVerification,
  insuranceStatusLabel,
  insuranceStatusTone,
} from "@/data/insurance";
import { formatDob, formatTime12 } from "@/lib/format";

const sourceLabel: Record<IntakeField["source"], string> = {
  patient_form: "Patient form",
  prior_chart: "Prior chart",
  insurance_db: "Insurance DB",
};

const groupOrder: IntakeField["group"][] = [
  "Demographics",
  "Vitals",
  "Allergies",
  "Social",
];

export function PatientView({
  patient,
  todayAppt,
  provider,
  insurance,
  intakeFields,
  medications,
  historyItems,
  aiSummary,
  actionItems,
  reconciliationNote,
}: {
  patient: Patient;
  todayAppt: Appointment | null;
  provider: Provider | null;
  insurance: InsuranceVerification | null;
  intakeFields: IntakeField[];
  medications: Medication[];
  historyItems: HistoryItem[];
  aiSummary: AISummary;
  actionItems: ActionItem[];
  reconciliationNote: string;
}) {
  const groupedFields = groupOrder
    .map((g) => ({
      group: g,
      fields: intakeFields.filter((f) => f.group === g),
    }))
    .filter((g) => g.fields.length > 0);

  return (
    <div className="px-8 py-7 max-w-[1480px] mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-4 text-[12.5px] text-text-mute">
        <Link
          href="/"
          className="inline-flex items-center gap-1 hover:text-text transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Today
        </Link>
        <span className="text-text-soft">/</span>
        <span className="text-text">{patient.name}</span>
      </div>

      {/* Patient banner */}
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25 }}
        className="card p-5 mb-5"
      >
        <div className="flex items-center gap-5">
          <Avatar name={patient.name} size={64} className="ring-1 ring-border" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2.5 flex-wrap">
              <h1 className="font-display text-[22px] font-semibold tracking-tight text-text">
                {patient.name}
              </h1>
              <span className="text-[12px] text-text-soft tabular">
                {patient.gender} · {patient.age}y
              </span>
              <span className="inline-flex items-center gap-1 h-5 px-1.5 rounded bg-text/[0.04] text-text-mute text-[11px] font-mono">
                {patient.mrn}
              </span>
              <AIBadge label="Auto-prepped" size="xs" />
            </div>
            <div className="mt-2 flex items-center gap-x-5 gap-y-1 flex-wrap text-[12.5px] text-text-mute">
              <Field label="DOB" value={formatDob(patient.dob)} />
              <Field label="Phone" value={patient.phone} />
              <Field label="Insurance" value={patient.primaryInsurance} />
              <div className="flex items-center gap-1.5">
                <span className="text-text-soft">Allergies</span>
                <div className="flex items-center gap-1 flex-wrap">
                  {patient.allergies.length === 0 ? (
                    <span className="inline-flex items-center h-5 px-1.5 rounded bg-success-soft text-success text-[11px] font-medium">
                      NKDA
                    </span>
                  ) : (
                    patient.allergies.map((a) => (
                      <span
                        key={a}
                        className="inline-flex items-center gap-1 h-5 px-1.5 rounded bg-danger-soft text-danger text-[11px] font-medium"
                      >
                        <AlertCircle className="w-2.5 h-2.5" strokeWidth={2.5} />
                        {a}
                      </span>
                    ))
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button className="h-8 px-3 inline-flex items-center gap-1.5 rounded-md border border-border bg-bg-elev text-[12.5px] text-text-mute hover:text-text hover:border-border-strong transition-colors">
              <Printer className="w-3.5 h-3.5" />
              Print summary
            </button>
            <button className="h-8 px-3 inline-flex items-center gap-1.5 rounded-md bg-text text-bg-elev text-[12.5px] font-medium hover:bg-text/85 transition-colors">
              <CheckCircle2 className="w-3.5 h-3.5" />
              Mark roomed
            </button>
          </div>
        </div>
      </motion.div>

      {/* Three-column body */}
      <motion.div
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.06 } },
        }}
        className="grid grid-cols-12 gap-5"
      >
        {/* LEFT */}
        <motion.div
          variants={col}
          className="col-span-3 space-y-5"
        >
          {todayAppt && provider ? (
            <div className="card p-4">
              <div className="flex items-center gap-2 mb-3">
                <CalendarClock className="w-3.5 h-3.5 text-text-mute" />
                <h3 className="text-[12.5px] font-semibold uppercase tracking-wider text-text-soft">
                  Today&rsquo;s appointment
                </h3>
              </div>
              <div className="font-display text-[20px] font-semibold tracking-tight text-text leading-tight tabular">
                {formatTime12(todayAppt.time)}
              </div>
              <div className="text-[12px] text-text-soft mt-0.5">
                {todayAppt.durationMin} min · {todayAppt.visitType}
              </div>

              <div className="mt-3 pt-3 border-t border-border space-y-2.5">
                <div className="flex items-center gap-2.5">
                  <span
                    className="w-1 h-7 rounded-full shrink-0"
                    style={{ background: provider.color }}
                  />
                  <Avatar name={provider.name} size={28} />
                  <div className="min-w-0">
                    <div className="text-[12.5px] font-medium text-text truncate">
                      {provider.name}
                    </div>
                    <div className="text-[11px] text-text-soft truncate">
                      {provider.specialty} · {provider.role}
                    </div>
                  </div>
                </div>

                <div>
                  <div className="text-[10.5px] uppercase tracking-wider text-text-soft font-medium mb-1">
                    Chief complaint
                  </div>
                  <div className="text-[12.5px] text-text leading-snug">
                    {todayAppt.chiefComplaint}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <span className="text-[11px] text-text-soft">Status</span>
                  <StatusPill status={todayAppt.status} />
                </div>
              </div>
            </div>
          ) : (
            <div className="card p-4">
              <div className="text-[12.5px] text-text-mute">
                No appointment scheduled today.
              </div>
            </div>
          )}

          {/* AI Summary */}
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-3.5 h-3.5 text-accent-deep" />
              <h3 className="text-[12.5px] font-semibold uppercase tracking-wider text-accent-deep">
                What to know
              </h3>
            </div>
            <ul className="space-y-2.5">
              {aiSummary.bullets.map((b, i) => (
                <li key={i} className="flex gap-2 text-[12.5px] text-text leading-relaxed">
                  <span className="mt-1.5 w-1 h-1 rounded-full bg-accent shrink-0" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
              <div className="text-[10.5px] text-text-soft">
                Synthesized from 3 prior visits + labs
              </div>
              <button className="text-[11px] text-accent-deep font-medium hover:underline">
                Source
              </button>
            </div>
          </div>

          {/* History */}
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="w-3.5 h-3.5 text-text-mute" />
              <h3 className="text-[12.5px] font-semibold uppercase tracking-wider text-text-soft">
                Past medical history
              </h3>
            </div>
            <ul className="space-y-2.5">
              {historyItems.map((h) => (
                <li key={h.id} className="text-[12.5px]">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-text font-medium">{h.condition}</span>
                    <span className="text-[10.5px] text-text-soft tabular shrink-0">
                      {h.since}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 mt-0.5">
                    <span
                      className={`text-[10.5px] font-medium ${
                        h.status === "Active"
                          ? "text-warn"
                          : h.status === "Resolved"
                            ? "text-text-soft"
                            : "text-success"
                      }`}
                    >
                      {h.status}
                    </span>
                    {h.note && (
                      <span className="text-[11px] text-text-mute">
                        · {h.note}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* CENTER: intake form */}
        <motion.div variants={col} className="col-span-6 space-y-5">
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between px-5 h-12 border-b border-border">
              <div className="flex items-center gap-2.5">
                <ClipboardList className="w-3.5 h-3.5 text-text-mute" />
                <h2 className="font-display text-[14px] font-semibold tracking-tight">
                  Auto-filled intake
                </h2>
                <AIBadge label={`${intakeFields.length} fields prepped`} size="xs" />
              </div>
              <div className="flex items-center gap-3 text-[11.5px] text-text-soft">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-accent" /> Verified
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-warn" /> Needs review
                </span>
              </div>
            </div>

            {groupedFields.map((g) => (
              <div key={g.group}>
                <div className="px-5 py-2 bg-text/[0.02] border-b border-border text-[10.5px] uppercase tracking-wider font-semibold text-text-soft">
                  {g.group}
                </div>
                <ul className="divide-y divide-border">
                  {g.fields.map((f) => (
                    <li
                      key={f.id}
                      className="grid grid-cols-[170px_1fr_auto] gap-4 items-start px-5 py-3"
                    >
                      <div className="pt-0.5">
                        <div className="text-[12px] text-text-mute">
                          {f.label}
                        </div>
                        <div className="text-[10.5px] text-text-soft">
                          {sourceLabel[f.source]}
                        </div>
                      </div>
                      <div className="min-w-0">
                        <div className="text-[13px] text-text">{f.value}</div>
                        {f.note && (
                          <div
                            className={`text-[11px] mt-0.5 ${
                              f.needsReview ? "text-warn" : "text-text-soft"
                            }`}
                          >
                            {f.note}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        {f.needsReview ? (
                          <span className="inline-flex items-center gap-1 h-[22px] px-2 rounded-full bg-warn-soft text-warn border border-warn/20 text-[11px] font-medium">
                            <AlertCircle className="w-3 h-3" strokeWidth={2.4} />
                            Needs review
                          </span>
                        ) : f.verifiedByPatient ? (
                          <span className="inline-flex items-center gap-1 h-[22px] px-2 rounded-full bg-accent-soft text-accent-deep border border-accent/20 text-[11px] font-medium">
                            <CheckCircle2 className="w-3 h-3" strokeWidth={2.4} />
                            Verified by patient
                          </span>
                        ) : (
                          <span className="inline-flex items-center h-[22px] px-2 rounded-full bg-text/[0.04] text-text-mute text-[11px] font-medium">
                            Awaiting patient
                          </span>
                        )}
                        <ConfidenceRing value={f.confidence} />
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {/* Medications */}
            <div className="border-t border-border">
              <div className="flex items-center justify-between px-5 py-2 bg-text/[0.02] border-b border-border">
                <div className="flex items-center gap-2 text-[10.5px] uppercase tracking-wider font-semibold text-text-soft">
                  <Pill className="w-3 h-3" />
                  Current medications
                </div>
                <span className="text-[10.5px] tabular text-text-soft">
                  {medications.length} active
                </span>
              </div>
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr className="text-left text-text-soft text-[11px] border-b border-border">
                    <th className="px-5 py-2 font-medium">Medication</th>
                    <th className="px-3 py-2 font-medium">Dose</th>
                    <th className="px-3 py-2 font-medium">Frequency</th>
                    <th className="px-3 py-2 font-medium">Indication</th>
                    <th className="px-5 py-2 font-medium text-right">Since</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {medications.map((m) => (
                    <tr key={m.id} className="hover:bg-text/[0.015]">
                      <td className="px-5 py-2.5">
                        <div className="flex items-center gap-2">
                          <span className="text-text font-medium">
                            {m.name}
                          </span>
                          {!m.reconciled && (
                            <span className="inline-flex items-center h-[18px] px-1.5 rounded-full bg-warn-soft text-warn text-[10px] font-medium">
                              Confirm
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-3 py-2.5 text-text font-mono tabular">
                        {m.dose}
                      </td>
                      <td className="px-3 py-2.5 text-text-mute">
                        {m.frequency}
                      </td>
                      <td className="px-3 py-2.5 text-text-mute">
                        {m.indication}
                      </td>
                      <td className="px-5 py-2.5 text-right text-text-soft tabular">
                        {m.startedYear}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>

        {/* RIGHT */}
        <motion.div variants={col} className="col-span-3 space-y-5">
          {/* Insurance */}
          <div className="card overflow-hidden">
            <div className="px-4 py-3 border-b border-border flex items-center gap-2">
              <CreditCard className="w-3.5 h-3.5 text-text-mute" />
              <h3 className="text-[12.5px] font-semibold uppercase tracking-wider text-text-soft">
                Insurance
              </h3>
            </div>

            {insurance ? (
              <div className="p-4 space-y-3">
                {/* card-like */}
                <div className="rounded-md p-3 bg-gradient-to-br from-accent-deep to-[#0b3f3a] text-white">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="text-[10.5px] uppercase tracking-wider opacity-70">
                        Plan
                      </div>
                      <div className="text-[12.5px] font-medium leading-tight">
                        {insurance.plan}
                      </div>
                    </div>
                    <Sparkles className="w-3.5 h-3.5 opacity-80" />
                  </div>
                  <div className="font-mono text-[13px] tracking-wider tabular mt-2">
                    {insurance.memberId}
                  </div>
                  <div className="flex items-center justify-between mt-2 text-[11px] opacity-80">
                    <span>Group {insurance.groupId}</span>
                    <span>{patient.name.split(" ")[0]} {patient.name.split(" ").slice(-1)[0]}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[12px]">
                  <KV
                    k="Status"
                    v={
                      <span
                        className={`inline-flex items-center gap-1.5 h-[22px] px-2 rounded-full text-[11px] font-medium ${insuranceStatusTone[insurance.status].bg} ${insuranceStatusTone[insurance.status].text}`}
                      >
                        <span
                          className={`dot ${insuranceStatusTone[insurance.status].dot}`}
                        />
                        {insuranceStatusLabel[insurance.status]}
                      </span>
                    }
                  />
                  <KV
                    k="Copay"
                    v={
                      insurance.copay !== null ? (
                        <span className="font-mono tabular">${insurance.copay}</span>
                      ) : (
                        <span className="text-text-soft">—</span>
                      )
                    }
                  />
                  <KV
                    k="Deductible left"
                    v={
                      insurance.deductibleRemaining !== null ? (
                        <span className="font-mono tabular">
                          ${insurance.deductibleRemaining}
                        </span>
                      ) : (
                        <span className="text-text-soft">—</span>
                      )
                    }
                  />
                  <KV k="Last checked" v={insurance.lastChecked} />
                </div>

                <div className="rounded-md bg-accent-soft/40 border border-accent/20 p-2.5">
                  <div className="flex items-center gap-1.5 text-[10.5px] uppercase tracking-wider text-accent-deep font-medium">
                    <Sparkles className="w-2.5 h-2.5" />
                    AI note
                  </div>
                  <div className="text-[11.5px] text-text mt-1 leading-snug">
                    {insurance.aiNote}
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-4 text-[12.5px] text-text-mute">
                No verification on file.
              </div>
            )}
          </div>

          {/* Reconciliation note */}
          <div className="card p-4">
            <div className="flex items-center gap-2 mb-2">
              <Pill className="w-3.5 h-3.5 text-text-mute" />
              <h3 className="text-[12.5px] font-semibold uppercase tracking-wider text-text-soft">
                Med reconciliation
              </h3>
            </div>
            <p className="text-[12.5px] text-text-mute leading-relaxed">
              {reconciliationNote}
            </p>
            <div className="mt-3 pt-3 border-t border-border flex items-center justify-between">
              <span className="text-[11px] text-text-soft">
                Last sync · pharmacy
              </span>
              <button className="text-[11.5px] text-text font-medium hover:underline">
                Resync
              </button>
            </div>
          </div>

          {/* Action items */}
          <div className="card overflow-hidden">
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <div className="flex items-center gap-2">
                <CheckSquare className="w-3.5 h-3.5 text-text-mute" />
                <h3 className="text-[12.5px] font-semibold uppercase tracking-wider text-text-soft">
                  Action items
                </h3>
              </div>
              <span className="text-[10.5px] font-mono tabular text-text-soft">
                {actionItems.filter((a) => a.done).length}/{actionItems.length}
              </span>
            </div>
            <ul className="divide-y divide-border">
              {actionItems.map((a) => (
                <li
                  key={a.id}
                  className="px-4 py-2.5 flex items-start gap-2.5 hover:bg-text/[0.015] cursor-pointer"
                >
                  {a.done ? (
                    <CheckSquare className="w-4 h-4 text-accent-deep mt-0.5 shrink-0" strokeWidth={2.2} />
                  ) : (
                    <Square className="w-4 h-4 text-text-soft mt-0.5 shrink-0" strokeWidth={2.2} />
                  )}
                  <div className="min-w-0 flex-1">
                    <div
                      className={`text-[12.5px] leading-snug ${a.done ? "text-text-soft line-through" : "text-text"}`}
                    >
                      {a.text}
                    </div>
                    <div className="text-[10.5px] text-text-soft mt-0.5 capitalize">
                      {a.who.replace("_", " ")}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick actions */}
          <div className="card p-3 grid grid-cols-3 gap-2">
            <QuickAction icon={Phone} label="Call" />
            <QuickAction icon={Stethoscope} label="Room" />
            <QuickAction icon={Printer} label="Print" />
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

const col = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

function Field({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-text-soft">{label}</span>
      <span className="text-text">{value}</span>
    </div>
  );
}

function KV({ k, v }: { k: string; v: React.ReactNode }) {
  return (
    <div>
      <div className="text-[10.5px] uppercase tracking-wider text-text-soft font-medium">
        {k}
      </div>
      <div className="text-text mt-0.5">{v}</div>
    </div>
  );
}

function QuickAction({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string; strokeWidth?: number }>;
  label: string;
}) {
  return (
    <button className="h-14 rounded-md border border-border bg-bg-elev hover:bg-text/[0.02] hover:border-border-strong transition-colors flex flex-col items-center justify-center gap-1">
      <Icon className="w-3.5 h-3.5 text-text-mute" strokeWidth={2.2} />
      <span className="text-[11px] text-text-mute font-medium">{label}</span>
    </button>
  );
}
