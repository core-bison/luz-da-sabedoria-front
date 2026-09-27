import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";

interface PageHeaderProps {
  eyebrow?: string;
  title: string;
  description?: string;
  /** Ações alinhadas à direita, ex.: botão "Nova publicação" */
  actions?: React.ReactNode;
  back?: { href: string; label: string };
}

/** Cabeçalho das telas da área restrita e do painel. Renderiza o h1 da página. */
export function PageHeader({ eyebrow, title, description, actions, back }: PageHeaderProps) {
  return (
    <header className="mb-10 border-b border-line pb-8">
      {back && (
        <Link
          href={back.href}
          className="mb-6 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-navy"
        >
          <ArrowLeft aria-hidden className="size-4" />
          {back.label}
        </Link>
      )}
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <SectionHeader as="h1" size="sm" eyebrow={eyebrow} title={title} description={description} />
        {actions && <div className="flex shrink-0 flex-wrap gap-3">{actions}</div>}
      </div>
    </header>
  );
}
