"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { GRAUS } from "../data/mock-documents";

/** Abas dos graus que o Irmão pode acessar. */
export function GrauTabs({ graus }: { graus: typeof GRAUS }) {
  const pathname = usePathname();

  return (
    <nav aria-label="Graus" className="mb-10 flex gap-6 overflow-x-auto border-b border-line">
      {graus.map((grau) => {
        const href = `/biblioteca/${grau.slug}`;
        const isActive = pathname === href;
        return (
          <Link
            key={grau.slug}
            href={href}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "-mb-px border-b-2 pb-3 text-sm font-medium whitespace-nowrap transition-colors",
              isActive ? "border-gold text-navy" : "border-transparent text-muted hover:text-navy",
            )}
          >
            <span className="mr-2 font-serif text-gold-deep">{grau.numeral}</span>
            {grau.label}
          </Link>
        );
      })}
    </nav>
  );
}
