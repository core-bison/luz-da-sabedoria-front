import type { IPost } from "../types";
import { PostCard } from "./post-card";

export function PostList({ posts }: { posts: IPost[] }) {
  return (
    <div className="grid gap-x-8 gap-y-14 md:grid-cols-2 lg:grid-cols-3">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
