export interface Aviso {
  id: string;
  title: string;
  text: string;
  /** Data ISO (AAAA-MM-DD) */
  date: string;
}

// Avisos de exemplo da Secretaria até a integração com o banco.
export const MOCK_AVISOS: Aviso[] = [
  {
    id: "1",
    title: "Atualização cadastral",
    text: "Confira seus dados de contato em Meu perfil para receber as convocações da Loja.",
    date: "2026-09-20",
  },
  {
    id: "2",
    title: "Traje para a Sessão Magna",
    text: "Na Sessão Magna de Iniciação, o traje é o de gala, com os paramentos do grau.",
    date: "2026-09-15",
  },
];
