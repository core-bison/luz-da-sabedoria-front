import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";

export const metadata: Metadata = {
  title: "Fraternidade Feminina",
  description:
    "Fraternidade Feminina Luz da Sabedoria de Milagres: união, beneficência e ações sociais junto à Loja.",
};

const coordenacao = [
  { role: "Presidente", name: "A definir" },
  { role: "Vice-Presidente", name: "A definir" },
  { role: "Secretária", name: "A definir" },
  { role: "Tesoureira", name: "A definir" },
];

const galeria = [
  {
    src: "/images/eventos/dia-das-criancas-01.jpg",
    alt: "Crianças e Irmãos reunidos em salão decorado com balões",
  },
  {
    src: "/images/eventos/dia-das-criancas-02.jpg",
    alt: "Irmãos e cunhadas reunidos durante a ação de Dia das Crianças",
  },
  {
    src: "/images/eventos/aniversario-02.jpg",
    alt: "Irmãos em traje formal fazendo um brinde no jantar de aniversário da Loja, com as famílias à mesa",
  },
];

export default function FraternidadeFemininaPage() {
  return (
    <>
      {/* Abertura */}
      <section className="border-b border-line bg-paper">
        <div className="container-page grid items-center gap-12 py-16 md:py-24 lg:grid-cols-12">
          <div className="lg:col-span-6">
            <Image
              src="/images/fraternidade-feminina/logo-fraternidade-feminina.png"
              alt="Brasão da Fraternidade Feminina Luz da Sabedoria de Milagres"
              width={112}
              height={112}
              priority
              className="mb-8 size-24 md:size-28"
            />
            <SectionHeader
              as="h1"
              size="lg"
              eyebrow="Família e solidariedade"
              title="Fraternidade Feminina"
              description="Espaço dedicado à Fraternidade Feminina da Luz da Sabedoria de Milagres: sua identidade, história e as ações desenvolvidas em harmonia com os princípios de fraternidade, solidariedade e beneficência."
            />
          </div>
          <div className="relative aspect-4/3 overflow-hidden rounded-sm lg:col-span-6">
            <Image
              src="/images/fraternidade-feminina/foto-fraternidade.jpg"
              alt="Integrantes da Fraternidade Feminina reunidas diante do brasão da Fraternidade"
              fill
              priority
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </div>
      </section>

      {/* Essência */}
      <section className="container-page grid gap-16 py-20 md:py-28 lg:grid-cols-2">
        <div>
          <SectionHeader eyebrow="Propósito" title="Nossa essência" />
          <div className="mt-8 space-y-5 text-lg leading-relaxed">
            <p>
              A Fraternidade Feminina atua como um pilar fundamental de apoio, união e trabalho social
              junto à A∴R∴L∴S∴ Luz da Sabedoria de Milagres Nº 18.
            </p>
            <p>
              Nossas ações são guiadas pelos mais altos valores morais, com foco na promoção do
              bem-estar da comunidade, no fortalecimento dos laços familiares e no desenvolvimento de
              campanhas solidárias que impactam positivamente a sociedade do nosso Oriente.
            </p>
          </div>
        </div>

        <Reveal className="divide-y divide-line border-y border-line">
          <div className="py-8">
            <h3 className="font-serif text-2xl font-semibold text-navy">Missão, visão e valores</h3>
            <p className="mt-3 leading-relaxed text-muted">
              Promover a integração das famílias maçônicas e liderar iniciativas de caráter
              filantrópico e cultural, cultivando sempre a harmonia e a beneficência.
            </p>
          </div>
          <div className="py-8">
            <h3 className="font-serif text-2xl font-semibold text-navy">História e trajetória</h3>
            <p className="mt-3 leading-relaxed text-muted">
              Um percurso marcado pela dedicação das cunhadas na construção de uma sociedade mais justa
              e acolhedora, lado a lado com os Obreiros da Loja.
            </p>
          </div>
        </Reveal>
      </section>

      {/* Ações */}
      <section className="border-y border-line bg-paper">
        <div className="container-page py-20 md:py-28">
          <SectionHeader
            eyebrow="Trabalho prático"
            title="Ações e atividades"
            description="Conheça nossas iniciativas beneficentes e encontros fraternos."
          />
          <ul className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {galeria.map((foto) => (
              <li key={foto.src}>
                <Reveal className="relative aspect-4/3 overflow-hidden rounded-sm">
                  <Image
                    src={foto.src}
                    alt={foto.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover"
                  />
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Coordenação e contato */}
      <section className="container-page grid gap-16 py-20 md:py-28 lg:grid-cols-2">
        <div>
          <SectionHeader eyebrow="Liderança" title="Coordenação" />
          <dl className="mt-10 grid grid-cols-2 border-t-2 border-gold">
            {coordenacao.map((membro) => (
              <div key={membro.role} className="border-b border-line py-5 pr-4">
                <dt className="text-sm text-muted">{membro.role}</dt>
                <dd className="mt-1 font-serif text-xl font-semibold text-navy">{membro.name}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="flex flex-col justify-center bg-navy p-10 text-white/75 md:p-12">
          <h2 className="font-serif text-3xl font-semibold text-white">Deseja apoiar nossas causas?</h2>
          <p className="mt-4 leading-relaxed">
            A Fraternidade Feminina está aberta ao diálogo para parcerias em ações sociais e campanhas
            solidárias. Fale com a gente pelo canal institucional.
          </p>
          <Button href="/contato" variant="gold" className="mt-8 self-start">
            Contato institucional
          </Button>
        </div>
      </section>
    </>
  );
}
