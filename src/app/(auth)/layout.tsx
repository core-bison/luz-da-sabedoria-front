import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-paper px-5 py-12">
      <Link href="/" className="flex flex-col items-center text-center">
        <Image src="/images/logos/brasao-l18.png" alt="" width={72} height={72} priority />
        <span className="mt-4 font-serif text-2xl font-semibold text-navy">Luz da Sabedoria</span>
        <span className="mt-1 text-sm text-muted">Área restrita aos Obreiros da Loja</span>
      </Link>

      <main className="mt-10 w-full max-w-md">
        <div className="animate-rise rounded-sm border border-line border-t-gold border-t-2 bg-white p-8 md:p-10">
          {children}
        </div>
      </main>

      <Link
        href="/"
        className="mt-10 inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-navy"
      >
        <ArrowLeft aria-hidden className="size-4" />
        Voltar ao portal
      </Link>
    </div>
  );
}
