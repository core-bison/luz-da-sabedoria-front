import type { Metadata } from "next";
import { RestrictedSidebar } from "@/features/area-restrita/components/restricted-sidebar";
import { MOCK_SESSION_USER } from "@/features/auth/data/mock-session";

// Área restrita nunca deve ser indexada por buscadores
export const metadata: Metadata = { robots: { index: false, follow: false } };

export default function MembrosLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-paper md:flex-row">
      <a
        href="#conteudo"
        className="sr-only z-60 bg-navy px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Pular para o conteúdo
      </a>
      {/* TODO: ler o usuário da sessão no servidor */}
      <RestrictedSidebar user={MOCK_SESSION_USER} />
      <main id="conteudo" className="min-w-0 flex-1">
        <div className="mx-auto w-full max-w-6xl px-5 py-10 md:px-10 md:py-12">{children}</div>
      </main>
    </div>
  );
}
