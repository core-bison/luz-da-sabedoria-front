import type { IPost } from "../types";

// Dados de exemplo até a integração com o banco. Textos são ilustrativos.
export const MOCK_POSTS: IPost[] = [
  {
    id: "1",
    slug: "aniversario-da-loja",
    title: "Sessão comemorativa de aniversário da Loja",
    excerpt:
      "Obreiros, autoridades e Lojas coirmãs reuniram-se para celebrar mais um ano de trabalhos da Luz da Sabedoria.",
    category: "Institucional",
    publishedAt: "2026-03-09",
    author: "Secretaria da Loja",
    status: "publicado",
    views: 142,
    cover: {
      src: "/images/eventos/aniversario-da-loja.jpg",
      alt: "Obreiros da Loja reunidos em traje formal para a foto oficial de aniversário",
      position: "top",
    },
    content: `
      <p>A A∴R∴L∴S∴ Luz da Sabedoria de Milagres Nº 18 celebrou mais um ano de fundação em sessão comemorativa, reunindo seus Obreiros, autoridades maçônicas e Irmãos de Lojas coirmãs.</p>
      <h2>A força da tradição</h2>
      <p>A simplicidade e a profundidade ritualística do Rito Schröder marcaram os trabalhos da noite, reafirmando o compromisso da Loja com os princípios de Liberdade, Igualdade e Fraternidade.</p>
      <blockquote>A verdadeira construção não ocorre apenas no Templo, mas na transformação diária do caráter e nas ações de cada Irmão perante o mundo.</blockquote>
      <p>Após o encerramento dos trabalhos, a fraternidade reuniu-se em ágape, onde reinaram a harmonia e o fortalecimento dos laços que unem a nossa família maçônica.</p>
      <h2>Agradecimentos</h2>
      <p>Agradecemos a presença das Lojas coirmãs e das autoridades que prestigiaram esta data marcante para a Luz da Sabedoria.</p>
    `,
  },
  {
    id: "2",
    slug: "acao-dia-das-criancas",
    title: "Ação social de Dia das Crianças",
    excerpt:
      "Loja e Fraternidade Feminina promoveram uma tarde de brincadeiras, lanche e presentes para as crianças de Milagres.",
    category: "Ação Social",
    publishedAt: "2025-10-12",
    author: "Fraternidade Feminina",
    status: "publicado",
    views: 89,
    cover: {
      src: "/images/eventos/dia-das-criancas-01.jpg",
      alt: "Crianças e Irmãos reunidos em salão decorado com balões durante a ação de Dia das Crianças",
    },
    content: `
      <p>Em celebração ao Dia das Crianças, a Loja e a Fraternidade Feminina organizaram uma tarde dedicada às crianças da comunidade, com brincadeiras, lanche e distribuição de presentes.</p>
      <p>A ação reforça o compromisso da Loja com a beneficência e com o bem-estar das famílias do Oriente de Milagres.</p>
    `,
  },
  {
    id: "3",
    slug: "confraternizacao-dos-irmaos",
    title: "Confraternização entre Irmãos",
    excerpt:
      "Encontro fraterno que reuniu Obreiros e convidados em um momento de integração fora do Templo.",
    category: "Confraternização",
    publishedAt: null,
    author: "Secretaria da Loja",
    status: "rascunho",
    views: 0,
    cover: {
      src: "/images/eventos/confraternizacao-01.jpg",
      alt: "Irmãos com camisas da Loja reunidos em salão durante a confraternização",
    },
    content: `
      <p>A confraternização reuniu Obreiros e convidados em um momento de integração e fortalecimento dos laços fraternais.</p>
    `,
  },
];

export function getPublishedPosts() {
  return MOCK_POSTS.filter((post) => post.status === "publicado");
}

export function getPostBySlug(slug: string) {
  return getPublishedPosts().find((post) => post.slug === slug);
}

export function getPostById(id: string) {
  return MOCK_POSTS.find((post) => post.id === id);
}
