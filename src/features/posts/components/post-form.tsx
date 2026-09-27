"use client";

import { useState } from "react";
import { CircleCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { FileInput } from "@/components/ui/file-input";
import type { IPost } from "../types";

const CATEGORIES = ["Institucional", "Sessão Magna", "Sessão Ordinária", "Ação Social", "Instrução", "Confraternização"];

export const POST_FORM_ID = "post-form";

/** Formulário compartilhado entre criação e edição de publicações. */
export function PostForm({ post }: { post?: IPost }) {
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const submitter = (e.nativeEvent as SubmitEvent).submitter as HTMLButtonElement | null;
    const isDraft = submitter?.value === "rascunho";
    // Mock: gravação será implementada com as Server Actions de posts.
    setFeedback(isDraft ? "Rascunho salvo (simulação)." : "Publicação salva (simulação).");
  };

  return (
    <form id={POST_FORM_ID} onSubmit={handleSubmit} className="grid gap-8 xl:grid-cols-12">
      <div className="flex flex-col gap-6 xl:col-span-8">
        <Field label="Título" htmlFor="title">
          <Input
            id="title"
            name="title"
            required
            defaultValue={post?.title}
            className="h-14 font-serif text-2xl font-semibold"
          />
        </Field>

        <Field label="Resumo" htmlFor="excerpt" hint="Aparece nos cards da listagem de notícias.">
          <Textarea id="excerpt" name="excerpt" rows={2} defaultValue={post?.excerpt} className="min-h-20" />
        </Field>

        <Field
          label="Conteúdo"
          htmlFor="content"
          hint="O editor de texto formatado será integrado junto com o backend."
        >
          <Textarea
            id="content"
            name="content"
            required
            rows={16}
            defaultValue={post?.content.trim()}
            className="font-mono text-sm"
          />
        </Field>
      </div>

      <div className="flex flex-col gap-6 xl:col-span-4">
        <Card className="p-6">
          <Field label="Categoria" htmlFor="category">
            <Select id="category" name="category" defaultValue={post?.category ?? CATEGORIES[0]}>
              {CATEGORIES.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </Select>
          </Field>
        </Card>

        <Card className="p-6">
          <Field label="Imagem de capa" htmlFor="cover">
            <FileInput
              id="cover"
              name="cover"
              accept={[".jpg", ".jpeg", ".png", ".webp"]}
              maxSizeMB={2}
              required={!post}
              hint={post ? "Envie outra imagem apenas para substituir a atual." : "JPG, PNG ou WEBP até 2 MB · proporção 3:2."}
            />
          </Field>
        </Card>

        {feedback && (
          <p role="status" className="inline-flex items-center gap-2 text-sm font-medium text-success">
            <CircleCheck aria-hidden className="size-4" />
            {feedback}
          </p>
        )}
      </div>
    </form>
  );
}
