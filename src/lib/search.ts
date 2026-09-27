/** Normaliza para busca: minúsculas e sem acentos ("Sessão" → "sessao"). */
export function normalize(text: string) {
  return text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

/** Verdadeiro quando algum dos campos contém o termo (ignorando acentos e caixa). */
export function matchesQuery(query: string | undefined, ...fields: string[]) {
  if (!query) return true;
  const term = normalize(query);
  return fields.some((field) => normalize(field).includes(term));
}

/** Lê um parâmetro de busca como string única. */
export function param(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] : value;
}
