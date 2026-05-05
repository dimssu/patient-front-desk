import { AppointmentStatus, statusLabel, statusTone } from "@/data/appointments";

export function StatusPill({ status }: { status: AppointmentStatus }) {
  const tone = statusTone[status];
  return (
    <span
      className={`inline-flex items-center gap-1.5 h-[22px] px-2 rounded-full border text-[11px] font-medium ${tone.bg} ${tone.text} ${tone.border}`}
    >
      <span className={`dot ${tone.dot}`} />
      {statusLabel[status]}
    </span>
  );
}
