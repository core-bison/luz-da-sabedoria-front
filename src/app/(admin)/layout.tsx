import { redirect } from "next/navigation";
import MembrosLayout from "../(membros)/layout";
import { MOCK_SESSION_USER } from "@/features/auth/data/mock-session";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  // TODO: ler o usuário da sessão no servidor. O proxy também deve bloquear /painel antes de chegar aqui.
  if (!MOCK_SESSION_USER.isAdmin) redirect("/dashboard");

  return <MembrosLayout>{children}</MembrosLayout>;
}
