import { Boundary } from '#/ui/boundary';
import { cacheLife } from 'next/cache';
import { connection } from 'next/server';
import { Suspense } from 'react';

// A CACHED COMPONENT: only this component's output is cached. Its timestamp is
// frozen and reused across requests.
async function CachedPanel() {
  'use cache';
  cacheLife('hours');
  await new Promise((r) => setTimeout(r, 800));
  const at = new Date().toISOString();

  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400">
        &lt;CachedPanel&gt; — &apos;use cache&apos;
      </span>
      <span className="font-mono text-sm text-blue-300">{at}</span>
      <span className="text-xs text-gray-500">
        Frozen — served from cache on every request.
      </span>
    </div>
  );
}

// A DYNAMIC COMPONENT on the SAME page: deferred to request time, so it
// re-renders (fresh timestamp) on every request. Wrapped in <Suspense>.
async function DynamicPanel() {
  await connection();
  await new Promise((r) => setTimeout(r, 800));
  const at = new Date().toISOString();

  return (
    <div className="flex flex-col gap-2">
      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-orange-400">
        &lt;DynamicPanel&gt; — no cache
      </span>
      <span className="font-mono text-sm text-orange-300">{at}</span>
      <span className="text-xs text-gray-500">
        Fresh — re-rendered on every request.
      </span>
    </div>
  );
}

export default function Page() {
  return (
    <Boundary label="vs-route/page.tsx (statically inferred)">
      <div className="flex flex-col gap-6">
        <p className="text-sm leading-7 text-gray-300">
          The difference is <strong className="text-gray-100">granularity</strong>.
          A cached <em>route</em> puts{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            &apos;use cache&apos;
          </code>{' '}
          at the top of{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            page.tsx
          </code>{' '}
          / <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">layout.tsx</code>,
          caching the <strong className="text-gray-100">whole segment</strong>.
          A cached <em>component</em> caches just that one function — so the same
          page can hold cached and dynamic parts together.
        </p>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="rounded-lg border border-blue-900/50 bg-blue-950/20 p-5">
            {/* This component is cached */}
            <CachedPanel />
          </div>
          <div className="rounded-lg border border-orange-900/50 bg-orange-950/20 p-5">
            {/* This component is dynamic — on the SAME, uncached page */}
            <Suspense
              fallback={
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="inline-block size-3 animate-spin rounded-full border border-gray-600 border-t-transparent" />
                  streaming…
                </div>
              }
            >
              <DynamicPanel />
            </Suspense>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400">
                <th className="py-2 pr-4 font-semibold"> </th>
                <th className="py-2 pr-4 font-semibold text-blue-400">
                  Cached route
                </th>
                <th className="py-2 font-semibold text-gray-200">
                  Cached component
                </th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              <tr className="border-b border-gray-800/60">
                <td className="py-2 pr-4 text-gray-500">Where the directive goes</td>
                <td className="py-2 pr-4 font-mono">top of page/layout</td>
                <td className="py-2 font-mono">top of a component fn</td>
              </tr>
              <tr className="border-b border-gray-800/60">
                <td className="py-2 pr-4 text-gray-500">What gets cached</td>
                <td className="py-2 pr-4">the whole route segment</td>
                <td className="py-2">just that component&apos;s output</td>
              </tr>
              <tr className="border-b border-gray-800/60">
                <td className="py-2 pr-4 text-gray-500">Dynamic parts alongside</td>
                <td className="py-2 pr-4">no — all frozen together</td>
                <td className="py-2 text-gray-200">yes — mix cached + fresh</td>
              </tr>
              <tr>
                <td className="py-2 pr-4 text-gray-500">Best for</td>
                <td className="py-2 pr-4">fully static pages</td>
                <td className="py-2">pages with a slow but cacheable piece</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-xs leading-6 text-gray-500">
            <span className="font-semibold text-gray-400">Reload the page:</span>{' '}
            the blue (cached component) timestamp stays put while the orange
            (dynamic) one changes — both on this single, uncached page. That mix
            is impossible with a cached <em>route</em>, where{' '}
            <code className="font-mono text-gray-400">&apos;use cache&apos;</code>{' '}
            on the page would freeze the orange panel too.
          </p>
        </div>
      </div>
    </Boundary>
  );
}
