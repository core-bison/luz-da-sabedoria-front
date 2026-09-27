import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { DOCUMENT_FORM_ID, DocumentForm } from "@/features/biblioteca/components/document-form";

export const metadata: Metadata = { title: "Enviar documento" };

export default function NovoDocumentoPage() {
  return (
    <>
      <PageHeader
        back={{ href: "/painel/biblioteca", label: "Biblioteca" }}
        eyebrow="Biblioteca"
        title="Enviar documento"
        description="O documento fica disponível para o grau escolhido e os graus acima dele."
        actions={
          <Button type="submit" form={DOCUMENT_FORM_ID}>
            Publicar documento
          </Button>
        }
      />
      <DocumentForm />
    </>
  );
}
