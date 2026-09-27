"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Search } from "lucide-react";
import { Input, Select } from "@/components/ui/field";

interface TableToolbarProps {
  searchLabel: string;
  filterLabel: string;
  filterOptions: string[];
  /** Valores atuais vindos dos searchParams da página */
  query?: string;
  filter?: string;
  /** Ex.: "3 de 7 publicações" */
  summary: string;
}

/** Busca e filtro sincronizados com a URL (?q=&filtro=). A página filtra no servidor. */
export function TableToolbar({ searchLabel, filterLabel, filterOptions, query = "", filter = "", summary }: TableToolbarProps) {
  const router = useRouter();
  const pathname = usePathname();
  const [search, setSearch] = useState(query);
  const [selected, setSelected] = useState(filter);
  const isFirstRender = useRef(true);

  const update = (next: { q?: string; filtro?: string }) => {
    const params = new URLSearchParams();
    const q = next.q ?? search;
    const filtro = next.filtro ?? selected;
    if (q.trim()) params.set("q", q.trim());
    if (filtro) params.set("filtro", filtro);
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  // Debounce da busca para não navegar a cada tecla.
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const timeout = setTimeout(() => update({ q: search }), 300);
    return () => clearTimeout(timeout);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return (
    <div className="flex flex-col gap-3 border-b border-line p-4 sm:flex-row sm:items-center">
      <div className="relative w-full sm:max-w-xs">
        <Search aria-hidden className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted" />
        <Input
          type="search"
          aria-label={searchLabel}
          placeholder={searchLabel}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="h-10 pl-9"
        />
      </div>
      <div className="w-full sm:w-52">
        <Select
          aria-label={filterLabel}
          className="h-10"
          value={selected}
          onChange={(e) => {
            setSelected(e.target.value);
            update({ filtro: e.target.value });
          }}
        >
          <option value="">{filterLabel}</option>
          {filterOptions.map((option) => (
            <option key={option}>{option}</option>
          ))}
        </Select>
      </div>
      <p aria-live="polite" className="text-sm text-muted sm:ml-auto">
        {summary}
      </p>
    </div>
  );
}
