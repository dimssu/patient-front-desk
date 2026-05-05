export type AppointmentStatus =
  | "booked"
  | "checked_in"
  | "intake_done"
  | "in_room"
  | "completed"
  | "no_show";

export type VisitType =
  | "New patient"
  | "Follow-up"
  | "Annual"
  | "Acute"
  | "Telehealth";

export type Appointment = {
  id: string;
  time: string; // "08:30"
  durationMin: number;
  patientId: string;
  providerId: string;
  visitType: VisitType;
  status: AppointmentStatus;
  aiHandled: boolean;
  chiefComplaint: string;
  waitingMin?: number;
};

export const appointments: Appointment[] = [
  { id: "a-01", time: "08:00", durationMin: 30, patientId: "p-013", providerId: "pr-aleksandrov", visitType: "Annual", status: "completed", aiHandled: true, chiefComplaint: "Annual wellness visit" },
  { id: "a-02", time: "08:30", durationMin: 20, patientId: "p-005", providerId: "pr-park", visitType: "Follow-up", status: "completed", aiHandled: true, chiefComplaint: "Diabetes follow-up, A1c review" },
  { id: "a-03", time: "09:00", durationMin: 30, patientId: "p-002", providerId: "pr-aleksandrov", visitType: "Follow-up", status: "in_room", aiHandled: true, chiefComplaint: "Hypertension med titration" },
  { id: "a-04", time: "09:00", durationMin: 20, patientId: "p-016", providerId: "pr-okafor", visitType: "Acute", status: "intake_done", aiHandled: true, chiefComplaint: "Sore throat, mild fever 3 days" },
  { id: "a-05", time: "09:30", durationMin: 40, patientId: "p-001", providerId: "pr-aleksandrov", visitType: "Follow-up", status: "checked_in", aiHandled: true, chiefComplaint: "BP recheck + lipid panel review", waitingMin: 18 },
  { id: "a-06", time: "10:00", durationMin: 20, patientId: "p-009", providerId: "pr-vega", visitType: "Telehealth", status: "booked", aiHandled: true, chiefComplaint: "Sinus congestion, virtual" },
  { id: "a-07", time: "10:00", durationMin: 30, patientId: "p-006", providerId: "pr-bennett", visitType: "Annual", status: "checked_in", aiHandled: true, chiefComplaint: "Well-woman exam" },
  { id: "a-08", time: "10:30", durationMin: 30, patientId: "p-012", providerId: "pr-okafor", visitType: "Follow-up", status: "booked", aiHandled: false, chiefComplaint: "2-year well-child check" },
  { id: "a-09", time: "11:00", durationMin: 45, patientId: "p-003", providerId: "pr-park", visitType: "New patient", status: "checked_in", aiHandled: false, chiefComplaint: "Establish care, joint pain", waitingMin: 22 },
  { id: "a-10", time: "11:15", durationMin: 20, patientId: "p-010", providerId: "pr-bennett", visitType: "Acute", status: "no_show", aiHandled: false, chiefComplaint: "UTI symptoms" },
  { id: "a-11", time: "13:00", durationMin: 30, patientId: "p-008", providerId: "pr-aleksandrov", visitType: "Follow-up", status: "booked", aiHandled: true, chiefComplaint: "CHF management, edema check" },
  { id: "a-12", time: "13:30", durationMin: 20, patientId: "p-014", providerId: "pr-vega", visitType: "Acute", status: "booked", aiHandled: true, chiefComplaint: "Lower back strain, 5 days" },
  { id: "a-13", time: "14:00", durationMin: 30, patientId: "p-017", providerId: "pr-park", visitType: "Annual", status: "booked", aiHandled: true, chiefComplaint: "Annual physical" },
  { id: "a-14", time: "14:30", durationMin: 20, patientId: "p-004", providerId: "pr-bennett", visitType: "Follow-up", status: "booked", aiHandled: true, chiefComplaint: "Migraine prevention plan review" },
  { id: "a-15", time: "15:00", durationMin: 30, patientId: "p-007", providerId: "pr-aleksandrov", visitType: "Follow-up", status: "booked", aiHandled: false, chiefComplaint: "Cholesterol recheck" },
  { id: "a-16", time: "15:30", durationMin: 20, patientId: "p-018", providerId: "pr-vega", visitType: "Telehealth", status: "booked", aiHandled: true, chiefComplaint: "Med refill, eczema" },
  { id: "a-17", time: "16:00", durationMin: 30, patientId: "p-011", providerId: "pr-park", visitType: "Acute", status: "booked", aiHandled: true, chiefComplaint: "Allergic rhinitis flare" },
  { id: "a-18", time: "16:30", durationMin: 30, patientId: "p-015", providerId: "pr-aleksandrov", visitType: "Follow-up", status: "booked", aiHandled: true, chiefComplaint: "Thyroid lab review" },
];

export const statusLabel: Record<AppointmentStatus, string> = {
  booked: "Booked",
  checked_in: "Checked in",
  intake_done: "Intake done",
  in_room: "In room",
  completed: "Completed",
  no_show: "No-show",
};

export const statusTone: Record<
  AppointmentStatus,
  { bg: string; text: string; dot: string; border: string }
> = {
  booked: { bg: "bg-text/[0.04]", text: "text-text-mute", dot: "bg-text-soft", border: "border-border" },
  checked_in: { bg: "bg-info-soft", text: "text-info", dot: "bg-info", border: "border-info/20" },
  intake_done: { bg: "bg-accent-soft", text: "text-accent-deep", dot: "bg-accent", border: "border-accent/20" },
  in_room: { bg: "bg-warn-soft", text: "text-warn", dot: "bg-warn", border: "border-warn/20" },
  completed: { bg: "bg-success-soft", text: "text-success", dot: "bg-success", border: "border-success/20" },
  no_show: { bg: "bg-danger-soft", text: "text-danger", dot: "bg-danger", border: "border-danger/20" },
};
