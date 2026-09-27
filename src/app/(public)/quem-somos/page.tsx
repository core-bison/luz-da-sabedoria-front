import type { Metadata } from "next";
import Image from "next/image";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Quem Somos",
  description:
    "Fundação, princípios e diretoria da A∴R∴L∴S∴ Luz da Sabedoria de Milagres Nº 18.",
};

const identificacao = [
  { label: "Nome", value: "A∴R∴L∴S∴ Luz da Sabedoria de Milagres Nº 18" },
  { label: "Fundação", value: "09 de março de 2024" },
  { label: "Oriente", value: "Milagres, Ceará" },
  { label: "Obediência", value: "GOCE, federado à COMAB" },
  { label: "Rito", value: "Schröder" },
];

const principios = [
  {
    title: "Missão",
    text: "Promover o aperfeiçoamento moral, intelectual e espiritual de seus membros, praticando a fraternidade, a ética e a solidariedade, contribuindo ativamente para o bem-estar da sociedade.",
  },
  {
    title: "Visão",
    text: "Ser referência de compromisso fraternal, responsabilidade social e excelência nos trabalhos maçônicos, fortalecendo as colunas da Ordem e servindo como exemplo de retidão e cidadania.",
  },
];

const valores = [
  "Liberdade com responsabilidade",
  "Igualdade entre os homens",
  "Fraternidade e respeito mútuo",
  "Ética e moralidade",
  "Justiça e solidariedade",
  "Compromisso com a verdade",
];

const obediencia = [
  {
    sigla: "GOCE",
    nome: "Grande Oriente do Ceará",
    papel: "Potência à qual a Loja está jurisdicionada, responsável pela regularidade dos trabalhos no Estado do Ceará.",
    logo: "/images/logos/goce.png",
  },
  {
    sigla: "COMAB",
    nome: "Confederação Maçônica do Brasil",
    papel: "Confederação que reúne os Grandes Orientes estaduais, entre eles o GOCE.",
    logo: "/images/logos/comab.png",
  },
];

const diretoria = [
  { role: "Venerável Mestre", name: "José Roberto dos Santos Ribeiro", photo: "veneravel-mestre" },
  { role: "1º Vigilante", name: "Cícero Ronaldo dos Santos Ribeiro", photo: "primeiro-vigilante" },
  { role: "2º Vigilante", name: "José Everaldo Bezerra da Silva", photo: "segundo-vigilante" },
  { role: "Secretário", name: "João Victor Rodrigues Moreira", photo: "secretario" },
  { role: "Tesoureiro", name: "Francisco Ricardo dos Santos Ribeiro", photo: "tesoureiro" },
];

