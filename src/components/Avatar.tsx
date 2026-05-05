type AvatarProps = {
  name: string;
  size?: number;
  className?: string;
};

const palettes = [
  { bg: "#fef3c7", fg: "#92400e" },
  { bg: "#dbeafe", fg: "#1e40af" },
  { bg: "#fce7f3", fg: "#9d174d" },
  { bg: "#dcfce7", fg: "#166534" },
  { bg: "#ede9fe", fg: "#5b21b6" },
  { bg: "#ffedd5", fg: "#9a3412" },
  { bg: "#cffafe", fg: "#155e75" },
  { bg: "#fee2e2", fg: "#991b1b" },
  { bg: "#e0e7ff", fg: "#3730a3" },
  { bg: "#ccfbf1", fg: "#115e59" },
];

function paletteFor(name: string) {
  let h = 0;
  for (let i = 0; i < name.length; i++) h = (h * 31 + name.charCodeAt(i)) >>> 0;
  return palettes[h % palettes.length];
}

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function Avatar({ name, size = 28, className = "" }: AvatarProps) {
  const p = paletteFor(name);
  const fontSize = Math.round(size * 0.42);
  return (
    <div
      className={`shrink-0 inline-flex items-center justify-center rounded-full font-semibold ${className}`}
      style={{
        width: size,
        height: size,
        background: p.bg,
        color: p.fg,
        fontSize,
        letterSpacing: "-0.02em",
      }}
      aria-label={name}
    >
      {initials(name)}
    </div>
  );
}
