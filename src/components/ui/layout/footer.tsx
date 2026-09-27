import Link from "next/link";
import { Brand } from "@/components/ui/brand";

const institutionalLinks = [
  { name: "Quem Somos", href: "/quem-somos" },
  { name: "O Rito Schröder", href: "/rito-schroder" },
  { name: "Fraternidade Feminina", href: "/fraternidade" },
  { name: "Notícias", href: "/noticias" },
  { name: "Contato", href: "/contato" },
];

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t-2 border-gold bg-navy text-white/70">
      <div className="container-page grid gap-12 py-16 md:grid-cols-12">
        <div className="md:col-span-5">
          <Brand tone="inverse" />
          <p className="mt-6 max-w-sm leading-relaxed">
            Uma Maçonaria tradicional, filosófica e simbólica, pautada na Liberdade, Igualdade e
            Fraternidade.
          </p>
        </div>

        <nav aria-label="Institucional" className="md:col-span-3">
          <h2 className="mb-4 text-sm font-semibold text-white">Institucional</h2>
          <ul className="space-y-2.5 text-sm">
            {institutionalLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition-colors hover:text-gold">
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-4">
          <h2 className="mb-4 text-sm font-semibold text-white">Endereço</h2>
          <address className="text-sm leading-relaxed not-italic">
            Rua Coronel Domingos, Nº 164 A — Centro
            <br />
            CEP 63250-000 · Milagres, Ceará
          </address>
          <p className="mt-6 text-sm">
            Sob os auspícios do <span className="text-white">GOCE</span>, federado à{" "}
            <span className="text-white">COMAB</span>.
          </p>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-white/50 md:flex-row md:justify-between">
          <p>© {currentYear} A∴R∴L∴S∴ Luz da Sabedoria de Milagres Nº 18</p>
          <p>A Loja não trata assuntos internos por meio público.</p>
        </div>
      </div>
    </footer>
  );
}
