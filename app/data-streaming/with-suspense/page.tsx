import { Boundary } from '#/ui/boundary';
import { connection } from 'next/server';
import { Suspense } from 'react';
import { getComments, getPosts } from '../posts';

export const instant = false;

async function BlogList() {
  const posts = await getPosts(1200);
  return (
    <ul className="flex flex-col gap-2">
      {posts.map((post) => (
        <li
          key={post.id}
          className="rounded-lg border border-gray-800 bg-gray-900/30 px-4 py-3"
        >
          <p className="text-sm font-semibold text-gray-200">{post.title}</p>
          <p className="text-xs text-gray-500">{post.excerpt}</p>
        </li>
      ))}
    </ul>
  );
}

async function Comments() {
  const comments = await getComments(2200);
  return (
    <ul className="flex flex-col gap-2">
      {comments.map((comment, i) => (
        <li
          key={i}
          className="rounded-lg border border-gray-800 bg-gray-900/30 px-4 py-2 text-sm text-gray-400"
        >
          {comment}
        </li>
      ))}
    </ul>
  );
}

function ListSkeleton({ rows }: { rows: number }) {
  return (
    <ul className="flex flex-col gap-2">
      {Array.from({ length: rows }).map((_, i) => (
        <li
          key={i}
          className="h-12 animate-pulse rounded-lg border border-gray-800 bg-gray-900/30"
        />
      ))}
    </ul>
  );
}

export default async function Page() {
  await connection();

  return (
    <Boundary label="with-suspense/page.tsx (Server Environment)" color="violet">
      <div className="flex flex-col gap-6">
        {/* Outside any boundary → sent to the client immediately. */}
        <header className="flex flex-col gap-1">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-violet-400">
            Welcome to the Blog
          </span>
          <p className="text-xs text-gray-500">
            This header rendered instantly. The two sections below each have
            their own <code className="font-mono text-violet-400">&lt;Suspense&gt;</code>{' '}
            boundary and stream in when their data resolves.
          </p>
        </header>

        <section className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Posts (~1.2s)
          </span>
          <Suspense fallback={<ListSkeleton rows={3} />}>
            <BlogList />
          </Suspense>
        </section>

        <section className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Comments (~2.2s)
          </span>
          <Suspense fallback={<ListSkeleton rows={3} />}>
            <Comments />
          </Suspense>
        </section>
      </div>
    </Boundary>
  );
}
