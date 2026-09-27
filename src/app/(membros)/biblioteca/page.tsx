import { redirect } from "next/navigation";
import { MOCK_SESSION_USER } from "@/features/auth/data/mock-session";

export default function BibliotecaRootPage() {
  // Abre a biblioteca direto no grau do Irmão
  redirect(`/biblioteca/${MOCK_SESSION_USER.grau}`);
}
