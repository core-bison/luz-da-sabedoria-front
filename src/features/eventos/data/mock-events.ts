export type EventoTipo = "Sessão Ordinária" | "Sessão Magna" | "Ação Social";

export interface Evento {
  id: string;
  title: string;
  tipo: EventoTipo;
  /** Data ISO (AAAA-MM-DD) */
  data: string;
  horario: string;
  local: string;
  agendado: boolean;
}

export const EVENTO_TIPOS: EventoTipo[] = ["Sessão Ordinária", "Sessão Magna", "Ação Social"];

// Dados de exemplo até a integração com o banco.
export const MOCK_EVENTS: Evento[] = [
  {
    id: "1",
    title: "Sessão Ordinária",
    tipo: "Sessão Ordinária",
    data: "2026-10-06",
    horario: "20h",
    local: "Templo da Loja",
    agendado: true,
  },
  {
    id: "2",
    title: "Sessão Magna de Iniciação",
    tipo: "Sessão Magna",
    data: "2026-10-24",
    horario: "19h30",
    local: "Templo da Loja",
    agendado: true,
  },
  {
    id: "3",
    title: "Ação social da Fraternidade Feminina",
    tipo: "Ação Social",
    data: "2026-11-12",
    horario: "9h",
    local: "Milagres, CE",
    agendado: true,
  },
  {
    id: "4",
    title: "Sessão Ordinária",
    tipo: "Sessão Ordinária",
    data: "2026-11-28",
    horario: "20h",
    local: "Templo da Loja",
    agendado: false,
  },
];

/** Eventos agendados a partir de hoje, em ordem cronológica. */
export function getUpcomingEvents(limit?: number) {
  // Data de hoje no fuso da Loja (en-CA formata como AAAA-MM-DD)
  const today = new Intl.DateTimeFormat("en-CA", { timeZone: "America/Fortaleza" }).format(new Date());
  return MOCK_EVENTS.filter((event) => event.agendado && event.data >= today)
    .sort((a, b) => a.data.localeCompare(b.data))
    .slice(0, limit);
}
