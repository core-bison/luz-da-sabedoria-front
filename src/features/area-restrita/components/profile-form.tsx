"use client";

import { useState } from "react";
import { CircleCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import type { SessionUser } from "@/features/auth/data/mock-session";

export function ProfileForm({ user }: { user: SessionUser }) {
  const [isSaved, setIsSaved] = useState(false);
  const [passwordError, setPasswordError] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const current = String(data.get("senhaAtual") ?? "");
    const next = String(data.get("novaSenha") ?? "");
    const confirm = String(data.get("confirmarSenha") ?? "");

    if (next || confirm) {
      if (!current) return setPasswordError("Informe a senha atual para definir uma nova.");
      if (next.length < 8) return setPasswordError("A nova senha precisa ter pelo menos 8 caracteres.");
      if (next !== confirm) return setPasswordError("A confirmação não confere com a nova senha.");
    }

    setPasswordError(null);
    // Mock: persistência será implementada com o backend.
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
  };

  return (
    <form onSubmit={handleSave} className="flex flex-col gap-8">
      <fieldset>
        <legend className="mb-6 font-serif text-2xl font-semibold text-navy">Informações pessoais</legend>
        <div className="grid gap-6 md:grid-cols-2">
          <Field label="Nome completo" htmlFor="nome">
            <Input id="nome" name="nome" autoComplete="name" required defaultValue={user.name} />
          </Field>
          <Field label="E-mail" htmlFor="email">
            <Input id="email" name="email" type="email" autoComplete="email" required defaultValue={user.email} />
          </Field>
          <Field label="Celular / WhatsApp" htmlFor="telefone">
            <Input id="telefone" name="telefone" type="tel" autoComplete="tel" defaultValue={user.phone} />
          </Field>
          <Field label="Cargo na Loja" htmlFor="cargo" hint="Alterado apenas pela Secretaria.">
            <Input id="cargo" disabled value={user.cargo} />
          </Field>
        </div>
      </fieldset>

      <fieldset className="border-t border-line pt-8">
        <legend className="float-left mb-2 w-full font-serif text-2xl font-semibold text-navy">Alterar senha</legend>
        <p className="clear-left mb-6 text-sm text-muted">Preencha apenas se quiser trocar a senha.</p>
        <div className="grid gap-6 md:grid-cols-3">
          <Field label="Senha atual" htmlFor="senha-atual">
            <Input id="senha-atual" name="senhaAtual" type="password" autoComplete="current-password" />
          </Field>
          <Field label="Nova senha" htmlFor="nova-senha" hint="Mínimo de 8 caracteres.">
            <Input id="nova-senha" name="novaSenha" type="password" autoComplete="new-password" minLength={8} />
          </Field>
          <Field label="Confirmar nova senha" htmlFor="confirmar-senha">
            <Input id="confirmar-senha" name="confirmarSenha" type="password" autoComplete="new-password" />
          </Field>
        </div>
        {passwordError && (
          <p role="alert" className="mt-4 text-sm text-danger">
            {passwordError}
          </p>
        )}
      </fieldset>

      <div className="flex flex-col-reverse items-stretch gap-4 border-t border-line pt-6 sm:flex-row sm:items-center sm:justify-end">
        {isSaved && (
          <p role="status" className="inline-flex items-center gap-2 text-sm font-medium text-success">
            <CircleCheck aria-hidden className="size-4" />
            Alterações salvas
          </p>
        )}
        <Button type="submit">Salvar alterações</Button>
      </div>
    </form>
  );
}
