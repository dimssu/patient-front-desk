export type Patient = {
  id: string;
  name: string;
  initials: string;
  avatar: string;
  dob: string; // ISO date
  age: number;
  mrn: string;
  primaryInsurance: string;
  allergies: string[];
  gender: "F" | "M" | "NB";
  phone: string;
};

const dice = (seed: string) =>
  `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
    seed
  )}&backgroundType=gradientLinear&fontWeight=600`;

const ageFromDob = (dob: string) => {
  const d = new Date(dob);
  const now = new Date("2026-05-04");
  let age = now.getFullYear() - d.getFullYear();
  const m = now.getMonth() - d.getMonth();
  if (m < 0 || (m === 0 && now.getDate() < d.getDate())) age--;
  return age;
};

const initials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

const mk = (
  id: string,
  name: string,
  dob: string,
  mrn: string,
  primaryInsurance: string,
  allergies: string[],
  gender: Patient["gender"],
  phone: string
): Patient => ({
  id,
  name,
  initials: initials(name),
  avatar: dice(name),
  dob,
  age: ageFromDob(dob),
  mrn,
  primaryInsurance,
  allergies,
  gender,
  phone,
});

export const patients: Patient[] = [
  mk("p-001", "Marcus Reyes", "1971-08-14", "MRN-104882", "BCBS PPO", ["Penicillin"], "M", "(415) 555-0142"),
  mk("p-002", "Janet Thompson", "1958-03-29", "MRN-104915", "Medicare Part B", ["Sulfa", "Latex"], "F", "(415) 555-0188"),
  mk("p-003", "Andrés Morales", "1989-11-02", "MRN-105011", "Aetna HMO", [], "M", "(415) 555-0119"),
  mk("p-004", "Priya Iyer", "1994-06-21", "MRN-105204", "United HC PPO", ["Shellfish"], "F", "(415) 555-0167"),
  mk("p-005", "Wei Chen", "1965-01-30", "MRN-105287", "BCBS HMO", [], "F", "(415) 555-0193"),
  mk("p-006", "Sarah Goldberg", "1982-09-08", "MRN-105350", "Cigna PPO", ["NSAIDs"], "F", "(415) 555-0125"),
  mk("p-007", "DeShawn Carter", "1978-12-17", "MRN-105412", "Kaiser Permanente", [], "M", "(415) 555-0151"),
  mk("p-008", "Rosa Villanueva", "1949-04-11", "MRN-105488", "Medicare Advantage", ["Codeine"], "F", "(415) 555-0173"),
  mk("p-009", "Henrik Nowak", "2001-07-25", "MRN-105533", "Anthem PPO", [], "M", "(415) 555-0136"),
  mk("p-010", "Aaliyah Mitchell", "1996-02-19", "MRN-105601", "Oscar Bronze", [], "F", "(415) 555-0148"),
  mk("p-011", "Tomas Larsen", "1986-10-04", "MRN-105679", "United HC HMO", ["Eggs"], "M", "(415) 555-0162"),
  mk("p-012", "Mei-Lin Zhao", "2018-05-12", "MRN-105722", "BCBS Federal", ["Peanuts"], "F", "(415) 555-0174"),
  mk("p-013", "Robert Atwood", "1953-11-22", "MRN-105800", "Medicare Part B", [], "M", "(415) 555-0185"),
  mk("p-014", "Yusuf Khan", "1990-08-08", "MRN-105844", "Aetna PPO", [], "M", "(415) 555-0190"),
  mk("p-015", "Hannah Lieberman", "1968-04-02", "MRN-105912", "Cigna HMO", ["Iodine"], "F", "(415) 555-0107"),
  mk("p-016", "Ethan Brooks", "2014-09-30", "MRN-106003", "BCBS PPO", ["Tree nuts"], "M", "(415) 555-0145"),
  mk("p-017", "Ngozi Adeyemi", "1979-01-15", "MRN-106087", "Humana PPO", [], "F", "(415) 555-0156"),
  mk("p-018", "Felipe Castillo", "1992-12-28", "MRN-106144", "United HC PPO", ["Bee venom"], "M", "(415) 555-0102"),
];

export const patientById = (id: string) => patients.find((p) => p.id === id);
