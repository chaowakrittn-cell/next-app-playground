import { Boundary } from '#/ui/boundary';
import { connection } from 'next/server';
import { getCachedValue, getUncachedValue } from './data';

// Forced dynamic so the functions are actually called on each request — that's
// what lets you watch the log difference by reloading.
export const instant = false;

export default async function Page() {
  await connection();

  // Call each version three times in the same request.
  const [c1, c2, c3] = await Promise.all([
    getCachedValue(),
    getCachedValue(),
    getCachedValue(),
  ]);
  const [u1, u2, u3] = await Promise.all([
    getUncachedValue(),
    getUncachedValue(),
    getUncachedValue(),
  ]);

  // Cached calls return the same memoized reference; uncached return new ones.
  const cachedSameRef = c1 === c2 && c2 === c3;
  const uncachedSameRef = u1 === u2 && u2 === u3;

  return (
    <Boundary label="compare/page.tsx (dynamic)">
      <div className="flex flex-col gap-6">
        <p className="text-sm leading-7 text-gray-300">
          Both functions do the same work behind a 500ms delay and each logs
          when its body runs. This page calls each one{' '}
          <strong className="text-gray-100">three times</strong> — open your
          terminal and watch how many log lines appear.
        </p>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-lg border border-green-900/50 bg-green-950/20 p-5">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-green-400">
              getCachedValue() ×3 — &apos;use cache&apos;
            </span>
            <dl className="flex flex-col gap-2 text-xs">
              <div className="flex justify-between">
                <dt className="text-gray-500">Body executions</dt>
                <dd className="font-mono text-green-300">≤ 1</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Same result reference</dt>
                <dd className="font-mono text-green-300">
                  {String(cachedSameRef)}
                </dd>
              </div>
            </dl>
            <p className="text-xs text-gray-500">
              <code className="font-mono text-green-400">[cached]</code> logs
              once on the first cache miss, then never again.
            </p>
          </div>

          <div className="flex flex-col gap-3 rounded-lg border border-pink-900/50 bg-pink-950/20 p-5">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pink-400">
              getUncachedValue() ×3 — no cache
            </span>
            <dl className="flex flex-col gap-2 text-xs">
              <div className="flex justify-between">
                <dt className="text-gray-500">Body executions</dt>
                <dd className="font-mono text-pink-300">3</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Same result reference</dt>
                <dd className="font-mono text-pink-300">
                  {String(uncachedSameRef)}
                </dd>
              </div>
            </dl>
            <p className="text-xs text-gray-500">
              <code className="font-mono text-pink-400">[uncached]</code> logs
              three times — every call re-runs the body.
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-xs leading-6 text-gray-500">
            <span className="font-semibold text-gray-400">Watch the terminal &amp; reload:</span>{' '}
            the first load prints one{' '}
            <code className="font-mono text-green-400">[cached]</code> and three{' '}
            <code className="font-mono text-pink-400">[uncached]</code> lines.
            Reload again — you&apos;ll see three more{' '}
            <code className="font-mono text-pink-400">[uncached]</code> lines but{' '}
            <strong className="text-gray-300">no new</strong>{' '}
            <code className="font-mono text-green-400">[cached]</code> line,
            because the cached result is reused across requests.
          </p>
        </div>
      </div>
    </Boundary>
  );
}
