export type ExceptionType =
  | "insurance_denied"
  | "intake_incomplete"
  | "urgent_message";

export type Exception = {
  id: string;
  patientId: string;
  type: ExceptionType;
  detail: string;
  ageMin: number;
};

export const exceptions: Exception[] = [
  {
    id: "ex-01",
    patientId: "p-007",
    type: "insurance_denied",
    detail: "Kaiser eligibility denied (out-of-network) for 3:00 PM follow-up.",
    ageMin: 22,
  },
  {
    id: "ex-02",
    patientId: "p-003",
    type: "intake_incomplete",
    detail: "New-patient form: chief complaint and medication list missing.",
    ageMin: 9,
  },
  {
    id: "ex-03",
    patientId: "p-018",
    type: "insurance_denied",
    detail: "Telehealth coverage unclear after mid-month plan change.",
    ageMin: 14,
  },
  {
    id: "ex-04",
    patientId: "p-002",
    type: "urgent_message",
    detail: "Patient called: home BP 168/102 last night — wants Dr. A. to review.",
    ageMin: 4,
  },
  {
    id: "ex-05",
    patientId: "p-010",
    type: "urgent_message",
    detail: "No-show 11:15 AM — patient texted she's en route, ETA 20 min.",
    ageMin: 11,
  },
  {
    id: "ex-06",
    patientId: "p-008",
    type: "intake_incomplete",
    detail: "Updated allergy list not signed by patient before today's visit.",
    ageMin: 38,
  },
];

export const exceptionLabel: Record<ExceptionType, string> = {
  insurance_denied: "Insurance denied",
  intake_incomplete: "Intake incomplete",
  urgent_message: "Urgent message",
};
