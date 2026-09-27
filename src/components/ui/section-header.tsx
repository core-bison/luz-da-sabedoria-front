import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  /** Rótulo curto acima do título, ex.: "Nossa identidade" */
  eyebrow?: string;
  title: string;
  description?: string;
  /** Nível semântico do título. Cada página deve ter exatamente um h1. */
  as?: "h1" | "h2" | "h3";
  size?: "lg" | "md" | "sm";
  align?: "left" | "center";
  /** `inverse` para uso sobre fundos navy */
  tone?: "default" | "inverse";
  className?: string;
}

const titleSizes = {
  lg: "text-5xl md:text-6xl",
  md: "text-4xl md:text-5xl",
  sm: "text-3xl md:text-4xl",
};

export function SectionHeader({
  eyebrow,
  title,
  description,
  as: Heading = "h2",
  size = "md",
  align = "left",
  tone = "default",
  className,
}: SectionHeaderProps) {
  const inverse = tone === "inverse";

  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      {eyebrow && (
        <p
          className={cn(
            "mb-4 inline-flex items-center gap-3 text-xs font-semibold tracking-[0.16em] uppercase",
            inverse ? "text-gold" : "text-gold-deep",
          )}
        >
          <span aria-hidden className="h-px w-8 bg-gold" />
          {eyebrow}
        </p>
      )}

      <Heading
        className={cn(
          "font-serif leading-[1.05] font-semibold text-balance",
          titleSizes[size],
          inverse ? "text-white" : "text-navy",
        )}
      >
        {title}
      </Heading>

      {description && (
        <p
          className={cn(
            "mt-5 text-lg leading-relaxed text-pretty",
            inverse ? "text-white/75" : "text-muted",
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}
