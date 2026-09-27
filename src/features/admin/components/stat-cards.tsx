import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import { Card } from "@/components/ui/card";

export interface Stat {
  label: string;
  value: number;
  hint: string;
  href: string;
  icon: LucideIcon;
}

export function StatCards({ stats }: { stats: Stat[] }) {
  return (
    <ul aria-label="Indicadores" className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map(({ label, value, hint, href, icon: Icon }) => (
        <li key={label}>
          <Card className="group relative h-full p-6 transition-colors hover:border-navy/40">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium text-muted">
                <Link href={href} className="after:absolute after:inset-0">
                  {label}
                </Link>
              </p>
              <Icon aria-hidden className="size-4 text-gold-deep" />
            </div>
            <p className="mt-4 font-serif text-5xl leading-none font-semibold text-navy lining-nums">{value}</p>
            <p className="mt-3 text-sm text-muted">{hint}</p>
          </Card>
        </li>
      ))}
    </ul>
  );
}
