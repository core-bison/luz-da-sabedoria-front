import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { SectionHeader } from "@/components/ui/section-header";
import { PostList } from "@/features/posts/components/post-list";
import { getPublishedPosts } from "@/features/posts/data/mock-posts";

const credenciais = [
  { label: "Fundação", value: "09 · 03 · 2024" },
  { label: "Rito", value: "Schröder" },
  { label: "Obediência", value: "Grande Oriente do Ceará", logo: "/images/logos/goce.png" },
  { label: "Federação", value: "Confederação Maçônica do Brasil", logo: "/images/logos/comab.png" },
];

const pilares = [
  { title: "Simplicidade ritualística", text: "Cerimônias sóbrias, objetivas e profundamente simbólicas." },
  { title: "Tradição inglesa", text: "Fundamentado nos rituais praticados na Inglaterra no século XVIII." },
  { title: "Valorização moral", text: "Ênfase no aperfeiçoamento interior e filosófico do maçom." },
  { title: "Três graus", text: "Trabalho nos graus simbólicos: Aprendiz, Companheiro e Mestre." },
];

const galeria = [
  {
    src: "/images/eventos/aniversario-01.jpg",
    alt: "Bolo de aniversário decorado com o brasão da Loja",
    className: "row-span-2",
  },
  {
    src: "/images/eventos/aniversario-02.jpg",
    alt: "Irmãos em traje formal fazendo um brinde no jantar de aniversário da Loja",
    className: "col-span-2",
  },
  {
    src: "/images/eventos/dia-das-criancas-02.jpg",
    alt: "Irmãos e cunhadas reunidos durante a ação de Dia das Crianças",
  },
  {
    src: "/images/eventos/confraternizacao-01.jpg",
    alt: "Irmãos com camisas da Loja reunidos durante a confraternização",
  },
];

