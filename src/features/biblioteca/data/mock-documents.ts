import type { BibliotecaDocument, Grau } from "../types";

export const GRAUS: { slug: Grau; label: string; numeral: string; nivel: number }[] = [
  { slug: "aprendiz", label: "Aprendiz", numeral: "I", nivel: 1 },
  { slug: "companheiro", label: "Companheiro", numeral: "II", nivel: 2 },
  { slug: "mestre", label: "Mestre", numeral: "III", nivel: 3 },
];

export function getGrau(slug: string) {
  return GRAUS.find((grau) => grau.slug === slug);
}

// Dados de exemplo até a integração com o armazenamento de documentos.
export const MOCK_DOCUMENTS: BibliotecaDocument[] = [
  {
    id: "1",
    grau: "aprendiz",
    title: "Ritual do Grau de Aprendiz — Rito Schröder",
    description: "Versão oficial e atualizada do ritual para as sessões do primeiro grau simbólico.",
    type: "PDF",
    date: "2026-03-15",
    size: "2,4 MB",
    isRestricted: true,
    downloads: 34,
  },
  {
    id: "2",
    grau: "aprendiz",
    title: "Instrução I: o simbolismo das ferramentas",
    description: "Peça de arquitetura sobre o significado do maço, do cinzel e da régua de 24 polegadas.",
    type: "DOC",
    date: "2026-04-10",
    size: "156 KB",
    downloads: 21,
  },
  {
    id: "3",
    grau: "aprendiz",
    title: "Guia de postura em Loja",
    description: "Orientações sobre a circulação e o comportamento do Aprendiz durante os trabalhos.",
    type: "PDF",
    date: "2026-05-22",
    size: "1,1 MB",
    downloads: 18,
  },
  {
    id: "4",
    grau: "companheiro",
    title: "Ritual do Grau de Companheiro — Rito Schröder",
    description: "Versão oficial e atualizada do ritual para as sessões do segundo grau simbólico.",
    type: "PDF",
    date: "2026-03-18",
    size: "2,1 MB",
    isRestricted: true,
    downloads: 15,
  },
  {
    id: "5",
    grau: "companheiro",
    title: "Instrução: a geometria e a Maçonaria",
    description: "Estudo sobre a letra G e a importância das ciências exatas no desenvolvimento do Companheiro.",
    type: "DOC",
    date: "2026-05-05",
    size: "210 KB",
    downloads: 9,
  },
  {
    id: "6",
    grau: "companheiro",
    title: "As ferramentas do Companheiro",
    description: "Análise filosófica sobre o esquadro, o nível e o prumo.",
    type: "PDF",
    date: "2026-06-12",
    size: "1,5 MB",
    downloads: 7,
  },
  {
    id: "7",
    grau: "mestre",
    title: "Ritual do Grau de Mestre — Rito Schröder",
    description: "Versão oficial para as sessões de elevação ao terceiro grau simbólico.",
    type: "PDF",
    date: "2026-03-20",
    size: "3,2 MB",
    isRestricted: true,
    downloads: 12,
  },
  {
    id: "8",
    grau: "mestre",
    title: "Documentos administrativos da Loja",
    description: "Atas de reuniões de Mestres, regimentos internos e relatórios da tesouraria.",
    type: "ZIP",
    date: "2026-09-01",
    size: "12,5 MB",
    isRestricted: true,
    downloads: 5,
  },
  {
    id: "9",
    grau: "mestre",
    title: "Estudos filosóficos avançados",
    description: "Coletânea de peças de arquitetura e reflexões sobre a Lenda e o simbolismo do grau.",
    type: "DOC",
    date: "2026-08-15",
    size: "450 KB",
    downloads: 11,
  },
];

/** Documentos de um grau específico, mais recentes primeiro. */
export function getDocumentsByGrau(grau: Grau) {
  return MOCK_DOCUMENTS.filter((doc) => doc.grau === grau).sort((a, b) => b.date.localeCompare(a.date));
}
