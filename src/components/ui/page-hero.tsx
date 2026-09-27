import { SectionHeader } from "@/components/ui/section-header";
import { cn } from "@/lib/utils";

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  /** Imagem ou composição exibida ao lado do título em telas grandes */
  media?: React.ReactNode;
  children?: React.ReactNode;
}

/** Abertura padrão das páginas internas do portal público. Renderiza o h1 da página. */
export function PageHero({ eyebrow, title, description, media, children }: PageHeroProps) {
  return (
    <section className="border-b border-line bg-paper">
      <div
        className={cn(
          "container-page py-16 md:py-24",
          media && "grid items-center gap-12 lg:grid-cols-12 lg:gap-16",
        )}
      >
        <div className={cn("animate-rise", media && "lg:col-span-7")}>
          <SectionHeader as="h1" size="lg" eyebrow={eyebrow} title={title} description={description} />
          {children}
        </div>
        {media && <div className="animate-rise [animation-delay:150ms] lg:col-span-5">{media}</div>}
      </div>
    </section>
  );
}
