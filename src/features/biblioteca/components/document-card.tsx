import { Download, FileArchive, FileText, FileType, Lock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { formatDate } from "@/lib/format";
import type { BibliotecaDocument } from "../types";

const typeIcons = { PDF: FileText, DOC: FileType, ZIP: FileArchive };

export function DocumentCard({ title, description, type, date, size, isRestricted = false }: BibliotecaDocument) {
  const Icon = typeIcons[type];

  return (
    <Card className="flex h-full flex-col p-6">
      <div className="flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-xs font-semibold text-muted">
          <Icon aria-hidden className="size-4 text-gold-deep" />
          {type} · {size}
        </span>
        {isRestricted && (
          <Badge tone="navy" className="gap-1">
            <Lock aria-hidden className="size-3" />
            Restrito
          </Badge>
        )}
      </div>

      <h3 className="mt-5 font-serif text-xl leading-snug font-semibold text-navy">{title}</h3>
      <p className="mt-2 line-clamp-3 grow text-sm leading-relaxed text-muted">{description}</p>

      <div className="mt-6 flex items-center justify-between border-t border-line pt-4">
        <p className="text-xs text-muted">
          Adicionado em <time dateTime={date}>{formatDate(date)}</time>
        </p>
        {/* TODO: ligar ao download protegido por sessão e grau */}
        <button
          type="button"
          aria-label={`Baixar ${title}`}
          className="inline-flex size-9 items-center justify-center rounded-sm border border-line text-navy transition-colors hover:border-navy hover:bg-navy-50"
        >
          <Download aria-hidden className="size-4" />
        </button>
      </div>
    </Card>
  );
}
