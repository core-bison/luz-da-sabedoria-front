import type { Metadata } from "next";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/ui/layout/footer";
import { Header } from "@/components/ui/layout/header";

export const metadata: Metadata = { title: "Página não encontrada" };

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="grow border-b border-line bg-paper">
        <div className="container-page flex flex-col items-center py-24 text-center md:py-32">
          <Image src="/images/logos/brasao-l18.png" alt="" width={72} height={72} className="opacity-90" />
          <p className="mt-8 font-serif text-lg text-gold-deep lining-nums">Erro 404</p>
          <h1 className="mt-3 font-serif text-5xl font-semibold text-balance text-navy md:text-6xl">
            Página não encontrada
          </h1>
          <p className="mt-5 max-w-md text-lg leading-relaxed text-muted">
            O endereço pode ter mudado ou a página não existe mais.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Button href="/" size="lg">
              Voltar ao início
            </Button>
            <Button href="/noticias" variant="secondary" size="lg">
              Ver notícias
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
