'use cache';

import { Boundary } from '#/ui/boundary';

// 'use cache' tells Next.js to prerender and cache this page at build time,
// including the new Date() call — so the timestamp is frozen at build time.
export default async function Page() {
  const renderedAt = new Date().toISOString();
  console.log('[prerendered] rendered at:', renderedAt);

  return (
    <Boundary label="prerendered/page.tsx" color="blue">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400">
            Prerendering
          </span>
          <p className="text-sm leading-6 text-gray-400">
            This page uses no dynamic APIs (no{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-300">
              cookies()
            </code>
            ,{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-300">
              headers()
            </code>
            , or{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-300">
              connection()
            </code>
            ), so Next.js renders it at{' '}
            <strong className="text-gray-300">build time</strong> and serves
            the cached result instantly.
          </p>
        </div>

        <div className="flex flex-col gap-2 rounded-lg border border-blue-900/50 bg-blue-950/20 p-4">
          <span className="text-xs text-gray-500">Rendered at</span>
          <span className="font-mono text-sm text-blue-300">{renderedAt}</span>
          <span className="text-xs text-gray-600">
            Navigate away and come back — this timestamp will not change because
            the page is served from cache.
          </span>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <p className="font-mono text-xs text-gray-500">
            <span className="text-gray-400">Check your terminal</span> — you
            will see{' '}
            <code className="text-blue-400">[prerendered] rendered at: …</code>{' '}
            logged <strong className="text-gray-300">once</strong> during{' '}
            <code className="text-gray-300">next build</code>. Navigating to
            this page at runtime logs nothing — the server code never runs
            again.
          </p>
        </div>
      </div>
    </Boundary>
  );
}
