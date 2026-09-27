import type { Grau } from "@/features/biblioteca/types";

export interface SessionUser {
  name: string;
  email: string;
  phone: string;
  grau: Grau;
  cargo: string;
  isAdmin: boolean;
}

// Usuário simulado até a autenticação real. Substituir pela leitura da sessão no servidor.
export const MOCK_SESSION_USER: SessionUser = {
  name: "Membro Silva",
  email: "membro.silva@exemplo.com",
  phone: "(88) 99999-9999",
  grau: "mestre",
  cargo: "Obreiro",
  isAdmin: true,
};

export function getInitials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}
