import type { Metadata } from "next";
import { PageHero } from "@/components/ui/page-hero";
import { Reveal } from "@/components/ui/reveal";
import { PostFeatured } from "@/features/posts/components/post-featured";
import { PostList } from "@/features/posts/components/post-list";
import { getPublishedPosts } from "@/features/posts/data/mock-posts";

export const metadata: Metadata = {
  title: "Notícias e Eventos",
  description: "Atividades, sessões e ações sociais da Loja e da Fraternidade Feminina.",
};

export default function NoticiasPage() {
  const [featured, ...others] = getPublishedPosts();

  return (
    <>
      <PageHero
        eyebrow="Atualizações e memória"
        title="Notícias e Eventos"
        description="Acompanhe as atividades, sessões e ações sociais da nossa Loja e da Fraternidade Feminina."
      />

      <section className="container-page py-20 md:py-28">
        {featured ? (
          <>
            <PostFeatured post={featured} />
            {others.length > 0 && (
              <Reveal className="mt-20 border-t border-line pt-16">
                <h2 className="mb-10 font-serif text-3xl font-semibold text-navy">Mais publicações</h2>
                <PostList posts={others} />
              </Reveal>
            )}
          </>
        ) : (
          <p className="text-center text-lg text-muted">Nenhuma publicação por enquanto.</p>
        )}
      </section>
    </>
  );
}
