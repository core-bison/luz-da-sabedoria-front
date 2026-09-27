import type { Metadata } from "next";
import { CalendarX, Plus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Table, TableEmpty, Td, Th, Tr } from "@/components/ui/table";
import { TableToolbar } from "@/features/admin/components/table-toolbar";
import { EVENTO_TIPOS, MOCK_EVENTS } from "@/features/eventos/data/mock-events";
import { formatDate } from "@/lib/format";
import { matchesQuery, param } from "@/lib/search";

export const metadata: Metadata = { title: "Calendário" };

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function GestaoEventosPage({ searchParams }: Props) {
  const sp = await searchParams;
  const q = param(sp.q);
  const filtro = param(sp.filtro);

  const events = MOCK_EVENTS.filter(
    (event) => matchesQuery(q, event.title, event.local) && (!filtro || event.tipo === filtro),
  ).sort((a, b) => a.data.localeCompare(b.data));

  return (
    <>
      <PageHeader
        eyebrow="Administração"
        title="Calendário oficial"
        description="Sessões ordinárias, magnas e eventos públicos ou restritos da Loja."
        actions={
          <Button>
            <Plus aria-hidden />
            Agendar evento
          </Button>
        }
      />

      <Card>
        <TableToolbar
          searchLabel="Pesquisar eventos"
          filterLabel="Todos os tipos"
          filterOptions={EVENTO_TIPOS}
          query={q}
          filter={filtro}
          summary={`${events.length} de ${MOCK_EVENTS.length} eventos`}
        />
        <Table>
          <thead>
            <tr>
              <Th>Evento</Th>
              <Th>Data</Th>
              <Th>Local</Th>
              <Th>Status</Th>
              <Th className="text-right">
                <span className="sr-only">Ações</span>
              </Th>
            </tr>
          </thead>
          <tbody>
            {events.length === 0 && <TableEmpty colSpan={5}>Nenhum evento encontrado.</TableEmpty>}
            {events.map((event) => (
              <Tr key={event.id}>
                <Td>
                  <p className="font-medium text-navy">{event.title}</p>
                  <p className="mt-0.5 text-xs text-muted">{event.tipo}</p>
                </Td>
                <Td className="whitespace-nowrap">
                  <time dateTime={event.data} className="text-navy">
                    {formatDate(event.data)}
                  </time>
                  <span className="text-muted"> · {event.horario}</span>
                </Td>
                <Td className="text-muted">{event.local}</Td>
                <Td>
                  <Badge tone={event.agendado ? "success" : "gold"}>{event.agendado ? "Agendado" : "Rascunho"}</Badge>
                </Td>
                <Td>
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="sm">
                      Editar
                    </Button>
                    <button
                      type="button"
                      aria-label={`Cancelar ${event.title} de ${formatDate(event.data)}`}
                      className="inline-flex size-9 items-center justify-center rounded-sm text-muted transition-colors hover:bg-paper hover:text-danger"
                    >
                      <CalendarX aria-hidden className="size-4" />
                    </button>
                  </div>
                </Td>
              </Tr>
            ))}
          </tbody>
        </Table>
      </Card>
    </>
  );
}
