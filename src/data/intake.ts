export type IntakeSource = "patient_form" | "prior_chart" | "insurance_db";

export type IntakeField = {
  id: string;
  group: "Demographics" | "Allergies" | "Medications" | "History" | "Social" | "Vitals";
  label: string;
  value: string;
  confidence: number; // 0-1
  source: IntakeSource;
  verifiedByPatient: boolean;
  needsReview: boolean;
  note?: string;
};

export type Medication = {
  id: string;
  name: string;
  dose: string;
  frequency: string;
  indication: string;
  startedYear: number;
  reconciled: boolean;
};

export type HistoryItem = {
  id: string;
  condition: string;
  status: "Active" | "Resolved" | "Chronic, controlled";
  since: string;
  note?: string;
};

export type ActionItem = {
  id: string;
  text: string;
  done: boolean;
  who: "front_desk" | "provider" | "patient";
};

export type AISummary = {
  bullets: string[];
};

// Focal patient: p-001 Marcus Reyes
export const focalPatientId = "p-001";

export const intakeFields: IntakeField[] = [
  { id: "f-01", group: "Demographics", label: "Preferred name", value: "Marcus", confidence: 0.99, source: "patient_form", verifiedByPatient: true, needsReview: false },
  { id: "f-02", group: "Demographics", label: "Pronouns", value: "he/him", confidence: 0.97, source: "patient_form", verifiedByPatient: true, needsReview: false },
  { id: "f-03", group: "Demographics", label: "Preferred language", value: "English", confidence: 0.99, source: "patient_form", verifiedByPatient: true, needsReview: false },
  { id: "f-04", group: "Demographics", label: "Emergency contact", value: "Lena Reyes (spouse) · (415) 555-0143", confidence: 0.95, source: "patient_form", verifiedByPatient: true, needsReview: false },
  { id: "f-05", group: "Vitals", label: "Self-reported weight", value: "192 lb", confidence: 0.86, source: "patient_form", verifiedByPatient: true, needsReview: false, note: "Last in-clinic: 195 lb (Feb 12)" },
  { id: "f-06", group: "Vitals", label: "Home BP avg (14d)", value: "138/86 mmHg", confidence: 0.78, source: "patient_form", verifiedByPatient: true, needsReview: true, note: "Above goal — flag for Dr. Aleksandrov" },
  { id: "f-07", group: "Allergies", label: "Drug allergies", value: "Penicillin — hives, 2009", confidence: 0.94, source: "prior_chart", verifiedByPatient: true, needsReview: false },
  { id: "f-08", group: "Allergies", label: "Environmental", value: "Seasonal pollen (mild)", confidence: 0.81, source: "patient_form", verifiedByPatient: true, needsReview: false },
  { id: "f-09", group: "Social", label: "Tobacco use", value: "Former — quit 2018", confidence: 0.92, source: "patient_form", verifiedByPatient: true, needsReview: false },
  { id: "f-10", group: "Social", label: "Alcohol", value: "2-3 drinks / week", confidence: 0.88, source: "patient_form", verifiedByPatient: true, needsReview: false },
  { id: "f-11", group: "Social", label: "Exercise", value: "Walks 3x/wk, 30 min", confidence: 0.74, source: "patient_form", verifiedByPatient: false, needsReview: true, note: "Patient skipped detail; ask in room" },
  { id: "f-12", group: "Social", label: "Occupation", value: "High-school teacher", confidence: 0.96, source: "prior_chart", verifiedByPatient: true, needsReview: false },
  { id: "f-13", group: "Demographics", label: "Pharmacy", value: "Walgreens · Mission St", confidence: 0.91, source: "prior_chart", verifiedByPatient: true, needsReview: false },
  { id: "f-14", group: "Vitals", label: "Pain score (today)", value: "1 / 10", confidence: 0.99, source: "patient_form", verifiedByPatient: true, needsReview: false },
];

export const medications: Medication[] = [
  { id: "m-01", name: "Lisinopril", dose: "10 mg", frequency: "Once daily", indication: "Hypertension", startedYear: 2019, reconciled: true },
  { id: "m-02", name: "Atorvastatin", dose: "20 mg", frequency: "Once daily, evening", indication: "Hyperlipidemia", startedYear: 2021, reconciled: true },
  { id: "m-03", name: "Metformin", dose: "500 mg", frequency: "Twice daily with meals", indication: "Pre-diabetes", startedYear: 2023, reconciled: true },
  { id: "m-04", name: "Aspirin", dose: "81 mg", frequency: "Once daily", indication: "Cardio prevention", startedYear: 2021, reconciled: true },
  { id: "m-05", name: "Vitamin D3", dose: "2000 IU", frequency: "Once daily", indication: "Supplement", startedYear: 2022, reconciled: true },
  { id: "m-06", name: "Loratadine", dose: "10 mg", frequency: "PRN seasonal", indication: "Allergic rhinitis", startedYear: 2020, reconciled: false },
];

export const historyItems: HistoryItem[] = [
  { id: "h-01", condition: "Hypertension", status: "Chronic, controlled", since: "2019", note: "On lisinopril; home BP recently trending up" },
  { id: "h-02", condition: "Hyperlipidemia", status: "Chronic, controlled", since: "2021", note: "LDL 102 last panel" },
  { id: "h-03", condition: "Pre-diabetes (A1c 6.1)", status: "Active", since: "2023", note: "Lifestyle + metformin" },
  { id: "h-04", condition: "Appendectomy", status: "Resolved", since: "2004" },
  { id: "h-05", condition: "Seasonal allergic rhinitis", status: "Chronic, controlled", since: "2010" },
  { id: "h-06", condition: "Plantar fasciitis (R foot)", status: "Resolved", since: "2022" },
];

export const aiSummary: AISummary = {
  bullets: [
    "Returning for BP recheck and lipid panel review — last in-clinic BP was 142/88 (Feb 12).",
    "Home BP average over the past 14 days is 138/86, trending above the 130/80 goal.",
    "Patient reports adhering to lisinopril 10 mg daily; no reported side effects.",
    "Lipid panel from this morning is back: LDL 102, HDL 47, TG 158 — modestly elevated TG.",
  ],
};

export const actionItems: ActionItem[] = [
  { id: "ai-01", text: "Confirm home BP cuff calibration with patient", done: true, who: "front_desk" },
  { id: "ai-02", text: "Patient to review and sign updated medication list", done: true, who: "patient" },
  { id: "ai-03", text: "Print walk-in lab results for Dr. Aleksandrov", done: true, who: "front_desk" },
  { id: "ai-04", text: "Schedule 3-month follow-up with provider", done: false, who: "front_desk" },
  { id: "ai-05", text: "Send dietitian referral if A1c discussion warrants", done: false, who: "provider" },
  { id: "ai-06", text: "Update emergency contact phone on file", done: false, who: "front_desk" },
];

export const reconciliationNote =
  "AI reconciled 5 of 6 active medications against the prior chart and pharmacy fill history. Loratadine flagged — patient reports PRN use; pharmacy shows last fill 11 months ago. Recommend confirming current use with patient before rooming.";
