'use client';

import useSWR from 'swr';

type Post = { id: string; title: string };

const fetcher = (url: string) => fetch(url).then((r) => r.json());

// useSWR handles loading, error, caching, and revalidation for you.
// The data is cached by key ('/api/posts'), so revisiting this tab shows the
// cached result instantly while SWR revalidates in the background.
export function SwrPosts() {
  const { data, error, isLoading, isValidating, mutate } = useSWR<{
    posts: Post[];
  }>('/api/posts', fetcher);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400">
          swr-posts.tsx (Client Environment)
        </span>
        <button
          onClick={() => mutate()}
          disabled={isValidating}
          className="rounded-md bg-blue-600 px-3 py-1 text-xs font-semibold text-white transition hover:bg-blue-500 disabled:opacity-50"
        >
          {isValidating ? 'Revalidating…' : 'Refresh'}
        </button>
      </div>

      {error ? (
        <p className="text-sm text-red-400">Error: {String(error)}</p>
      ) : isLoading ? (
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="inline-block size-3 animate-spin rounded-full border border-gray-600 border-t-transparent" />
          Loading from /api/posts…
        </div>
      ) : (
        <ul className="flex flex-col gap-2">
          {data?.posts.map((post) => (
            <li
              key={post.id}
              className="rounded-lg border border-gray-800 bg-gray-900/30 px-4 py-3 text-sm text-gray-300"
            >
              {post.title}
            </li>
          ))}
        </ul>
      )}

      <p className="text-xs text-gray-500">
        State from SWR — isLoading:{' '}
        <code className="font-mono text-gray-400">{String(isLoading)}</code>,
        isValidating:{' '}
        <code className="font-mono text-gray-400">{String(isValidating)}</code>.
      </p>
    </div>
  );
}
