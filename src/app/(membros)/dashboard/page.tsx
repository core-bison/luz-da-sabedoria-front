import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { ArrowRight, BookOpen, LayoutDashboard, Megaphone, UserRound } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { MOCK_AVISOS } from "@/features/area-restrita/data/mock-avisos";
import { MOCK_SESSION_USER } from "@/features/auth/data/mock-session";
import { getDocumentsByGrau, getGrau } from "@/features/biblioteca/data/mock-documents";
import { EventList } from "@/features/eventos/components/event-list";
import { getUpcomingEvents } from "@/features/eventos/data/mock-events";
import { formatDate } from "@/lib/format";

export const metadata: Metadata = { title: "Início" };

const todayFormatter = new Intl.DateTimeFormat("pt-BR", {
  weekday: "long",
  day: "numeric",
  month: "long",
  timeZone: "America/Fortaleza",
});

function CardHeading({ title, href, linkLabel }: { title: string; href?: string; linkLabel?: string }) {
  return (
    <div className="flex items-center justify-between gap-4">
      <h2 className="font-serif text-2xl font-semibold text-navy">{title}</h2>
      {href && (
        <Link href={href} className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-navy hover:text-gold-deep">
          {linkLabel} <ArrowRight aria-hidden className="size-4" />
        </Link>
      )}
    </div>
  );
}

export default async function DashboardPage() {
  await connection(); // "próximos eventos" e a data de hoje dependem do momento do acesso

  const user = MOCK_SESSION_USER;
  const grau = getGrau(user.grau)!;
  const firstName = user.name.split(" ")[0];
  const upcoming = getUpcomingEvents(3);
  const recentDocs = getDocumentsByGrau(user.grau).slice(0, 3);

  const atalhos = [
    { title: "Biblioteca", href: `/biblioteca/${user.grau}`, icon: BookOpen },
    { title: "Meu perfil", href: "/perfil", icon: UserRound },
    ...(user.isAdmin ? [{ title: "Painel administrativo", href: "/painel", icon: LayoutDashboard }] : []),
  ];

  return (
    <>
      <header className="mb-10 flex flex-col gap-6 border-b border-line pb-8 md:flex-row md:items-end md:justify-between">
        <div>
          <p className="text-sm text-muted first-letter:uppercase">{todayFormatter.format(new Date())}</p>
          <SectionHeader as="h1" size="sm" title={`Bem-vindo, Ir∴ ${firstName}`} className="mt-3" />
        </div>
        <Badge tone="navy" className="self-start px-3 py-1 text-sm md:self-auto">
          <span className="mr-1.5 font-serif text-gold-deep">{grau.numeral}</span>
          {grau.label}
        </Badge>
      </header>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="flex flex-col gap-8 lg:col-span-7">
          <Card className="p-6">
            <CardHeading title="Próximas sessões e eventos" />
            <EventList events={upcoming} />
          </Card>

          <Card className="p-6">
            <CardHeading title={`Biblioteca · ${grau.label}`} href={`/biblioteca/${user.grau}`} linkLabel="Ver tudo" />
            <ul className="mt-2 divide-y divide-line">
              {recentDocs.map((doc) => (
                <li key={doc.id} className="flex items-center justify-between gap-4 py-4">
                  <div className="min-w-0">
                    <p className="truncate font-medium text-navy">{doc.title}</p>
                    <p className="text-sm text-muted">
                      {doc.type} · {doc.size} · adicionado em <time dateTime={doc.date}>{formatDate(doc.date)}</time>
                    </p>
                  </div>
                  {doc.isRestricted && <Badge tone="navy">Restrito</Badge>}
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="flex flex-col gap-8 lg:col-span-5">
          <Card className="border-t-2 border-t-gold p-6">
            <div className="flex items-center gap-2">
              <Megaphone aria-hidden className="size-4 text-gold-deep" />
              <h2 className="font-serif text-2xl font-semibold text-navy">Avisos da Secretaria</h2>
            </div>
            <ul className="mt-2 divide-y divide-line">
              {MOCK_AVISOS.map((aviso) => (
                <li key={aviso.id} className="py-4">
                  <p className="font-medium text-navy">{aviso.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted">{aviso.text}</p>
                  <time dateTime={aviso.date} className="mt-2 block text-xs text-muted">
                    {formatDate(aviso.date)}
                  </time>
                </li>
              ))}
            </ul>
          </Card>

          <nav aria-label="Atalhos">
            <ul className="grid gap-3">
              {atalhos.map(({ title, href, icon: Icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="group flex items-center gap-3 rounded-sm border border-line bg-white px-5 py-4 font-medium text-navy transition-colors hover:border-navy/40"
                  >
                    <Icon aria-hidden className="size-4 text-gold-deep" />
                    {title}
                    <ArrowRight aria-hidden className="ml-auto size-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </div>
    </>
  );
}
