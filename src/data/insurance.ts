export type InsuranceStatus = "pending" | "verified" | "denied" | "needs_call";

export type InsuranceVerification = {
  id: string;
  patientId: string;
  plan: string;
  memberId: string;
  groupId: string;
  status: InsuranceStatus;
  copay: number | null;
  deductibleRemaining: number | null;
  lastChecked: string; // human friendly
  aiNote: string;
  phoneScript?: string;
};

export const insuranceVerifications: InsuranceVerification[] = [
  {
    id: "iv-01",
    patientId: "p-001",
    plan: "BCBS PPO — Gold 1500",
    memberId: "XYG 884 122 901",
    groupId: "RVB-2241",
    status: "verified",
    copay: 25,
    deductibleRemaining: 420,
    lastChecked: "8 minutes ago",
    aiNote: "Eligibility confirmed via Availity. Specialist copay $40 if referred today.",
  },
  {
    id: "iv-02",
    patientId: "p-003",
    plan: "Aetna HMO — Open Access",
    memberId: "W201 88 4471",
    groupId: "AET-9912",
    status: "needs_call",
    copay: null,
    deductibleRemaining: null,
    lastChecked: "1 hour ago",
    aiNote: "Member showing on prior plan. Subscriber ID rejected by 270 transaction. Likely off-cycle plan change.",
    phoneScript:
      "Hi, this is Riverbend Family Clinic calling for Andrés Morales, DOB 11/02/1989. We're seeing the prior member ID was terminated effective March 31. Could you verify the active plan and effective date for today's visit, and confirm the PCP-of-record matches Dr. Elena Park? Thank you.",
  },
  {
    id: "iv-03",
    patientId: "p-007",
    plan: "Kaiser Permanente — HMO",
    memberId: "KP 4128 9077",
    groupId: "KP-RIV",
    status: "denied",
    copay: null,
    deductibleRemaining: null,
    lastChecked: "22 minutes ago",
    aiNote: "Denial reason: out-of-network. Patient may need referral or to use Kaiser facility for non-emergent visit.",
    phoneScript:
      "Hi, calling for member DeShawn Carter, DOB 12/17/1978. Eligibility came back denied for an out-of-network outpatient visit today. Is there an active referral on file allowing him to see Dr. Aleksandrov, or do we need to redirect to a Kaiser-network provider?",
  },
  {
    id: "iv-04",
    patientId: "p-008",
    plan: "Medicare Advantage — Humana",
    memberId: "1EG4-TX5-MK22",
    groupId: "HUM-MA-04",
    status: "pending",
    copay: 0,
    deductibleRemaining: 0,
    lastChecked: "Just now",
    aiNote: "Awaiting 271 response. Historical eligibility shows Part B + Plan C secondary. Estimated copay $0.",
  },
  {
    id: "iv-05",
    patientId: "p-014",
    plan: "Aetna PPO — Choice",
    memberId: "W702 11 9930",
    groupId: "AET-2014",
    status: "verified",
    copay: 35,
    deductibleRemaining: 1240,
    lastChecked: "3 minutes ago",
    aiNote: "Active. Note: deductible not yet met — patient may owe full visit cost up to allowed amount.",
  },
  {
    id: "iv-06",
    patientId: "p-018",
    plan: "United HC PPO — Choice Plus",
    memberId: "U7732 18004",
    groupId: "UHC-RIV-PP",
    status: "needs_call",
    copay: null,
    deductibleRemaining: null,
    lastChecked: "14 minutes ago",
    aiNote: "Plan changed mid-month. Telehealth benefit unclear — pre-call to confirm $0 vs. $25 telehealth copay before today's visit.",
    phoneScript:
      "Hello, calling for Felipe Castillo, DOB 12/28/1992. Member ID U7732 18004. He has a telehealth visit at 3:30 today — could you confirm telehealth coverage is active and the patient cost share for a routine virtual visit with an in-network provider?",
  },
  {
    id: "iv-07",
    patientId: "p-011",
    plan: "United HC HMO",
    memberId: "U2208 56120",
    groupId: "UHC-HMO-77",
    status: "verified",
    copay: 20,
    deductibleRemaining: 0,
    lastChecked: "27 minutes ago",
    aiNote: "Deductible met. Standard PCP copay applies.",
  },
];

export const insuranceStatusLabel: Record<InsuranceStatus, string> = {
  pending: "Pending",
  verified: "Verified",
  denied: "Denied",
  needs_call: "Needs call",
};

export const insuranceStatusTone: Record<
  InsuranceStatus,
  { bg: string; text: string; dot: string }
> = {
  pending: { bg: "bg-text/[0.04]", text: "text-text-mute", dot: "bg-text-soft" },
  verified: { bg: "bg-success-soft", text: "text-success", dot: "bg-success" },
  denied: { bg: "bg-danger-soft", text: "text-danger", dot: "bg-danger" },
  needs_call: { bg: "bg-warn-soft", text: "text-warn", dot: "bg-warn" },
};
