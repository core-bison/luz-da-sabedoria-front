import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink, Pencil, Plus, Trash2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { Table, TableEmpty, Td, Th, Tr } from "@/components/ui/table";
import { TableToolbar } from "@/features/admin/components/table-toolbar";
import { MOCK_POSTS } from "@/features/posts/data/mock-posts";
import { formatDate } from "@/lib/format";
import { matchesQuery, param } from "@/lib/search";

export const metadata: Metadata = { title: "Publicações" };

type Props = { searchParams: Promise<Record<string, string | string[] | undefined>> };

const iconButton =
  "inline-flex size-8 items-center justify-center rounded-sm text-muted transition-colors hover:bg-paper hover:text-navy";

const categories = [...new Set(MOCK_POSTS.map((post) => post.category))];

export default async function PostsAdminPage({ searchParams }: Props) {
  const sp = await searchParams;
  const q = param(sp.q);
  const filtro = param(sp.filtro);

  const posts = MOCK_POSTS.filter(
    (post) => matchesQuery(q, post.title, post.excerpt) && (!filtro || post.category === filtro),
  );

  return (
    <>
      <PageHeader
        eyebrow="Gestão de conteúdo"
        title="Publicações"
        description="Gerencie as notícias, eventos e rascunhos do portal público da Loja."
        actions={
          <Button href="/painel/posts/novo">
            <Plus aria-hidden />
            Nova publicação
          </Button>
        }
      />

      <Card>
        <TableToolbar
          searchLabel="Pesquisar publicações"
          filterLabel="Todas as categorias"
          filterOptions={categories}
          query={q}
          filter={filtro}
          summary={`${posts.length} de ${MOCK_POSTS.length} publicações`}
        />
        <Table>
          <thead>
            <tr>
              <Th>Título</Th>
              <Th>Categoria</Th>
              <Th>Status</Th>
              <Th>Data</Th>
              <Th className="text-right">
                <span className="sr-only">Ações</span>
              </Th>
            </tr>
          </thead>
          <tbody>
            {posts.length === 0 && <TableEmpty colSpan={5}>Nenhuma publicação encontrada.</TableEmpty>}
            {posts.map((post) => (
              <Tr key={post.id}>
                <Td>
                  <p className="font-medium text-navy">{post.title}</p>
                  <p className="mt-0.5 text-xs text-muted">{post.views} visualizações</p>
                </Td>
                <Td className="text-muted">{post.category}</Td>
                <Td>
                  <Badge tone={post.status === "publicado" ? "success" : "gold"}>
                    {post.status === "publicado" ? "Publicado" : "Rascunho"}
                  </Badge>
                </Td>
                <Td className="whitespace-nowrap text-muted">
                  {post.publishedAt ? formatDate(post.publishedAt) : "—"}
                </Td>
                <Td>
                  <div className="flex justify-end gap-1">
                    {post.status === "publicado" && (
                      <Link href={`/noticias/${post.slug}`} className={iconButton} aria-label={`Ver "${post.title}" no portal`}>
                        <ExternalLink aria-hidden className="size-4" />
                      </Link>
                    )}
                    <Link
                      href={`/painel/posts/${post.id}/editar`}
                      className={iconButton}
                      aria-label={`Editar "${post.title}"`}
                    >
                      <Pencil aria-hidden className="size-4" />
                    </Link>
                    <button
                      type="button"
                      className={`${iconButton} hover:text-danger`}
                      aria-label={`Excluir "${post.title}"`}
                    >
                      <Trash2 aria-hidden className="size-4" />
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
