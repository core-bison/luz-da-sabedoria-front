"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import {
  BookOpen,
  Gauge,
  CalendarDays,
  FileText,
  LayoutDashboard,
  Library,
  LogOut,
  Menu,
  UserRound,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { Brand } from "@/components/ui/brand";
import { getInitials, type SessionUser } from "@/features/auth/data/mock-session";
import { GRAUS } from "@/features/biblioteca/data/mock-documents";
import { cn } from "@/lib/utils";

type NavItem = { name: string; href: string; icon: LucideIcon; exact?: boolean };

const memberMenu: NavItem[] = [
  { name: "Início", href: "/dashboard", icon: LayoutDashboard },
  { name: "Biblioteca", href: "/biblioteca", icon: BookOpen },
  { name: "Meu perfil", href: "/perfil", icon: UserRound },
];

const adminMenu: NavItem[] = [
  { name: "Visão geral", href: "/painel", icon: Gauge, exact: true },
  { name: "Publicações", href: "/painel/posts", icon: FileText },
  { name: "Biblioteca", href: "/painel/biblioteca", icon: Library },
  { name: "Membros", href: "/painel/membros", icon: Users },
  { name: "Calendário", href: "/painel/eventos", icon: CalendarDays },
];

function NavGroup({ label, items, onNavigate }: { label: string; items: NavItem[]; onNavigate: () => void }) {
  const pathname = usePathname();

  return (
    <div>
      <p className="px-3 pb-2 text-xs font-semibold tracking-wider text-muted uppercase">{label}</p>
      <ul className="space-y-0.5">
        {items.map(({ name, href, icon: Icon, exact }) => {
          const isActive = exact ? pathname === href : pathname.startsWith(href);
          return (
            <li key={href}>
              <Link
                href={href}
                onClick={onNavigate}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex items-center gap-3 rounded-sm border-l-2 px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive
                    ? "border-gold bg-navy-50 text-navy"
                    : "border-transparent text-muted hover:bg-paper hover:text-navy",
                )}
              >
                <Icon aria-hidden className="size-4" />
                {name}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function RestrictedSidebar({ user }: { user: SessionUser }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const close = () => setIsMenuOpen(false);

  return (
    <aside className="z-20 flex shrink-0 flex-col border-b border-line bg-white md:sticky md:top-0 md:h-screen md:w-64 md:border-r md:border-b-0">
      <div className="flex h-18 items-center justify-between px-5">
        <Brand href="/dashboard" size="sm" priority />
        <button
          type="button"
          className="inline-flex size-10 items-center justify-center rounded-sm text-navy hover:bg-navy-50 md:hidden"
          aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
          aria-expanded={isMenuOpen}
          aria-controls="menu-restrito"
          onClick={() => setIsMenuOpen((open) => !open)}
        >
          {isMenuOpen ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
        </button>
      </div>

      <div
        id="menu-restrito"
        className={cn("flex-1 flex-col overflow-y-auto border-t border-line", isMenuOpen ? "flex" : "hidden md:flex")}
      >
        <nav aria-label="Área restrita" className="flex-1 space-y-8 px-3 py-6">
          <NavGroup label="Membro" items={memberMenu} onNavigate={close} />
          {user.isAdmin && <NavGroup label="Administração" items={adminMenu} onNavigate={close} />}
        </nav>

        <div className="border-t border-line p-4">
          <div className="flex items-center gap-3 px-1">
            <span className="flex size-9 items-center justify-center rounded-full bg-navy font-serif text-sm font-semibold text-gold">
              {getInitials(user.name)}
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-navy">{user.name}</p>
              <p className="text-xs text-muted">{GRAUS.find((g) => g.slug === user.grau)?.label}</p>
            </div>
          </div>
          <Link
            href="/login"
            className="mt-4 flex items-center gap-2 rounded-sm px-2 py-2 text-sm font-medium text-muted transition-colors hover:bg-paper hover:text-danger"
          >
            <LogOut aria-hidden className="size-4" />
            Sair
          </Link>
        </div>
      </div>
    </aside>
  );
}
