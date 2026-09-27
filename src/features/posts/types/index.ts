export type PostStatus = "publicado" | "rascunho";

export interface IPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  /** HTML sanitizado. Deve passar por sanitização no backend antes de chegar aqui. */
  content: string;
  category: string;
  /** Data ISO (AAAA-MM-DD) */
  publishedAt: string | null;
  author: string;
  status: PostStatus;
  views: number;
  /** `position`: enquadramento CSS (object-position) quando o centro da foto não é o ponto de interesse */
  cover: { src: string; alt: string; position?: string };
}
