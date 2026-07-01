import { Boundary } from '#/ui/boundary';
import { connection } from 'next/server';
import { bumpOnly, bumpWithRevalidateTag, bumpWithUpdateTag } from './actions';
import { getActualCount, getTaggedCount } from './data';

export const instant = false;

export default async function Page() {
  await connection();

  const actual = getActualCount();
  const cached = await getTaggedCount();
  const isStale = actual !== cached.count;

  return (
    <Boundary label="tags/page.tsx (Server Environment)">
      <div className="flex flex-col gap-6">
        <p className="text-sm leading-7 text-gray-300">
          Tag a cached function with{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            cacheTag(&apos;reval-count&apos;)
          </code>
          , then invalidate it on demand. The cached count below only changes
          when the tag is revalidated — mutating the data alone leaves it stale.
        </p>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            The code
          </span>

          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs text-gray-500">
              1. Tag the cached read
            </span>
            <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-xs leading-6 text-gray-400">
{`// data.ts
import { cacheTag, cacheLife } from 'next/cache';

export async function getCount() {
  'use cache';
  `}<span className="text-blue-400">{`cacheTag('reval-count')`}</span>{`;
  cacheLife('max');
  return db.count();
}`}
            </pre>
          </div>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs text-blue-400">
                2a. revalidateTag — stale-while-revalidate
              </span>
              <pre className="overflow-x-auto rounded-lg border border-blue-900/50 bg-blue-950/10 p-4 font-mono text-xs leading-6 text-gray-400">
{`'use server';
import { revalidateTag } from 'next/cache';

export async function bump() {
  await db.increment();
  `}<span className="text-blue-400">{`revalidateTag('reval-count', 'max')`}</span>{`;
}`}
              </pre>
              <span className="text-xs text-gray-500">
                Serves stale, refreshes in the background. Works in Server
                Actions <em>and</em> Route Handlers.
              </span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs text-violet-400">
                2b. updateTag — read-your-own-writes
              </span>
              <pre className="overflow-x-auto rounded-lg border border-violet-900/50 bg-violet-950/10 p-4 font-mono text-xs leading-6 text-gray-400">
{`'use server';
import { updateTag } from 'next/cache';

export async function bump() {
  await db.increment();
  `}<span className="text-violet-400">{`updateTag('reval-count')`}</span>{`;
}`}
              </pre>
              <span className="text-xs text-gray-500">
                Immediately expires the tag so the user sees their change now.
                Server Actions only.
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="flex flex-col gap-2 rounded-lg border border-gray-700 bg-gray-900/50 p-5">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-gray-400">
              Actual value (uncached)
            </span>
            <span className="font-mono text-3xl tabular-nums text-gray-200">
              {actual}
            </span>
          </div>
          <div
            className={`flex flex-col gap-2 rounded-lg border p-5 ${
              isStale
                ? 'border-amber-800/60 bg-amber-950/20'
                : 'border-blue-900/50 bg-blue-950/20'
            }`}
          >
            <span
              className={`font-mono text-xs font-semibold uppercase tracking-wider ${
                isStale ? 'text-amber-400' : 'text-blue-400'
              }`}
            >
              Cached value (tag: reval-count)
            </span>
            <span
              className={`font-mono text-3xl tabular-nums ${
                isStale ? 'text-amber-300' : 'text-blue-300'
              }`}
            >
              {cached.count}
            </span>
            <span className="font-mono text-xs text-gray-500">
              cached at {cached.at}
            </span>
          </div>
        </div>

        {isStale && (
          <div className="rounded-lg border border-amber-800/60 bg-amber-950/20 px-4 py-3">
            <p className="text-sm text-amber-300">
              ⚠ Stale — the data is at <strong>{actual}</strong> but the tagged
              cache still shows <strong>{cached.count}</strong>. Revalidate the
              tag to sync.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <form action={bumpOnly} className="flex flex-col gap-2">
            <button
              type="submit"
              className="rounded-md bg-gray-700 px-4 py-2 text-sm font-semibold text-gray-100 transition hover:bg-gray-600"
            >
              Bump only
            </button>
            <span className="text-xs text-gray-500">
              Mutates, no invalidation → cache goes stale.
            </span>
          </form>

          <form action={bumpWithRevalidateTag} className="flex flex-col gap-2">
            <button
              type="submit"
              className="rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Bump + revalidateTag
            </button>
            <span className="text-xs text-gray-500">
              Stale-while-revalidate. Refreshes the tag.
            </span>
          </form>

          <form action={bumpWithUpdateTag} className="flex flex-col gap-2">
            <button
              type="submit"
              className="rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-500"
            >
              Bump + updateTag
            </button>
            <span className="text-xs text-gray-500">
              Immediately expires. Read-your-own-writes.
            </span>
          </form>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-xs leading-6 text-gray-500">
            <span className="font-semibold text-gray-400">Try it:</span> click{' '}
            <em>Bump only</em> — the actual value rises but the cached value
            stays put (stale). Then <em>revalidateTag</em> or{' '}
            <em>updateTag</em> resyncs it. Both refresh the tag;{' '}
            <code className="font-mono text-violet-400">updateTag</code> expires
            it immediately (best for showing a user their own change), while{' '}
            <code className="font-mono text-blue-400">revalidateTag</code> uses
            stale-while-revalidate (best for background refreshes).
          </p>
        </div>
      </div>
    </Boundary>
  );
}
