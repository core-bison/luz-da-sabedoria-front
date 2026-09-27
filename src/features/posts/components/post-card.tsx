import type { IPost } from "../types";

export function PostCard({ post }: { post: IPost }) {
  return <article><h2>{post.title}</h2></article>;
}