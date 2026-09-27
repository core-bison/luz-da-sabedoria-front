import type { Metadata } from "next";
import Link from "next/link";
import { connection } from "next/server";
import { ArrowRight, CalendarDays, FilePen, FileText, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { StatCards, type Stat } from "@/features/admin/components/stat-cards";
import { EventList } from "@/features/eventos/components/event-list";
import { getUpcomingEvents } from "@/features/eventos/data/mock-events";
import { MOCK_MEMBERS } from "@/features/membros/data/mock-members";
import { MOCK_POSTS } from "@/features/posts/data/mock-posts";

export const metadata: Metadata = { title: "Visão geral" };

export default async function PainelPage() {
  await connection(); // "próximos eventos" depende da data do acesso

  const published = MOCK_POSTS.filter((post) => post.status === "publicado");
  const drafts = MOCK_POSTS.filter((post) => post.status === "rascunho");
  const activeMembers = MOCK_MEMBERS.filter((member) => member.ativo);
  const pendingMembers = MOCK_MEMBERS.filter((member) => !member.ativo);
  const upcoming = getUpcomingEvents();

  const stats: Stat[] = [
    { label: "Publicações", value: published.length, hint: "no portal público", href: "/painel/posts", icon: FileText },
    { label: "Rascunhos", value: drafts.length, hint: "aguardando revisão", href: "/painel/posts", icon: FilePen },
    { label: "Membros ativos", value: activeMembers.length, hint: `${pendingMembers.length} aguardando aprovação`, href: "/painel/membros", icon: Users },
    { label: "Próximos eventos", value: upcoming.length, hint: "agendados", href: "/painel/eventos", icon: CalendarDays },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Administração"
        title="Visão geral"
        description="Resumo do conteúdo, dos membros e da agenda da Loja."
        actions={<Button href="/painel/posts/novo">Nova publicação</Button>}
      />

      <StatCards stats={stats} />

      <div className="mt-8 grid gap-8 lg:grid-cols-2">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-serif text-2xl font-semibold text-navy">Próximos eventos</h2>
            <Link href="/painel/eventos" className="inline-flex items-center gap-1 text-sm font-medium text-navy hover:text-gold-deep">
              Calendário <ArrowRight aria-hidden className="size-4" />
            </Link>
          </div>
          <EventList events={upcoming.slice(0, 4)} />
        </Card>

        <Card className="p-6">
          <h2 className="font-serif text-2xl font-semibold text-navy">Pendências</h2>
          <ul className="mt-2 divide-y divide-line">
            {pendingMembers.map((member) => (
              <li key={member.id} className="flex items-center justify-between gap-4 py-4">
                <div className="min-w-0">
                  <p className="truncate font-medium text-navy">{member.name}</p>
                  <p className="text-sm text-muted">Acesso aguardando aprovação · {member.grau}</p>
                </div>
                <Badge tone="warning">Membro</Badge>
              </li>
            ))}
            {drafts.map((post) => (
              <li key={post.id} className="flex items-center justify-between gap-4 py-4">
                <div className="min-w-0">
                  <Link href={`/painel/posts/${post.id}/editar`} className="block truncate font-medium text-navy hover:underline">
                    {post.title}
                  </Link>
                  <p className="text-sm text-muted">Rascunho aguardando publicação</p>
                </div>
                <Badge tone="gold">Publicação</Badge>
              </li>
            ))}
            {pendingMembers.length + drafts.length === 0 && (
              <li className="py-6 text-sm text-muted">Nenhuma pendência no momento.</li>
            )}
          </ul>
        </Card>
      </div>
    </>
  );
}
