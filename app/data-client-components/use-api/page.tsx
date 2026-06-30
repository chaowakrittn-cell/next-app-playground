import { Boundary } from '#/ui/boundary';
import { connection } from 'next/server';
import { Suspense } from 'react';
import { Posts, type Post } from './posts';

export const instant = false;

// Runs on the server. Returns a promise — we deliberately do NOT await it here.
async function getPosts(): Promise<Post[]> {
  await new Promise((r) => setTimeout(r, 1500));
  return [
    { id: '1', title: 'Streaming a promise to the client' },
    { id: '2', title: 'Unwrapping it with use()' },
    { id: '3', title: 'Suspense shows the fallback meanwhile' },
  ];
}

export default async function Page() {
  await connection();

  // Don't await — hand the pending promise to the Client Component.
  const postsPromise = getPosts();

  return (
    <Boundary label="use-api/page.tsx (Server Environment)">
      <div className="flex flex-col gap-6">
        <p className="text-sm leading-7 text-gray-300">
          The server starts the fetch and passes the{' '}
          <strong className="text-gray-100">pending promise</strong> to a Client
          Component. React streams the result over; the Client Component reads
          it with{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            use()
          </code>
          . The{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            &lt;Suspense&gt;
          </code>{' '}
          fallback shows for ~1.5s until it resolves.
        </p>

        <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-xs leading-6 text-gray-400">
{`// page.tsx (server)
const posts = getPosts()   // no await
<Suspense fallback={…}>
  <Posts posts={posts} />  // pass the promise
</Suspense>

// posts.tsx (client)
const allPosts = use(posts)  // unwrap`}
        </pre>

        <Boundary
          label="posts.tsx (Client Environment)"
          color="violet"
          animateRerendering={false}
        >
          <Suspense
            fallback={
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="inline-block size-3 animate-spin rounded-full border border-gray-600 border-t-transparent" />
                Loading posts…
              </div>
            }
          >
            <Posts posts={postsPromise} />
          </Suspense>
        </Boundary>
      </div>
    </Boundary>
  );
}
