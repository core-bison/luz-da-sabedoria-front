import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/format";
import type { IPost } from "../types";

/** Publicação em destaque: imagem grande à esquerda, texto à direita. */
export function PostFeatured({ post }: { post: IPost }) {
  return (
    <article className="group relative grid items-center gap-8 lg:grid-cols-12 lg:gap-14">
      <div className="relative aspect-3/2 overflow-hidden rounded-sm bg-paper lg:col-span-7">
        <Image
          src={post.cover.src}
          alt={post.cover.alt}
          fill
          style={{ objectPosition: post.cover.position }}
          priority
          sizes="(min-width: 1024px) 58vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className="lg:col-span-5">
        <p className="flex items-center gap-3 text-sm text-muted">
          <span className="font-medium text-gold-deep">{post.category}</span>
          <span aria-hidden className="h-3 w-px bg-line-strong" />
          {post.publishedAt && <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>}
        </p>
        <h2 className="mt-4 font-serif text-4xl leading-[1.1] font-semibold text-balance text-navy md:text-5xl">
          <Link href={`/noticias/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h2>
        <p className="mt-5 text-lg leading-relaxed text-muted">{post.excerpt}</p>
        <span className="mt-8 inline-flex items-center gap-2 font-medium text-navy">
          Ler publicação
          <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
