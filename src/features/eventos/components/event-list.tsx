import type { Evento } from "../data/mock-events";

const dayFormatter = new Intl.DateTimeFormat("pt-BR", { day: "2-digit", timeZone: "UTC" });
const monthFormatter = new Intl.DateTimeFormat("pt-BR", { month: "short", timeZone: "UTC" });

/** Lista compacta de eventos com bloco de data à esquerda. */
export function EventList({ events }: { events: Evento[] }) {
  if (events.length === 0) {
    return <p className="py-6 text-sm text-muted">Nenhum evento agendado.</p>;
  }

  return (
    <ul className="divide-y divide-line">
      {events.map((event) => {
        const date = new Date(event.data);
        return (
          <li key={event.id} className="flex items-center gap-4 py-4">
            <time
              dateTime={event.data}
              className="flex size-14 shrink-0 flex-col items-center justify-center rounded-sm bg-navy text-white"
            >
              <span className="font-serif text-2xl leading-none font-semibold lining-nums">{dayFormatter.format(date)}</span>
              <span className="mt-0.5 text-[0.7rem] tracking-wider text-gold uppercase">
                {monthFormatter.format(date).replace(".", "")}
              </span>
            </time>
            <div className="min-w-0">
              <p className="truncate font-medium text-navy">{event.title}</p>
              <p className="text-sm text-muted">
                {event.horario} · {event.local}
              </p>
            </div>
          </li>
        );
      })}
    </ul>
  );
}
