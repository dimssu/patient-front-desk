type Props = {
  value: number; // 0-1
  size?: number;
  stroke?: number;
};

export function ConfidenceRing({ value, size = 22, stroke = 2.5 }: Props) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - Math.max(0, Math.min(1, value)));

  let color = "#14b8a6"; // accent
  if (value < 0.85) color = "#d97706"; // warn
  if (value < 0.7) color = "#dc2626"; // danger

  return (
    <span
      className="relative inline-flex items-center justify-center shrink-0"
      style={{ width: size, height: size }}
      aria-label={`Confidence ${(value * 100).toFixed(0)}%`}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke="#e7e5e4"
          strokeWidth={stroke}
          fill="none"
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          fill="none"
        />
      </svg>
      <span
        className="absolute text-[8.5px] font-mono font-semibold"
        style={{ color }}
      >
        {Math.round(value * 100)}
      </span>
    </span>
  );
}
