export type Provider = {
  id: string;
  name: string;
  short: string;
  role: "MD" | "NP" | "PA";
  specialty: string;
  avatar: string;
  color: string;
};

const dice = (seed: string) =>
  `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
    seed
  )}&backgroundType=gradientLinear&fontWeight=600`;

export const providers: Provider[] = [
  {
    id: "pr-aleksandrov",
    name: "Dr. Mara Aleksandrov",
    short: "Aleksandrov",
    role: "MD",
    specialty: "Internal Medicine",
    avatar: dice("Mara Aleksandrov"),
    color: "#14b8a6",
  },
  {
    id: "pr-park",
    name: "Dr. Elena Park",
    short: "Park",
    role: "MD",
    specialty: "Family Medicine",
    avatar: dice("Elena Park"),
    color: "#6366f1",
  },
  {
    id: "pr-okafor",
    name: "Dr. Samuel Okafor",
    short: "Okafor",
    role: "MD",
    specialty: "Pediatrics",
    avatar: dice("Samuel Okafor"),
    color: "#f97316",
  },
  {
    id: "pr-bennett",
    name: "Lila Bennett",
    short: "Bennett",
    role: "NP",
    specialty: "Women's Health",
    avatar: dice("Lila Bennett"),
    color: "#ec4899",
  },
  {
    id: "pr-vega",
    name: "Carlos Vega",
    short: "Vega",
    role: "PA",
    specialty: "Urgent Care",
    avatar: dice("Carlos Vega"),
    color: "#0ea5e9",
  },
];

export const providerById = (id: string) =>
  providers.find((p) => p.id === id);
