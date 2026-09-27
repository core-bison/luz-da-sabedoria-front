import type { Metadata } from "next";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { POST_FORM_ID, PostForm } from "@/features/posts/components/post-form";

export const metadata: Metadata = { title: "Nova publicação" };

export default function NovoPostPage() {
  return (
    <>
      <PageHeader
        back={{ href: "/painel/posts", label: "Publicações" }}
        eyebrow="Editor"
        title="Nova publicação"
        description="Crie uma notícia, registro de sessão ou evento para o portal público."
        actions={
          <>
            <Button type="submit" form={POST_FORM_ID} name="intent" value="rascunho" variant="secondary">
              Salvar rascunho
            </Button>
            <Button type="submit" form={POST_FORM_ID} name="intent" value="publicar">
              Publicar
            </Button>
          </>
        }
      />
      <PostForm />
    </>
  );
}