export default function QuemSomosPage() {
  return (
    <>
      <PageHero
        eyebrow="História e propósito"
        title="Quem Somos"
        description="A fundação, os princípios e a liderança da A∴R∴L∴S∴ Luz da Sabedoria de Milagres Nº 18."
        media={
          <div className="relative mx-auto aspect-square max-w-sm overflow-hidden rounded-sm lg:max-w-none">
            <Image
              src="/images/logos/brasao-3d.jpg"
              alt="Brasão da Loja em relevo dourado sobre fundo azul"
              fill
              priority
              sizes="(min-width: 1024px) 40vw, 24rem"
              className="object-cover"
            />
          </div>
        }
      />

      {/* Identificação e história */}
      <section className="container-page grid gap-16 py-20 md:py-28 lg:grid-cols-12">
        <aside className="lg:col-span-4">
          <dl className="border-t-2 border-gold lg:sticky lg:top-28">
            {identificacao.map((item) => (
              <div key={item.label} className="border-b border-line py-4">
                <dt className="text-sm text-muted">{item.label}</dt>
                <dd className="mt-1 font-medium text-navy">{item.value}</dd>
              </div>
            ))}
          </dl>
        </aside>

        <Reveal className="space-y-6 text-lg leading-[1.8] lg:col-span-8">
          <h2 className="mb-8 font-serif text-4xl font-semibold text-navy">Nossa história</h2>
          <p>
            A A∴R∴L∴S∴ Luz da Sabedoria de Milagres Nº 18 é uma Augusta e Respeitável Loja Simbólica
            fundada em 09 de março de 2024, no Oriente de Milagres, Estado do Ceará, sob os auspícios
            do Grande Oriente do Ceará (GOCE), federado à Confederação Maçônica do Brasil (COMAB).
          </p>
          <p>
            Constituída sob a égide do Rito Schröder, a Loja nasceu com o propósito de cultivar uma
            Maçonaria tradicional, filosófica e simbólica, pautada nos princípios da Liberdade,
            Igualdade e Fraternidade, promovendo o aperfeiçoamento moral, intelectual e espiritual de
            seus Obreiros.
          </p>
          <p>
            Desde a sua fundação, a Luz da Sabedoria de Milagres Nº 18 tem como missão ser um farol de
            conhecimento e virtude no Vale de Milagres, fortalecendo os laços fraternais entre os seus
            membros e contribuindo ativamente para o desenvolvimento da sociedade, por meio da
            beneficência, do estudo maçônico e da vivência dos mais elevados valores éticos.
          </p>
          <p>
            Inspirada na força da tradição e na responsabilidade do presente, a Loja reafirma o seu
            compromisso com a regularidade, a disciplina ritualística do Rito Schröder e a construção
            de um legado sólido para as futuras gerações de maçons.
          </p>
        </Reveal>
      </section>

      {/* Princípios — faixa de contraste */}
      <section className="bg-navy text-white/75">
        <div className="container-page py-20 md:py-28">
          <SectionHeader tone="inverse" eyebrow="Diretrizes" title="Princípios norteadores" />

          <Reveal className="mt-14 grid gap-px bg-white/10 lg:grid-cols-3">
            {principios.map((item, index) => (
              <div key={item.title} className="bg-navy p-8">
                <span className="font-serif text-lg text-gold">{["I", "II"][index]}</span>
                <h3 className="mt-3 font-serif text-3xl font-semibold text-white">{item.title}</h3>
                <p className="mt-4 leading-relaxed">{item.text}</p>
              </div>
            ))}
            <div className="bg-navy p-8">
              <span className="font-serif text-lg text-gold">III</span>
              <h3 className="mt-3 font-serif text-3xl font-semibold text-white">Valores</h3>
              <ul className="mt-4 space-y-2">
                {valores.map((valor) => (
                  <li key={valor} className="flex items-baseline gap-3">
                    <span aria-hidden className="size-1.5 shrink-0 -translate-y-0.5 rotate-45 bg-gold" />
                    {valor}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Obediência */}
      <section className="border-b border-line bg-paper">
        <div className="container-page grid gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-16">
          <SectionHeader
            eyebrow="Regularidade"
            title="Obediência"
            description="A Loja trabalha sob os auspícios do Grande Oriente do Ceará, federado à Confederação Maçônica do Brasil."
            className="lg:col-span-5"
          />
          <ul className="grid gap-6 sm:grid-cols-2 lg:col-span-7">
            {obediencia.map((item) => (
              <li key={item.sigla}>
                <Reveal className="h-full border-t-2 border-gold bg-white p-8">
                  <Image src={item.logo} alt={`Brasão do ${item.nome}`} width={64} height={64} />
                  <p className="mt-6 text-sm font-semibold tracking-wider text-gold-deep">{item.sigla}</p>
                  <h3 className="mt-1 font-serif text-2xl font-semibold text-navy">{item.nome}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{item.papel}</p>
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Diretoria */}
      <section id="diretoria" className="container-page py-20 md:py-28">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <SectionHeader eyebrow="Liderança" title="Diretoria" description="Gestão 2026–2028 · Gestão Participativa e Fraterna" />
          <Image
            src="/images/logos/selo-gestao-2026-2028.png"
            alt="Selo da Gestão 2026/2028: Gestão Participativa e Fraterna"
            width={112}
            height={112}
            className="size-24 shrink-0 md:size-28"
          />
        </div>

        <ul className="mt-14 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-3 lg:grid-cols-5">
          {diretoria.map((membro, index) => (
            <li key={membro.role}>
              <Reveal>
                <div
                  className={cn(
                    "relative aspect-4/5 overflow-hidden rounded-sm bg-paper",
                    index === 0 && "ring-2 ring-gold ring-offset-4",
                  )}
                >
                  <Image
                    src={`/images/diretoria/${membro.photo}.jpg`}
                    alt={`${membro.role}, ${membro.name}`}
                    fill
                    sizes="(min-width: 1024px) 20vw, (min-width: 768px) 33vw, 50vw"
                    className="object-cover object-top"
                  />
                </div>
                <p className="mt-4 text-sm font-medium text-gold-deep">{membro.role}</p>
                <p className="mt-1 font-serif text-xl leading-tight font-semibold text-navy">{membro.name}</p>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
