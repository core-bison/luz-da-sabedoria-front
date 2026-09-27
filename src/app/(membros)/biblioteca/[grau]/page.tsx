import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Lock } from "lucide-react";
import { MOCK_SESSION_USER } from "@/features/auth/data/mock-session";
import { canAccessGrau } from "@/features/biblioteca/access";
import { DocumentCard } from "@/features/biblioteca/components/document-card";
import { GRAUS, getDocumentsByGrau, getGrau } from "@/features/biblioteca/data/mock-documents";

type Props = { params: Promise<{ grau: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return GRAUS.map((grau) => ({ grau: grau.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const grau = getGrau((await params).grau);
  return { title: grau ? `Biblioteca · ${grau.label}` : "Biblioteca" };
}

export default async function BibliotecaGrauPage({ params }: Props) {
  const grau = getGrau((await params).grau);
  if (!grau) notFound();

  // TODO: ler o usuário da sessão no servidor (a verificação precisa acontecer aqui e no download)
  if (!canAccessGrau(MOCK_SESSION_USER.grau, grau.slug)) {
    return (
      <div role="status" className="flex flex-col items-center rounded-sm border border-line bg-white px-6 py-16 text-center">
        <Lock aria-hidden className="size-6 text-gold-deep" />
        <h2 className="mt-4 font-serif text-2xl font-semibold text-navy">Conteúdo do grau de {grau.label}</h2>
        <p className="mt-2 max-w-sm text-muted">
          Este acervo é reservado aos Irmãos a partir do grau de {grau.label}.
        </p>
      </div>
    );
  }

  const documents = getDocumentsByGrau(grau.slug);

  return (
    <section aria-labelledby="titulo-grau">
      <h2 id="titulo-grau" className="sr-only">
        Documentos do grau de {grau.label}
      </h2>
      {documents.length === 0 ? (
        <p className="rounded-sm border border-line bg-white px-6 py-16 text-center text-muted">
          Nenhum documento publicado para este grau ainda.
        </p>
      ) : (
        <ul className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {documents.map((doc) => (
            <li key={doc.id}>
              <DocumentCard {...doc} />
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
