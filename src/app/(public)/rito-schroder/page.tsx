import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "O Rito Schröder",
  description:
    "Origem, características e importância filosófica do Rito Schröder, praticado pela Luz da Sabedoria.",
};

const pilares = [
  {
    title: "Simplicidade ritualística",
    text: "Cerimônias sóbrias, objetivas e profundamente simbólicas.",
  },
  {
    title: "Tradição inglesa",
    text: "Fundamentado nos rituais praticados na Inglaterra no século XVIII.",
  },
  {
    title: "Valorização moral",
    text: "Ênfase no aperfeiçoamento interior e filosófico do maçom.",
  },
  {
    title: "Três graus",
    text: "Trabalho focado exclusivamente nos graus simbólicos: Aprendiz, Companheiro e Mestre.",
  },
];

export default function RitoSchroderPage() {
  return (
    <>
      <PageHero
        eyebrow="Tradição e simplicidade"
        title="O Rito Schröder"
        description="Uma abordagem maçônica que busca a pureza dos antigos rituais simbólicos."
      />

      {/* Origem */}
      <section className="container-page grid items-center gap-14 py-20 md:py-28 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <SectionHeader eyebrow="Origem" title="Da Alemanha para Milagres" />
          <p className="mt-8 font-serif text-2xl leading-snug text-pretty text-navy md:text-3xl">
            O Rito Schröder é um rito maçônico de origem alemã, estruturado no século XIX por Friedrich
            Ludwig Schröder, com o propósito de restaurar a simplicidade e a pureza dos antigos rituais
            simbólicos.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-muted">
            É sob a égide deste rito que a Luz da Sabedoria de Milagres Nº 18 conduz seus trabalhos
            desde a fundação, em 2024.
          </p>
        </Reveal>

        <Reveal className="lg:col-span-5">
          <figure>
            <div className="relative aspect-998/854">
              <Image
                src="/images/simbolos/tapete-altar.png"
                alt="Ilustração do tapete da Loja no Rito Schröder, com o altar, o Livro da Lei, velas e as ferramentas simbólicas"
                fill
                sizes="(min-width: 1024px) 38vw, 100vw"
                className="object-contain"
              />
            </div>
            <figcaption className="mt-4 flex items-center gap-3 text-sm text-muted">
              <span aria-hidden className="h-px w-6 bg-gold" />
              O tapete e o altar no Rito Schröder
            </figcaption>
          </figure>
        </Reveal>
      </section>

      {/* Importância filosófica — faixa de contraste */}
      <section className="bg-navy text-white/75">
        <Reveal className="container-page max-w-4xl py-20 text-center md:py-28">
          <SectionHeader tone="inverse" align="center" eyebrow="Essência" title="A importância filosófica" size="sm" />
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed">
            O Rito Schröder preserva a essência da Maçonaria simbólica, priorizando a ética, a disciplina e
            a formação do caráter.
          </p>
          <blockquote className="mx-auto mt-10 max-w-3xl font-serif text-3xl leading-snug text-white italic md:text-4xl">
            “Sua proposta é clara: formar homens melhores por meio da simplicidade, da tradição e da
            vivência consciente dos princípios maçônicos.”
          </blockquote>
          <div aria-hidden className="mx-auto mt-10 h-px w-16 bg-gold" />
          <Button href="/contato" variant="gold" className="mt-10">
            Entre em contato
          </Button>
        </Reveal>
      </section>
      {/* Características */}
      <section className="border-y border-line bg-paper">
        <div className="container-page py-20 md:py-28">
          <SectionHeader eyebrow="Fundamentos" title="Características do rito" />

          <ol className="mt-14 grid border-t border-line-strong md:grid-cols-2 lg:grid-cols-4">
            {pilares.map((pilar, index) => (
              <li
                key={pilar.title}
                className="border-b border-line-strong py-8 md:px-6 md:max-lg:odd:pl-0 lg:border-b-0 lg:border-l lg:first:border-l-0 lg:first:pl-0"
              >
                <Reveal>
                  <span className="font-serif text-lg text-gold-deep">{["I", "II", "III", "IV"][index]}</span>
                  <h3 className="mt-3 font-serif text-2xl font-semibold text-navy">{pilar.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{pilar.text}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

    </>
  );
}
