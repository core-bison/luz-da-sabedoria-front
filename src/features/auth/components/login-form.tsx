"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock: autenticação real será implementada com o backend.
    setTimeout(() => router.push("/dashboard"), 1200);
  };

  return (
    <form onSubmit={handleLogin} className="mt-8 flex flex-col gap-5">
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

      <Field
        label="Senha"
        htmlFor="password"
        action={
          <Link href="/recuperar-senha" className="text-sm text-muted hover:text-navy">
            Esqueceu a senha?
          </Link>
        }
      >
        <Input
          type="password"
          id="password"
          required
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </Field>

      <Button type="submit" size="lg" className="mt-2 w-full" disabled={isLoading}>
        {isLoading && <LoaderCircle aria-hidden className="animate-spin" />}
        {isLoading ? "Entrando…" : "Entrar"}
      </Button>
    </form>
  );
}
