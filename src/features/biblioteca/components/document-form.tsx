"use client";

import { useState } from "react";
import { CircleCheck } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { FileInput } from "@/components/ui/file-input";
import { GRAUS } from "../data/mock-documents";
import type { BibliotecaDocument } from "../types";

export const DOCUMENT_FORM_ID = "document-form";

const ACCEPT = [".pdf", ".doc", ".docx", ".zip"];
const MAX_SIZE_MB = 20;

/** Formulário compartilhado entre envio e edição de documentos da biblioteca. */
export function DocumentForm({ document }: { document?: BibliotecaDocument }) {
  const [grau, setGrau] = useState(document?.grau ?? "aprendiz");
  const [feedback, setFeedback] = useState<string | null>(null);
  const isEditing = Boolean(document);

  const visibleTo = GRAUS.filter((g) => g.nivel >= (GRAUS.find((x) => x.slug === grau)?.nivel ?? 1))
    .map((g) => g.label)
    .join(", ");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Mock: upload para o armazenamento e gravação dos metadados serão feitos por Server Action.
    setFeedback(isEditing ? "Alterações salvas (simulação)." : "Documento publicado na biblioteca (simulação).");
  };

  return (
    <form id={DOCUMENT_FORM_ID} onSubmit={handleSubmit} className="grid gap-8 xl:grid-cols-12">
      <div className="flex flex-col gap-6 xl:col-span-8">
        <Field label="Título" htmlFor="title">
          <Input id="title" name="title" required defaultValue={document?.title} />
        </Field>

        <Field label="Descrição" htmlFor="description" hint="Resumo exibido no card do documento.">
          <Textarea id="description" name="description" rows={3} required defaultValue={document?.description} />
        </Field>

        <Field label={isEditing ? "Substituir arquivo" : "Arquivo"} htmlFor="file">
          <FileInput
            id="file"
            name="file"
            accept={ACCEPT}
            maxSizeMB={MAX_SIZE_MB}
            required={!isEditing}
            hint={
              isEditing
                ? `Arquivo atual: ${document?.type} · ${document?.size}. Envie outro apenas para substituí-lo.`
                : `PDF, DOC, DOCX ou ZIP até ${MAX_SIZE_MB} MB.`
            }
          />
        </Field>
      </div>

      <div className="flex flex-col gap-6 xl:col-span-4">
        <Card className="flex flex-col gap-6 p-6">
          <Field label="Grau mínimo" htmlFor="grau" hint={`Visível para: ${visibleTo}.`}>
            <Select
              id="grau"
              name="grau"
              value={grau}
              onChange={(e) => setGrau(e.target.value as BibliotecaDocument["grau"])}
            >
              {GRAUS.map((g) => (
                <option key={g.slug} value={g.slug}>
                  {g.numeral} · {g.label}
                </option>
              ))}
            </Select>
          </Field>

          <label className="flex items-start gap-3">
            <input
              type="checkbox"
              name="isRestricted"
              defaultChecked={document?.isRestricted}
              className="mt-1 size-4 accent-navy"
            />
            <span>
              <span className="block text-sm font-medium text-navy">Material sensível</span>
              <span className="block text-sm text-muted">Rituais e documentos internos. Exibe o selo “Restrito”.</span>
            </span>
          </label>
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