export default function HomePage() {
  const recentPosts = getPublishedPosts().slice(0, 3);

  return (
    <>
      {/* 1. Abertura */}
      <section className="overflow-hidden border-b border-line">
        <div className="container-page grid items-center gap-14 py-14 md:py-20 lg:grid-cols-12 lg:gap-16 lg:py-24">
          <div className="animate-rise lg:col-span-5">
            <Image src="/images/logos/brasao-l18.png" alt="" width={64} height={64} priority />

            <h1 className="mt-8 font-serif text-navy">
              <span className="block font-sans text-sm font-semibold tracking-[0.2em] text-gold-deep">
                A∴R∴L∴S∴
              </span>
              <span className="mt-3 block text-6xl leading-[0.95] font-semibold md:text-7xl">
                Luz da Sabedoria
              </span>
              <span className="mt-2 block text-3xl text-navy/75 italic md:text-4xl">de Milagres Nº 18</span>
            </h1>

            <p className="mt-8 max-w-md text-lg leading-relaxed text-pretty text-muted">
              Uma Maçonaria tradicional, filosófica e simbólica, pautada na Liberdade, Igualdade e
              Fraternidade, no Oriente de Milagres, Ceará.
            </p>

            <p className="mt-8 border-l-2 border-gold pl-5 font-serif text-xl leading-snug text-navy italic md:text-2xl">
              Luz que ilumina. Sabedoria que edifica. Fraternidade que une.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button href="/quem-somos" size="lg">
                Conheça nossa história
              </Button>
              <Button href="/contato" variant="secondary" size="lg">
                Entre em contato
              </Button>
            </div>
          </div>

          <figure className="animate-rise [animation-delay:150ms] lg:col-span-7">
            {/* Recorte 3:2 ancorado no topo: elimina o monograma do piso do salão */}
            <div className="relative aspect-3/2 overflow-hidden rounded-sm border-t-2 border-gold bg-paper">
              <Image
                src="/images/eventos/aniversario-da-loja.jpg"
                alt="Obreiros da Loja reunidos em traje formal para a foto oficial de aniversário"
                fill
                priority
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover object-top"
              />
            </div>
            <figcaption className="mt-4 flex items-center gap-3 text-sm text-muted">
              <span aria-hidden className="h-px w-6 bg-gold" />
              Obreiros da Loja na sessão comemorativa de aniversário
            </figcaption>
          </figure>
        </div>
      </section>

      {/* 2. Credenciais */}
      <section aria-label="Credenciais da Loja" className="border-b border-line bg-paper">
        <ul className="container-page grid grid-cols-2 lg:grid-cols-4">
          {credenciais.map((item) => (
            <li
              key={item.label}
              className="border-line py-8 odd:pr-4 even:border-l even:pl-6 max-lg:nth-[-n+2]:border-b lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0"
            >
              <Reveal className="flex items-center gap-4">
                {item.logo && (
                  <Image src={item.logo} alt="" width={48} height={48} className="size-11 shrink-0 md:size-12" />
                )}
                <div>
                  <p className="text-xs font-semibold tracking-wider text-muted uppercase">{item.label}</p>
                  <p className="mt-1 font-serif text-xl leading-tight font-semibold text-navy lining-nums">{item.value}</p>
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* 3. Palavra do Venerável */}
      <section className="bg-navy text-white/75">
        <div className="container-page grid items-center gap-12 py-20 md:py-28 lg:grid-cols-12 lg:gap-16">
          <Reveal className="mx-auto w-full max-w-xs lg:col-span-4 lg:max-w-none">
            <div className="relative aspect-4/5 overflow-hidden rounded-sm ring-1 ring-gold ring-offset-8 ring-offset-navy">
              <Image
                src="/images/diretoria/veneravel-mestre.jpg"
                alt="Venerável Mestre, José Roberto dos Santos Ribeiro"
                fill
                sizes="(min-width: 1024px) 30vw, 20rem"
                className="object-cover object-top"
              />
            </div>
          </Reveal>

          <Reveal className="lg:col-span-8">
            <figure>
              <p className="inline-flex items-center gap-3 text-xs font-semibold tracking-[0.16em] text-gold uppercase">
                <span aria-hidden className="h-px w-8 bg-gold" />
                Palavra do Venerável Mestre
              </p>
              <blockquote className="mt-8 font-serif text-3xl leading-snug text-pretty text-white md:text-4xl">
                “Seja muito bem-vindo ao espaço oficial da Augusta e Respeitável Loja Simbólica Luz da
                Sabedoria de Milagres Nº 18. Nossa Loja é um ambiente de estudo, reflexão e trabalho, onde
                homens comprometidos com elevados princípios se reúnem.”
              </blockquote>
              <figcaption className="mt-10 flex flex-col gap-6 border-t border-white/15 pt-6 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="font-serif text-2xl font-semibold text-white">José Roberto dos Santos Ribeiro</p>
                  <p className="mt-1 text-sm">Venerável Mestre · Gestão 2026–2028</p>
                </div>
                <Link
                  href="/quem-somos#diretoria"
                  className="inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold-light"
                >
                  Conheça a diretoria
                  <ArrowRight aria-hidden className="size-4" />
                </Link>
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      {/* 4. O Rito */}
      <section className="container-page grid items-center gap-14 py-20 md:py-28 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <div className="relative aspect-3/2 overflow-hidden rounded-sm">
            <Image
              src="/images/simbolos/estandarte-pavilhao-nacional.jpg"
              alt="Estandarte da Loja ao lado das bandeiras do Brasil e do Ceará"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
        </Reveal>

        <Reveal className="lg:col-span-6">
          <SectionHeader
            eyebrow="Nosso rito"
            title="Rito Schröder"
            description="De origem alemã, estruturado no século XIX por Friedrich Ludwig Schröder para restaurar a simplicidade e a pureza dos antigos rituais simbólicos."
          />
          <ol className="mt-10 grid gap-x-8 gap-y-6 border-t border-line pt-8 sm:grid-cols-2">
            {pilares.map((pilar, index) => (
              <li key={pilar.title}>
                <p className="flex items-baseline gap-3">
                  <span className="font-serif text-gold-deep">{["I", "II", "III", "IV"][index]}</span>
                  <span className="font-serif text-xl font-semibold text-navy">{pilar.title}</span>
                </p>
                <p className="mt-1 text-sm leading-relaxed text-muted">{pilar.text}</p>
              </li>
            ))}
          </ol>
          <Button href="/rito-schroder" variant="secondary" className="mt-10">
            Conheça o rito
          </Button>
        </Reveal>
      </section>

      {/* 5. Notícias recentes */}
      {recentPosts.length > 0 && (
        <section className="border-y border-line bg-paper">
          <div className="container-page py-20 md:py-28">
            <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
              <SectionHeader eyebrow="Atualizações" title="Notícias recentes" />
              <Link
                href="/noticias"
                className="inline-flex shrink-0 items-center gap-2 text-sm font-medium text-navy hover:text-gold-deep"
              >
                Todas as notícias
                <ArrowRight aria-hidden className="size-4" />
              </Link>
            </div>
            <Reveal>
              <PostList posts={recentPosts} />
            </Reveal>
          </div>
        </section>
      )}

      {/* 6. Galeria */}
      <section className="container-page py-20 md:py-28">
        <SectionHeader
          eyebrow="Memória"
          title="Momentos da Loja"
          description="Sessões, celebrações e ações sociais que marcam a nossa caminhada."
        />
        <ul className="mt-14 grid grid-flow-dense auto-rows-[11rem] grid-cols-2 gap-3 md:auto-rows-[16rem] md:grid-cols-3 md:gap-4">
          {galeria.map((foto) => (
            <li key={foto.src} className={foto.className}>
              <Reveal className="relative size-full overflow-hidden rounded-sm bg-paper">
                <Image
                  src={foto.src}
                  alt={foto.alt}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-700 ease-out hover:scale-[1.03]"
                />
              </Reveal>
            </li>
          ))}
        </ul>
      </section>

      {/* 7. Fraternidade Feminina */}
      <section className="border-t border-line bg-paper">
        <div className="container-page grid items-center gap-14 py-20 md:py-28 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:order-2 lg:col-span-7">
            <div className="relative aspect-4/3 overflow-hidden rounded-sm">
              <Image
                src="/images/fraternidade-feminina/foto-fraternidade.jpg"
                alt="Integrantes da Fraternidade Feminina reunidas diante do brasão da Fraternidade"
                fill
                sizes="(min-width: 1024px) 58vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
          <Reveal className="lg:order-1 lg:col-span-5">
            <Image
              src="/images/fraternidade-feminina/logo-fraternidade-feminina.png"
              alt=""
              width={64}
              height={64}
              className="mb-8"
            />
            <SectionHeader
              eyebrow="Família e solidariedade"
              title="Fraternidade Feminina"
              description="Pilar de apoio, união e trabalho social junto à Loja, com campanhas solidárias que fortalecem as famílias e a comunidade de Milagres."
            />
            <Button href="/fraternidade" variant="secondary" className="mt-10">
              Conheça a Fraternidade
            </Button>
          </Reveal>
        </div>
      </section>
    </>
  );
}
