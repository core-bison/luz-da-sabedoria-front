import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { PostList } from "@/features/posts/components/post-list";
import { ShareButtons } from "@/features/posts/components/share-buttons";
import { getPostBySlug, getPublishedPosts } from "@/features/posts/data/mock-posts";
import { formatDate } from "@/lib/format";

type Props = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return getPublishedPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = getPostBySlug((await params).slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: { images: [post.cover.src] },
  };
}

export default async function PostPage({ params }: Props) {
  const post = getPostBySlug((await params).slug);
  if (!post) notFound();

  const related = getPublishedPosts()
    .filter((item) => item.id !== post.id)
    .slice(0, 3);

  return (
    <article className="pb-24">
      <header className="border-b border-line bg-paper">
        <div className="container-page max-w-4xl py-14 md:py-20">
          <Link
            href="/noticias"
            className="inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-navy"
          >
            <ArrowLeft aria-hidden className="size-4" />
            Todas as notícias
          </Link>

          <p className="mt-10 flex items-center gap-3 text-sm text-muted">
            <span className="font-medium text-gold-deep">{post.category}</span>
            <span aria-hidden className="h-3 w-px bg-line-strong" />
            {post.publishedAt && <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>}
          </p>

          <h1 className="mt-4 font-serif text-4xl leading-[1.08] font-semibold text-balance text-navy md:text-6xl">
            {post.title}
          </h1>

          <p className="mt-6 text-sm text-muted">
            Publicado por <span className="font-medium text-navy">{post.author}</span>
          </p>
        </div>
      </header>

      <div className="container-page mt-12 max-w-5xl">
        <div className="relative aspect-video overflow-hidden rounded-sm bg-paper">
          <Image
            src={post.cover.src}
            alt={post.cover.alt}
            fill
            priority
            style={{ objectPosition: post.cover.position }}
            sizes="(min-width: 1024px) 64rem, 100vw"
            className="object-cover"
          />
        </div>
      </div>

      <div className="container-page mt-14 max-w-3xl">
        {/* O conteúdo precisa ser sanitizado no backend antes de chegar aqui. */}
        <div className="prose-article" dangerouslySetInnerHTML={{ __html: post.content }} />

        <footer className="mt-16 flex flex-col gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-medium text-navy">Compartilhar publicação</p>
          <ShareButtons title={post.title} />
        </footer>
      </div>

      {related.length > 0 && (
        <aside aria-labelledby="leia-tambem" className="container-page mt-24 border-t border-line pt-16">
          <h2 id="leia-tambem" className="mb-10 font-serif text-3xl font-semibold text-navy">
            Leia também
          </h2>
          <PostList posts={related} />
        </aside>
      )}
    </article>
  );
}
