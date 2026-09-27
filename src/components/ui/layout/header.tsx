"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Lock, Menu, X } from "lucide-react";
import { Brand } from "@/components/ui/brand";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "Início", href: "/" },
  { name: "Quem Somos", href: "/quem-somos" },
  { name: "O Rito", href: "/rito-schroder" },
  { name: "Fraternidade Feminina", href: "/fraternidade" },
  { name: "Notícias", href: "/noticias" },
  { name: "Contato", href: "/contato" },
];

export function Header() {
  const pathname = usePathname();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-50 border-b border-line bg-white/95 backdrop-blur-sm">
      <div className="container-page flex h-18 items-center justify-between gap-6">
        <Brand priority />

        <nav aria-label="Principal" className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={cn(
                "relative px-3 py-2 text-sm font-medium transition-colors",
                "after:absolute after:inset-x-3 after:-bottom-px after:h-0.5 after:origin-left after:scale-x-0 after:bg-gold after:transition-transform",
                isActive(link.href)
                  ? "text-navy after:scale-x-100"
                  : "text-muted hover:text-navy hover:after:scale-x-100",
              )}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <Button href="/login" variant="secondary" size="sm" className="hidden sm:inline-flex">
            <Lock aria-hidden />
            Área Restrita
          </Button>
          <button
            type="button"
            className="inline-flex size-10 items-center justify-center rounded-sm text-navy hover:bg-navy-50 lg:hidden"
            aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={isMenuOpen}
            aria-controls="menu-mobile"
            onClick={() => setIsMenuOpen((open) => !open)}
          >
            {isMenuOpen ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </button>
        </div>
      </div>

      {isMenuOpen && (
        <nav id="menu-mobile" aria-label="Principal" className="border-t border-line bg-white lg:hidden">
          <ul className="container-page flex flex-col py-3">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  aria-current={isActive(link.href) ? "page" : undefined}
                  onClick={() => setIsMenuOpen(false)}
                  className={cn(
                    "flex border-l-2 py-3 pl-4 text-base font-medium",
                    isActive(link.href) ? "border-gold text-navy" : "border-transparent text-muted",
                  )}
                >
                  {link.name}
                </Link>
              </li>
            ))}
            <li className="mt-3 border-t border-line pt-4 sm:hidden">
              <Button href="/login" variant="primary" className="w-full" onClick={() => setIsMenuOpen(false)}>
                <Lock aria-hidden />
                Área Restrita
              </Button>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
