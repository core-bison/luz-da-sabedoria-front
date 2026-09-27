import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { DOCUMENT_FORM_ID, DocumentForm } from "@/features/biblioteca/components/document-form";
import { MOCK_DOCUMENTS } from "@/features/biblioteca/data/mock-documents";

type Props = { params: Promise<{ id: string }> };

export const metadata: Metadata = { title: "Editar documento" };

export default async function EditarDocumentoPage({ params }: Props) {
  const { id } = await params;
  const document = MOCK_DOCUMENTS.find((doc) => doc.id === id);
  if (!document) notFound();

  return (
    <>
      <PageHeader
        back={{ href: "/painel/biblioteca", label: "Biblioteca" }}
        eyebrow="Biblioteca"
        title="Editar documento"
        description={document.title}
        actions={
          <Button type="submit" form={DOCUMENT_FORM_ID}>
            Salvar alterações
          </Button>
        }
      />
      <DocumentForm document={document} />
    </>
  );
}
