import { cn } from "@/lib/utils";

const tones = {
  neutral: "bg-paper text-body ring-line-strong",
  navy: "bg-navy-50 text-navy ring-navy/15",
  gold: "bg-gold/15 text-gold-deep ring-gold/40",
  success: "bg-success/8 text-success ring-success/25",
  warning: "bg-warning/8 text-warning ring-warning/25",
  danger: "bg-danger/8 text-danger ring-danger/25",
} as const;

export type BadgeTone = keyof typeof tones;

interface BadgeProps {
  tone?: BadgeTone;
  className?: string;
  children: React.ReactNode;
}

export function Badge({ tone = "neutral", className, children }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-sm px-2 py-0.5 text-xs font-medium whitespace-nowrap ring-1 ring-inset",
        tones[tone],
        className,
      )}
    >
      {children}
    </span>
  );
}
