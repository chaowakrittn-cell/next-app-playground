import { Boundary } from '#/ui/boundary';
import { connection } from 'next/server';
import { bumpWithRevalidate, bumpWithoutRevalidate } from './actions';
import { getActualCount, getCachedCount } from './data';

export const instant = false;

export default async function Page() {
  await connection();

  const actual = getActualCount();
  const cached = await getCachedCount();
  const isStale = actual !== cached.count;

  return (
    <Boundary label="revalidate/page.tsx (Server Environment)">
      <div className="flex flex-col gap-6">
        <p className="text-sm leading-7 text-gray-300">
          After a mutation, cached data won&apos;t update on its own. Calling{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            revalidatePath
          </code>{' '}
          inside the Server Function busts the cache so the UI shows the new
          value. Below, the count is read two ways: the{' '}
          <strong className="text-gray-100">actual</strong> value straight from
          the store, and a{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            &apos;use cache&apos;
          </code>{' '}
          value shown to the UI.
        </p>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="flex flex-col gap-2 rounded-lg border border-gray-700 bg-gray-900/50 p-5">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-gray-400">
              Actual value (uncached)
            </span>
            <span className="font-mono text-3xl tabular-nums text-gray-200">
              {actual}
            </span>
            <span className="text-xs text-gray-500">
              Read fresh from the store on every request.
            </span>
          </div>

          <div
            className={`flex flex-col gap-2 rounded-lg border p-5 ${
              isStale
                ? 'border-amber-800/60 bg-amber-950/20'
                : 'border-green-900/50 bg-green-950/20'
            }`}
          >
            <span
              className={`font-mono text-xs font-semibold uppercase tracking-wider ${
                isStale ? 'text-amber-400' : 'text-green-400'
              }`}
            >
              Cached value (use cache)
            </span>
            <span
              className={`font-mono text-3xl tabular-nums ${
                isStale ? 'text-amber-300' : 'text-green-300'
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
              ⚠ The UI is stale — the store is at{' '}
              <strong>{actual}</strong> but the cache still shows{' '}
              <strong>{cached.count}</strong>. Bump{' '}
              <em>with revalidatePath</em> to sync them.
            </p>
          </div>
        )}

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <form action={bumpWithoutRevalidate} className="flex flex-col gap-2">
            <button
              type="submit"
              className="rounded-md bg-gray-700 px-4 py-2 text-sm font-semibold text-gray-100 transition hover:bg-gray-600"
            >
              Bump WITHOUT revalidate
            </button>
            <span className="text-xs text-gray-500">
              Mutates the store, but the cached value stays put — the UI goes
              stale.
            </span>
          </form>

          <form action={bumpWithRevalidate} className="flex flex-col gap-2">
            <button
              type="submit"
              className="rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-500"
            >
              Bump WITH revalidatePath
            </button>
            <span className="text-xs text-gray-500">
              Mutates the store and busts the cache — the cached value
              recomputes and the timestamp updates.
            </span>
          </form>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-xs leading-6 text-gray-500">
            <span className="font-semibold text-gray-400">Try it:</span> click{' '}
            <em>without revalidate</em> a few times — the actual value climbs
            but the cached value (and its timestamp) freeze. Then click{' '}
            <em>with revalidatePath</em> and they snap back in sync. For
            tag-based invalidation, use{' '}
            <code className="font-mono text-gray-400">revalidateTag</code>{' '}
            instead.
          </p>
        </div>
      </div>
    </Boundary>
  );
}
