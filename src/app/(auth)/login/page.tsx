import type { Metadata } from "next";
import { LoginForm } from "@/features/auth/components/login-form";

export const metadata: Metadata = { title: "Entrar", robots: { index: false } };

export default function LoginPage() {
  return (
    <>
      <h1 className="font-serif text-3xl font-semibold text-navy">Entrar</h1>
      <p className="mt-2 text-muted">Use o e-mail cadastrado na Secretaria da Loja.</p>
      <LoginForm />
    </>
  );
}
