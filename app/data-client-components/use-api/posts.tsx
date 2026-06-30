'use client';

import { use } from 'react';

export type Post = { id: string; title: string };

// Receives an UNRESOLVED promise from the Server Component and unwraps it with
// use(). While the promise is pending, the nearest <Suspense> fallback shows.
export function Posts({ posts }: { posts: Promise<Post[]> }) {
  const allPosts = use(posts);

  return (
    <ul className="flex flex-col gap-2">
      {allPosts.map((post) => (
        <li
          key={post.id}
          className="rounded-lg border border-gray-800 bg-gray-900/30 px-4 py-3 text-sm text-gray-300"
        >
          {post.title}
        </li>
      ))}
    </ul>
  );
}
