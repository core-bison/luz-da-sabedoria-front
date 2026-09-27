export type Grau = "aprendiz" | "companheiro" | "mestre";

export type DocumentType = "PDF" | "DOC" | "ZIP";

export interface BibliotecaDocument {
  id: string;
  title: string;
  description: string;
  /** Grau mínimo para acessar o documento */
  grau: Grau;
  type: DocumentType;
  /** Data ISO (AAAA-MM-DD) */
  date: string;
  size: string;
  /** Material sensível (ex.: rituais): exibe o selo "Restrito" */
  isRestricted?: boolean;
  downloads: number;
}
