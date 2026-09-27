const dateFormatter = new Intl.DateTimeFormat("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

/** Formata uma data ISO (AAAA-MM-DD) como "09 de março de 2026". */
export function formatDate(isoDate: string) {
  return dateFormatter.format(new Date(isoDate));
}
