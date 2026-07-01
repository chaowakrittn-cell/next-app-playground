import { Boundary } from '#/ui/boundary';
import db from '#/lib/db';
import { type Metadata } from 'next';
import { cacheLife, cacheTag } from 'next/cache';
import { connection } from 'next/server';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Partial Prerendering',
  openGraph: {
    title: 'Partial Prerendering',
    images: ['/api/og?title=Partial Prerendering'],
  },
};

// CACHED: part of the static shell. Frozen until revalidated (tagged 'catalog').
async function CachedCatalog() {
  'use cache';
  cacheLife('hours');
  cacheTag('catalog');

  const products = db.product.findMany({ limit: 3 });
  const cachedAt = new Date().toISOString();

  return (
    <div className="flex flex-col gap-2">
      <ul className="flex flex-col gap-1">
        {products.map((p) => (
          <li key={p.id} className="flex justify-between text-sm text-gray-300">
            <span>{p.name}</span>
            <span className="font-mono text-gray-500">
              ${p.price.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
      <span className="font-mono text-xs text-blue-300">
        cached at {cachedAt}
      </span>
    </div>
  );
}

// STREAMED: deferred to request time via connection(). Streams in after the
// shell. Must be wrapped in <Suspense>.
async function LivePanel() {
  await connection();
  await new Promise((r) => setTimeout(r, 800));
  const now = new Date().toISOString();

  return (
    <span className="font-mono text-sm text-orange-300">
      requested at {now}
    </span>
  );
}

export default function Page() {
  return (
    <Boundary label="page.tsx (Server Environment)">
      <div className="flex flex-col gap-6">
        <p className="text-sm leading-7 text-gray-300">
          With Cache Components, a single page combines three kinds of content
          into one <strong className="text-gray-100">static shell</strong> —
          this is Partial Prerendering (PPR). Static and cached content ship
          instantly; only the streamed part waits for the request.
        </p>

        {/* STATIC — plain markup, prerendered automatically */}
        <div className="flex flex-col gap-2 rounded-lg border border-gray-700 bg-gray-900/50 p-5">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-gray-400">
            1. Static (in the shell)
          </span>
          <p className="text-sm text-gray-300">
            This header is plain markup — no data, no directives. It&apos;s
            prerendered into the HTML automatically.
          </p>
        </div>

        {/* CACHED — in the shell, frozen until revalidated */}
        <div className="flex flex-col gap-2 rounded-lg border border-blue-900/50 bg-blue-950/20 p-5">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400">
            2. Cached (in the shell)
          </span>
          <CachedCatalog />
        </div>

        {/* STREAMED — fallback in the shell, content streams at request time */}
        <div className="flex flex-col gap-2 rounded-lg border border-orange-900/50 bg-orange-950/20 p-5">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-orange-400">
            3. Streamed (fills in at request time)
          </span>
          <Suspense
            fallback={
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span className="inline-block size-3 animate-spin rounded-full border border-gray-600 border-t-transparent" />
                streaming…
              </div>
            }
          >
            <LivePanel />
          </Suspense>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-xs leading-6 text-gray-500">
            <span className="font-semibold text-gray-400">How it renders:</span>{' '}
            the static header, the cached catalog, and the streamed panel&apos;s
            fallback are all in the shell that arrives instantly. The orange
            panel then streams in (~800ms). In the build output this route shows{' '}
            <code className="font-mono text-gray-400">◐</code> (Partial
            Prerender). Reload: the cached timestamp stays; the streamed one
            updates.
          </p>
        </div>
      </div>
    </Boundary>
  );
}
