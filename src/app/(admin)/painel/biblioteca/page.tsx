import type { Metadata } from "next";
import Link from "next/link";
import { Lock, Pencil, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Table, TableEmpty, Td, Th, Tr } from "@/components/ui/table";
import { TableToolbar } from "@/features/admin/components/table-toolbar";
import { GRAUS, MOCK_DOCUMENTS, getGrau } from "@/features/biblioteca/data/mock-documents";
import { formatDate } from "@/lib/format";
import { matchesQuery, param } from "@/lib/search";

export const metadata: Metadata = { title: "Biblioteca" };

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

const iconButton =
  "inline-flex size-8 items-center justify-center rounded-sm text-muted transition-colors hover:bg-paper hover:text-navy";

export default async function BibliotecaAdminPage({ searchParams }: Props) {
  const sp = await searchParams;
  const q = param(sp.q);
  const filtro = param(sp.filtro);
  const grauFiltro = GRAUS.find((g) => g.label === filtro)?.slug;

  const documents = MOCK_DOCUMENTS.filter(
    (doc) => matchesQuery(q, doc.title, doc.description) && (!grauFiltro || doc.grau === grauFiltro),
  ).sort((a, b) => b.date.localeCompare(a.date));

  return (
    <>
      <PageHeader
        eyebrow="Gestão de conteúdo"
        title="Biblioteca"
        description="Publique rituais, instruções e documentos para cada grau. O Irmão acessa o próprio grau e os anteriores."
        actions={
          <Button href="/painel/biblioteca/novo">
            <Plus aria-hidden />
            Enviar documento
          </Button>
        }
      />

      <Card>
        <TableToolbar
          searchLabel="Pesquisar documentos"
          filterLabel="Todos os graus"
          filterOptions={GRAUS.map((g) => g.label)}
          query={q}
          filter={filtro}
          summary={`${documents.length} de ${MOCK_DOCUMENTS.length} documentos`}
        />
        <Table>
          <thead>
            <tr>
              <Th>Documento</Th>
              <Th>Grau</Th>
              <Th>Arquivo</Th>
              <Th>Downloads</Th>
              <Th>Publicado em</Th>
              <Th className="text-right">
                <span className="sr-only">Ações</span>
              </Th>
            </tr>
          </thead>
          <tbody>
            {documents.length === 0 && <TableEmpty colSpan={6}>Nenhum documento encontrado.</TableEmpty>}
            {documents.map((doc) => {
              const grau = getGrau(doc.grau);
              return (
                <Tr key={doc.id}>
                  <Td>
                    <p className="flex items-center gap-2 font-medium text-navy">
                      {doc.title}
                      {doc.isRestricted && <Lock aria-label="Material sensível" className="size-3.5 shrink-0 text-gold-deep" />}
                    </p>
                    <p className="mt-0.5 line-clamp-1 max-w-md text-xs text-muted">{doc.description}</p>
                  </Td>
                  <Td>
                    <Badge tone="navy">
                      <span className="mr-1 font-serif text-gold-deep">{grau?.numeral}</span>
                      {grau?.label}
                    </Badge>
                  </Td>
                  <Td className="whitespace-nowrap text-muted">
                    {doc.type} · {doc.size}
                  </Td>
                  <Td className="text-muted tabular-nums">{doc.downloads}</Td>
                  <Td className="whitespace-nowrap text-muted">{formatDate(doc.date)}</Td>
                  <Td>
                    <div className="flex justify-end gap-1">
                      <Link href={`/painel/biblioteca/${doc.id}/editar`} className={iconButton} aria-label={`Editar "${doc.title}"`}>
                        <Pencil aria-hidden className="size-4" />
                      </Link>
                      <button type="button" className={`${iconButton} hover:text-danger`} aria-label={`Excluir "${doc.title}"`}>
                        <Trash2 aria-hidden className="size-4" />
                      </button>
                    </div>
                  </Td>
                </Tr>
              );
            })}
          </tbody>
        </Table>
      </Card>
    </>
  );
}
