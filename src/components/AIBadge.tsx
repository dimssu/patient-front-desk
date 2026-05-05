import { Sparkles } from "lucide-react";

export function AIBadge({
  label = "AI handled",
  size = "sm",
}: {
  label?: string;
  size?: "xs" | "sm";
}) {
  const sizes =
    size === "xs"
      ? "h-[18px] px-1.5 text-[10px] gap-1"
      : "h-[22px] px-2 text-[11px] gap-1.5";
  const iconSize = size === "xs" ? 10 : 12;
  return (
    <span
      className={`inline-flex items-center rounded-full bg-accent-soft text-accent-deep border border-accent/20 font-medium ${sizes}`}
    >
      <Sparkles width={iconSize} height={iconSize} strokeWidth={2.4} />
      {label}
    </span>
  );
}
