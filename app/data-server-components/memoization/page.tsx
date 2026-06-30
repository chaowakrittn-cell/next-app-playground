import { Boundary } from '#/ui/boundary';
import { connection } from 'next/server';
import { getUserCached, getUserUncached } from './data';

export const instant = false;

export default async function Page() {
  await connection();

  // Call each version three times in the same request.
  const [c1, c2, c3] = await Promise.all([
    getUserCached(),
    getUserCached(),
    getUserCached(),
  ]);
  const [u1, u2, u3] = await Promise.all([
    getUserUncached(),
    getUserUncached(),
    getUserUncached(),
  ]);

  // Memoization returns the SAME object reference; uncached returns new ones.
  const cachedSameRef = c1 === c2 && c2 === c3;
  const uncachedSameRef = u1 === u2 && u2 === u3;

  return (
    <Boundary label="memoization/page.tsx (Server Environment)">
      <div className="flex flex-col gap-6">
        <p className="text-sm leading-7 text-gray-300">
          Wrapping a fetch in{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            React.cache
          </code>{' '}
          memoizes it for the current request. You can call it from anywhere in
          the tree without prop-drilling, and the work runs only once.
          (Identical native <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">fetch</code>{' '}
          requests are deduped automatically.)
        </p>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-lg border border-green-900/50 bg-green-950/20 p-5">
            <span className="font-mono text-xs font-semibold text-green-400">
              getUserCached() ×3
            </span>
            <dl className="flex flex-col gap-2 text-xs">
              <div className="flex justify-between">
                <dt className="text-gray-500">Body executions</dt>
                <dd className="font-mono text-green-300">1</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gray-500">Same result reference</dt>
                <dd className="font-mono text-green-300">
                  {String(cachedSameRef)}
                </dd>
              </div>
            </dl>
            <p className="text-xs text-gray-500">
              One <code className="font-mono text-green-400">[cached]</code> log
              in the terminal despite three calls.
            </p>
          </div>

          <div className="flex flex-col gap-3 rounded-lg border border-pink-900/50 bg-pink-950/20 p-5">
            <span className="font-mono text-xs font-semibold text-pink-400">
              getUserUncached() ×3
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
              Three <code className="font-mono text-pink-400">[uncached]</code>{' '}
              logs in the terminal — the work repeats every call.
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-xs leading-6 text-gray-500">
            <span className="font-semibold text-gray-400">Watch the terminal:</span>{' '}
            reload this page and compare the count of{' '}
            <code className="font-mono text-green-400">[cached]</code> vs{' '}
            <code className="font-mono text-pink-400">[uncached]</code> logs.
            React.cache is scoped to a single request — each request gets a
            fresh memoization scope.
          </p>
        </div>
      </div>
    </Boundary>
  );
}
