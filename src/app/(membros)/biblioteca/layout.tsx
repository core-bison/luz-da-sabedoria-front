import { PageHeader } from "@/components/ui/page-header";
import { MOCK_SESSION_USER } from "@/features/auth/data/mock-session";
import { getAccessibleGraus } from "@/features/biblioteca/access";
import { GrauTabs } from "@/features/biblioteca/components/grau-tabs";

export default function BibliotecaLayout({ children }: { children: React.ReactNode }) {
  // TODO: ler o usuário da sessão no servidor
  const user = MOCK_SESSION_USER;

  return (
    <>
      <PageHeader
        eyebrow="Acervo de estudos"
        title="Biblioteca"
        description="Rituais, documentos internos e peças de arquitetura do seu grau e dos graus anteriores."
      />
      <GrauTabs graus={getAccessibleGraus(user.grau)} />
      {children}
    </>
  );
}
