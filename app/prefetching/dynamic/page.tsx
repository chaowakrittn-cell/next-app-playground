import { Boundary } from '#/ui/boundary';
import { connection } from 'next/server';

export const instant = false;

// Dynamic page — prefetching is skipped. Every navigation waits for the server.
export default async function Page() {
  await connection();
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const renderedAt = new Date().toISOString();

  return (
    <Boundary label="dynamic/page.tsx" color="pink">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pink-400">
            Dynamic Route — prefetch skipped
          </span>
          <p className="text-sm leading-6 text-gray-400">
            This page uses{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-300">
              connection()
            </code>{' '}
            so Next.js skips prefetching entirely. You felt the ~1s server wait
            when you clicked — there was nothing pre-loaded.
          </p>
        </div>

        <div className="flex flex-col gap-2 rounded-lg border border-pink-900/50 bg-pink-950/20 p-4">
          <span className="text-xs text-gray-500">Rendered at (request time)</span>
          <span className="font-mono text-sm text-pink-300">{renderedAt}</span>
          <span className="text-xs text-gray-600">
            This timestamp is fresh every visit — the page is re-rendered on
            every request with no caching.
          </span>
        </div>
      </div>
    </Boundary>
  );
}
