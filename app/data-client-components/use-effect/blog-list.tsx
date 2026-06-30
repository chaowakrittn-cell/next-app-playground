'use client';

import { useEffect, useState } from 'react';

type Post = { id: string; title: string };

// Classic client-side fetching: call an API endpoint after mount and manage
// loading / error state yourself. This runs in the browser — you'll see the
// /api/posts request in the Network tab.
export function BlogList() {
  const [posts, setPosts] = useState<Post[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;
    console.log('[blog-list] fetching /api/posts from the browser');

    fetch('/api/posts')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: { posts: Post[] }) => {
        if (active) setPosts(data.posts);
      })
      .catch((err) => {
        if (active) setError(String(err));
      });

    return () => {
      active = false;
    };
  }, []);

  if (error) {
    return <p className="text-sm text-red-400">Error: {error}</p>;
  }

  if (!posts) {
    return (
      <div className="flex items-center gap-2 text-sm text-gray-500">
        <span className="inline-block size-3 animate-spin rounded-full border border-gray-600 border-t-transparent" />
        Loading from /api/posts…
      </div>
    );
  }

  return (
    <ul className="flex flex-col gap-2">
      {posts.map((post) => (
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
