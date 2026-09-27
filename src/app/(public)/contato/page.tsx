import type { Metadata } from "next";
import { MapPin, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { ContactForm } from "@/features/contato/components/contact-form";

export const metadata: Metadata = {
  title: "Contato",
  description: "Canais oficiais de comunicação da A∴R∴L∴S∴ Luz da Sabedoria de Milagres Nº 18.",
};

const ENDERECO = "Rua Coronel Domingos, 164 A, Centro, Milagres - CE, 63250-000";
const MAPS_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(ENDERECO)}&output=embed`;
const MAPS_LINK = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(ENDERECO)}`;

export default function ContatoPage() {
  return (
    <>
      <PageHero
        eyebrow="Fale conosco"
        title="Contato institucional"
        description="Canais oficiais de comunicação da A∴R∴L∴S∴ Luz da Sabedoria de Milagres Nº 18."
      />

      <section className="container-page grid gap-16 py-20 md:py-28 lg:grid-cols-12">
        <aside className="space-y-10 lg:col-span-4">
          <dl className="border-t-2 border-gold">
            <div className="border-b border-line py-5">
              <dt className="text-sm text-muted">Endereço</dt>
              <dd className="mt-1 leading-relaxed text-navy">
                Rua Coronel Domingos, Nº 164 A — Centro
                <br />
                CEP 63250-000 · Milagres, Ceará
              </dd>
            </div>
            <div className="border-b border-line py-5">
              <dt className="text-sm text-muted">Obediência</dt>
              <dd className="mt-1 text-navy">GOCE, federado à COMAB</dd>
            </div>
            <div className="border-b border-line py-5">
              <dt className="text-sm text-muted">Fraternidade Feminina</dt>
              <dd className="mt-1 leading-relaxed text-navy">
                Para ações sociais e campanhas solidárias, use o formulário e identifique o assunto.
              </dd>
            </div>
          </dl>

          <div className="flex gap-4 bg-navy-50 p-6">
            <ShieldAlert aria-hidden className="size-5 shrink-0 text-navy" />
            <div>
              <h2 className="text-sm font-semibold text-navy">Aviso de discrição</h2>
              <p className="mt-1 text-sm leading-relaxed">
                A Loja não trata assuntos internos por meio público. Pedimos que a comunicação seja
                estritamente institucional.
              </p>
            </div>
          </div>
        </aside>

        <Reveal className="lg:col-span-8">
          <h2 className="mb-8 font-serif text-3xl font-semibold text-navy">Envie sua mensagem</h2>
          <ContactForm />
        </Reveal>
      </section>

      {/* Como chegar */}
      <section className="border-t border-line bg-paper">
        <div className="container-page grid items-center gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-4">
            <SectionHeader eyebrow="Localização" title="Como chegar" />
            <p className="mt-6 flex gap-3 text-lg leading-relaxed text-navy">
              <MapPin aria-hidden className="mt-1.5 size-5 shrink-0 text-gold-deep" />
              <span>
                Rua Coronel Domingos, Nº 164 A — Centro
                <br />
                Milagres, Ceará · 63250-000
              </span>
            </p>
            <Button href={MAPS_LINK} target="_blank" rel="noopener noreferrer" variant="secondary" className="mt-8">
              Abrir no Google Maps
            </Button>
          </div>
          <Reveal className="lg:col-span-8">
            <div className="relative aspect-4/3 overflow-hidden rounded-sm border-t-2 border-gold bg-white md:aspect-video">
              <iframe
                src={MAPS_EMBED}
                title="Mapa com a localização da Loja em Milagres, Ceará"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 size-full border-0"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
