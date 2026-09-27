import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface BrandProps {
  href?: string;
  /** `inverse` para uso sobre fundos navy */
  tone?: "default" | "inverse";
  size?: "sm" | "md";
  /** Apenas para a marca acima da dobra (header) */
  priority?: boolean;
  className?: string;
}

/** Brasão + nome da Loja. Único ponto de verdade da assinatura visual. */
export function Brand({ href = "/", tone = "default", size = "md", priority = false, className }: BrandProps) {
  const inverse = tone === "inverse";
  const logo = size === "sm" ? 36 : 48;

  return (
    <Link href={href} className={cn("flex items-center gap-3", className)}>
      <Image src="/images/logos/brasao-l18.png" alt="" width={logo} height={logo} priority={priority} />
      <span className="flex flex-col leading-none">
        <span
          className={cn(
            "font-serif font-semibold",
            size === "sm" ? "text-lg" : "text-xl",
            inverse ? "text-white" : "text-navy",
          )}
        >
          Luz da Sabedoria
        </span>
        <span className={cn("mt-1 text-xs", inverse ? "text-white/60" : "text-muted")}>
          A∴R∴L∴S∴ · Milagres Nº 18
        </span>
      </span>
    </Link>
  );
}
