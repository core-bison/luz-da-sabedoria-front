import type { IPost } from "../types";
import { PostCard } from "./post-card";

export function PostList({ posts }: { posts: IPost[] }) {
  return <section>{posts.map((post) => <PostCard key={post.id} post={post} />)}</section>;
}