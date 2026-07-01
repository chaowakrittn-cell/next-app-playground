import { Boundary } from '#/ui/boundary';
import { type Metadata } from 'next';
import { cacheLife } from 'next/cache';
import { connection } from 'next/server';
import { Suspense } from 'react';

export const metadata: Metadata = {
  title: 'Non-deterministic Values',
  openGraph: {
    title: 'Non-deterministic Values',
    images: ['/api/og?title=Non-deterministic Values'],
  },
};

// STRATEGY 1 — defer to request time: call connection() before the
// non-deterministic operation, and wrap in <Suspense>. Unique per request.
async function UniquePerRequest() {
  await connection();
  const uuid = crypto.randomUUID();
  return (
    <span className="font-mono text-sm break-all text-orange-300">{uuid}</span>
  );
}

// STRATEGY 2 — cache the value: with 'use cache', the random value is computed
// once and reused for everyone until revalidation.
async function CachedValue() {
  'use cache';
  cacheLife('hours');
  const uuid = crypto.randomUUID();
  return (
    <span className="font-mono text-sm break-all text-blue-300">{uuid}</span>
  );
}

export default function Page() {
  return (
    <Boundary label="page.tsx (Server Environment)">
      <div className="flex flex-col gap-6">
        <p className="text-sm leading-7 text-gray-300">
          Operations like{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            Math.random()
          </code>
          ,{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            Date.now()
          </code>
          , and{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            crypto.randomUUID()
          </code>{' '}
          produce different values each run, so Cache Components makes you choose
          how to handle them.
        </p>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-lg border border-orange-900/50 bg-orange-950/20 p-5">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-orange-400">
              Defer to request time
            </span>
            <pre className="overflow-x-auto rounded bg-gray-950/60 p-3 font-mono text-[11px] leading-5 text-gray-400">
{`await connection()
const uuid = crypto.randomUUID()`}
            </pre>
            <Suspense
              fallback={
                <span className="font-mono text-sm text-gray-600">
                  streaming…
                </span>
              }
            >
              <UniquePerRequest />
            </Suspense>
            <span className="text-xs text-gray-500">
              Unique every request. Reload: it changes.
            </span>
          </div>

          <div className="flex flex-col gap-3 rounded-lg border border-blue-900/50 bg-blue-950/20 p-5">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400">
              Cache the value
            </span>
            <pre className="overflow-x-auto rounded bg-gray-950/60 p-3 font-mono text-[11px] leading-5 text-gray-400">
{`'use cache'
const uuid = crypto.randomUUID()`}
            </pre>
            <CachedValue />
            <span className="text-xs text-gray-500">
              Same for everyone until revalidation. Reload: it stays.
            </span>
          </div>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-xs leading-6 text-gray-500">
            Without one of these, Cache Components raises a build error — it
            won&apos;t silently bake a random value into the static shell or
            leak one that should be per-request.
          </p>
        </div>
      </div>
    </Boundary>
  );
}
