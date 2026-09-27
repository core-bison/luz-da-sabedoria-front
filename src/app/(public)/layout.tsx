import { Footer } from "@/components/ui/layout/footer";
import { Header } from "@/components/ui/layout/header";

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <a
        href="#conteudo"
        className="sr-only z-60 bg-navy px-4 py-2 text-white focus:not-sr-only focus:fixed focus:top-2 focus:left-2"
      >
        Pular para o conteúdo
      </a>
      <Header />
      <main id="conteudo" className="grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}
