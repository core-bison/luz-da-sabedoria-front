import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { formatDate } from "@/lib/format";
import type { IPost } from "../types";

export function PostCard({ post }: { post: IPost }) {
  return (
    <article className="group relative flex flex-col">
      <div className="relative aspect-4/3 overflow-hidden rounded-sm bg-paper">
        <Image
          src={post.cover.src}
          alt={post.cover.alt}
          fill
          style={{ objectPosition: post.cover.position }}
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
        />
      </div>

      <div className="flex grow flex-col pt-5">
        <p className="flex items-center gap-3 text-sm text-muted">
          <span className="font-medium text-gold-deep">{post.category}</span>
          <span aria-hidden className="h-3 w-px bg-line-strong" />
          {post.publishedAt && <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>}
        </p>

        <h3 className="mt-3 font-serif text-2xl leading-snug font-semibold text-navy text-balance">
          <Link href={`/noticias/${post.slug}`} className="after:absolute after:inset-0">
            {post.title}
          </Link>
        </h3>

        <p className="mt-3 line-clamp-3 leading-relaxed text-muted">{post.excerpt}</p>

        <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-navy">
          Ler publicação
          <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </article>
  );
}
