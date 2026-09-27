import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/ui/page-header";
import { POST_FORM_ID, PostForm } from "@/features/posts/components/post-form";
import { getPostById } from "@/features/posts/data/mock-posts";

type Props = { params: Promise<{ id: string }> };

export const metadata: Metadata = { title: "Editar publicação" };

export default async function EditarPostPage({ params }: Props) {
  const post = getPostById((await params).id);
  if (!post) notFound();

  return (
    <>
      <PageHeader
        back={{ href: "/painel/posts", label: "Publicações" }}
        eyebrow="Editor"
        title="Editar publicação"
        description={post.title}
        actions={
          <Button type="submit" form={POST_FORM_ID} name="intent" value="publicar">
            Salvar alterações
          </Button>
        }
      />
      <PostForm post={post} />
    </>
  );
}
