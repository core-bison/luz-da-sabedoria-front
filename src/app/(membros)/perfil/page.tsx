import type { Metadata } from "next";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { PageHeader } from "@/components/ui/page-header";
import { ProfileForm } from "@/features/area-restrita/components/profile-form";
import { getInitials, MOCK_SESSION_USER } from "@/features/auth/data/mock-session";
import { getGrau } from "@/features/biblioteca/data/mock-documents";

export const metadata: Metadata = { title: "Meu perfil" };

export default function PerfilPage() {
  // TODO: ler o usuário da sessão no servidor
  const user = MOCK_SESSION_USER;

  const identidade = [
    { label: "Grau", value: getGrau(user.grau)?.label ?? "" },
    { label: "Oriente", value: "Milagres, CE" },
    { label: "Obediência", value: "GOCE / COMAB" },
  ];

  return (
    <>
      <PageHeader
        eyebrow="Área pessoal"
        title="Meu perfil"
        description="Consulte e atualize suas informações cadastrais e credenciais de acesso."
      />

      <div className="grid gap-8 lg:grid-cols-12">
        <Card className="self-start border-t-2 border-t-gold p-8 lg:col-span-4">
          <span className="flex size-16 items-center justify-center rounded-full bg-navy font-serif text-2xl font-semibold text-gold">
            {getInitials(user.name)}
          </span>
          <h2 className="mt-5 font-serif text-2xl font-semibold text-navy">{user.name}</h2>
          <Badge tone="success" className="mt-2">
            Ativo na Loja
          </Badge>

          <dl className="mt-6 divide-y divide-line border-t border-line text-sm">
            {identidade.map((item) => (
              <div key={item.label} className="flex justify-between py-3">
                <dt className="text-muted">{item.label}</dt>
                <dd className="font-medium text-navy">{item.value}</dd>
              </div>
            ))}
          </dl>
        </Card>

        <Card className="p-8 lg:col-span-8">
          <ProfileForm user={user} />
        </Card>
      </div>
    </>
  );
}
