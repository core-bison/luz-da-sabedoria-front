"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MailCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";

export function PasswordRecoveryForm() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);

  const handleRecovery = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock: envio real do e-mail será implementado com o backend.
    setTimeout(() => {
      setIsLoading(false);
      setIsSent(true);
    }, 1500);
  };

  return (
    <>
      {isSent ? (
        <div role="status">
          <MailCheck aria-hidden className="size-8 text-success" />
          <h1 className="mt-5 font-serif text-3xl font-semibold text-navy">Verifique seu e-mail</h1>
          <p className="mt-3 leading-relaxed text-muted">
            Se <strong className="font-medium text-navy">{email}</strong> estiver cadastrado, você
            receberá em instantes um link para redefinir sua senha.
          </p>
        </div>
      ) : (
        <>
          <h1 className="font-serif text-3xl font-semibold text-navy">Recuperar acesso</h1>
          <p className="mt-2 leading-relaxed text-muted">
            Informe o e-mail da sua conta e enviaremos as instruções para redefinir a senha.
          </p>

          <form onSubmit={handleRecovery} className="mt-8 flex flex-col gap-5">
            <Field label="E-mail" htmlFor="email">
              <Input
                type="email"
                id="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Field>
            <Button type="submit" size="lg" className="w-full" disabled={isLoading}>
              {isLoading ? "Enviando…" : "Enviar instruções"}
            </Button>
          </form>
        </>
      )}

      <Link
        href="/login"
        className="mt-8 inline-flex items-center gap-2 border-t border-line pt-6 text-sm font-medium text-muted hover:text-navy"
      >
        <ArrowLeft aria-hidden className="size-4" />
        Voltar para o login
      </Link>
    </>
  );
}
