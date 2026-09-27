export interface Membro {
  id: string;
  name: string;
  email: string;
  grau: "Aprendiz" | "Companheiro" | "Mestre";
  cargo: string;
  ativo: boolean;
}

// Dados de exemplo até a integração com o banco.
export const MOCK_MEMBERS: Membro[] = [
  {
    id: "1",
    name: "José Roberto dos Santos Ribeiro",
    email: "c.a.m@exemplo.com",
    grau: "Mestre",
    cargo: "Venerável Mestre",
    ativo: true,
  },
  {
    id: "2",
    name: "Cícero Ronaldo dos Santos Ribeiro",
    email: "primeiro.vigilante@exemplo.com",
    grau: "Mestre",
    cargo: "1º Vigilante",
    ativo: true,
  },
  {
    id: "3",
    name: "José Everaldo Bezerra da Silva",
    email: "segundo.vigilante@exemplo.com",
    grau: "Mestre",
    cargo: "2º Vigilante",
    ativo: true,
  },
  {
    id: "4",
    name: "João Victor Rodrigues Moreira",
    email: "secretaria@exemplo.com",
    grau: "Mestre",
    cargo: "Secretário",
    ativo: true,
  },
  {
    id: "5",
    name: "Francisco Ricardo dos Santos Ribeiro",
    email: "tesouraria@exemplo.com",
    grau: "Mestre",
    cargo: "Tesoureiro",
    ativo: true,
  },
  { id: "6", name: "Carlos Eduardo", email: "carlos@exemplo.com", grau: "Companheiro", cargo: "Obreiro", ativo: true },
  { id: "7", name: "Antônio Marcos", email: "antonio@exemplo.com", grau: "Aprendiz", cargo: "Obreiro", ativo: false },
];
