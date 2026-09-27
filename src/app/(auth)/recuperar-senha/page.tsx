import type { Metadata } from "next";
import { PasswordRecoveryForm } from "@/features/auth/components/password-recovery-form";

export const metadata: Metadata = { title: "Recuperar acesso", robots: { index: false } };

export default function RecuperarSenhaPage() {
  return <PasswordRecoveryForm />;
}
