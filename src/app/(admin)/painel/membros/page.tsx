import type { Metadata } from "next";
import { Plus, UserX } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Table, TableEmpty, Td, Th, Tr } from "@/components/ui/table";
import { TableToolbar } from "@/features/admin/components/table-toolbar";
import { MOCK_MEMBERS } from "@/features/membros/data/mock-members";
import { matchesQuery, param } from "@/lib/search";

export const metadata: Metadata = { title: "Membros" };

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

export default async function GestaoMembrosPage({ searchParams }: Props) {
  const sp = await searchParams;
  const q = param(sp.q);
  const filtro = param(sp.filtro);

  const members = MOCK_MEMBERS.filter(
    (member) => matchesQuery(q, member.name, member.email, member.cargo) && (!filtro || member.grau === filtro),
  );

  return (
    <>
      <PageHeader
        eyebrow="Administração"
        title="Membros"
        description="Cadastro de Obreiros, verificação de graus e aprovação de acessos à área restrita."
        actions={
          <Button>
            <Plus aria-hidden />
            Cadastrar membro
          </Button>
        }
      />

      <Card>
        <TableToolbar
          searchLabel="Pesquisar por nome, e-mail ou cargo"
          filterLabel="Todos os graus"
          filterOptions={["Aprendiz", "Companheiro", "Mestre"]}
          query={q}
          filter={filtro}
          summary={`${members.length} de ${MOCK_MEMBERS.length} membros`}
        />
        <Table>
          <thead>
            <tr>
              <Th>Membro</Th>
              <Th>Grau</Th>
              <Th>Cargo</Th>
              <Th>Acesso</Th>
              <Th className="text-right">
                <span className="sr-only">Ações</span>
              </Th>
            </tr>
          </thead>
          <tbody>
            {members.length === 0 && <TableEmpty colSpan={5}>Nenhum membro encontrado.</TableEmpty>}
            {members.map((member) => (
              <Tr key={member.id}>
                <Td>
                  <p className="font-medium text-navy">{member.name}</p>
                  <p className="mt-0.5 text-xs text-muted">{member.email}</p>
                </Td>
                <Td>
                  <Badge tone="navy">{member.grau}</Badge>
                </Td>
                <Td className="text-muted">{member.cargo}</Td>
                <Td>
                  <Badge tone={member.ativo ? "success" : "warning"}>{member.ativo ? "Ativo" : "Pendente"}</Badge>
                </Td>
                <Td>
                  <div className="flex justify-end gap-1">
                    <Button variant="ghost" size="sm">
                      Alterar grau
                    </Button>
                    <button
                      type="button"
                      aria-label={`Desativar acesso de ${member.name}`}
                      className="inline-flex size-9 items-center justify-center rounded-sm text-muted transition-colors hover:bg-paper hover:text-danger"
                    >
                      <UserX aria-hidden className="size-4" />
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
