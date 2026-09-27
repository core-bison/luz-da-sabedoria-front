import { GRAUS } from "./data/mock-documents";
import type { Grau } from "./types";

const nivel = (grau: Grau) => GRAUS.find((g) => g.slug === grau)?.nivel ?? 0;

/**
 * Regra de acesso da biblioteca: o Irmão acessa o próprio grau e os anteriores.
 * Aprendiz → I · Companheiro → I e II · Mestre → I, II e III.
 * Deve ser reaplicada no servidor (rota, API e download) quando houver sessão real.
 */
export function canAccessGrau(userGrau: Grau, docGrau: Grau) {
  return nivel(userGrau) >= nivel(docGrau);
}

export function getAccessibleGraus(userGrau: Grau) {
  return GRAUS.filter((grau) => canAccessGrau(userGrau, grau.slug));
}
