export type ScheduleRequest = {
  id: string;
  patientId: string;
  requestedDate: string; // human friendly
  reason: string;
  visitType: "Follow-up" | "Annual" | "Acute" | "New patient" | "Telehealth";
  suggestedSlot: string; // e.g. "Tue May 12, 9:30 AM"
  suggestedProviderId: string;
  fitReason: string;
  source: "Patient portal" | "Phone (AI)" | "Walk-in";
};

export const scheduleRequests: ScheduleRequest[] = [
  {
    id: "sr-01",
    patientId: "p-004",
    requestedDate: "Next week, mornings",
    reason: "Migraine prevention plan re-review; Topamax not tolerated",
    visitType: "Follow-up",
    suggestedSlot: "Tue May 12, 9:30 AM",
    suggestedProviderId: "pr-bennett",
    fitReason: "Same NP who started prophylaxis — preserves continuity.",
    source: "Patient portal",
  },
  {
    id: "sr-02",
    patientId: "p-009",
    requestedDate: "ASAP, telehealth ok",
    reason: "Persistent sinus congestion + low-grade fever, day 6",
    visitType: "Telehealth",
    suggestedSlot: "Today, 10:00 AM",
    suggestedProviderId: "pr-vega",
    fitReason: "Vega has a 20-min acute slot open; Henrik prefers telehealth.",
    source: "Phone (AI)",
  },
  {
    id: "sr-03",
    patientId: "p-015",
    requestedDate: "Within 2 weeks",
    reason: "TSH was elevated; needs recheck and dose discussion",
    visitType: "Follow-up",
    suggestedSlot: "Mon May 11, 4:30 PM",
    suggestedProviderId: "pr-aleksandrov",
    fitReason: "Pairs with end-of-day labs; PCP continuity.",
    source: "Patient portal",
  },
  {
    id: "sr-04",
    patientId: "p-006",
    requestedDate: "Late May",
    reason: "Annual well-woman exam + IUD discussion",
    visitType: "Annual",
    suggestedSlot: "Wed May 27, 10:00 AM",
    suggestedProviderId: "pr-bennett",
    fitReason: "NP Bennett's women's-health block; 30-min slot open.",
    source: "Patient portal",
  },
  {
    id: "sr-05",
    patientId: "p-016",
    requestedDate: "This week if possible",
    reason: "Post-strep symptoms persist; rapid was negative",
    visitType: "Acute",
    suggestedSlot: "Thu May 7, 11:00 AM",
    suggestedProviderId: "pr-okafor",
    fitReason: "Same pediatrician saw initial visit; throat culture pending.",
    source: "Phone (AI)",
  },
  {
    id: "sr-06",
    patientId: "p-018",
    requestedDate: "Any afternoon",
    reason: "Eczema flare, needs prescription refill",
    visitType: "Telehealth",
    suggestedSlot: "Fri May 8, 3:30 PM",
    suggestedProviderId: "pr-vega",
    fitReason: "Quick virtual; Vega manages med refills same-day.",
    source: "Patient portal",
  },
  {
    id: "sr-07",
    patientId: "p-010",
    requestedDate: "Rebook (no-show this AM)",
    reason: "UTI symptoms, dysuria worsening",
    visitType: "Acute",
    suggestedSlot: "Tomorrow, 9:00 AM",
    suggestedProviderId: "pr-bennett",
    fitReason: "Rebooked into earliest acute slot; flagged for outreach.",
    source: "Phone (AI)",
  },
  {
    id: "sr-08",
    patientId: "p-014",
    requestedDate: "End of week",
    reason: "Lower back pain not improving with NSAIDs after 5 days",
    visitType: "Follow-up",
    suggestedSlot: "Fri May 8, 1:30 PM",
    suggestedProviderId: "pr-vega",
    fitReason: "Same PA; PT referral discussion if warranted.",
    source: "Phone (AI)",
  },
  {
    id: "sr-09",
    patientId: "p-017",
    requestedDate: "Within month",
    reason: "Establish care for new annual physical",
    visitType: "Annual",
    suggestedSlot: "Wed May 20, 2:00 PM",
    suggestedProviderId: "pr-park",
    fitReason: "Dr. Park is taking new patients; 30-min new-patient block.",
    source: "Patient portal",
  },
];
