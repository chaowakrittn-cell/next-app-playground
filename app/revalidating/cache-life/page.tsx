import { Boundary } from '#/ui/boundary';
import { cacheLife } from 'next/cache';

const PROFILES: [string, string, string, string][] = [
  ['default', '5m', '15m', 'never'],
  ['seconds', '30s', '1s', '60s'],
  ['minutes', '5m', '1m', '1h'],
  ['hours', '5m', '1h', '1d'],
  ['days', '5m', '1d', '1w'],
  ['weeks', '5m', '1w', '30d'],
  ['max', '5m', '30d', '1y'],
];

// Cached with a time-based lifetime. The timestamp is frozen; after the
// `revalidate` window passes, the next request serves this stale value while a
// fresh one is generated in the background (stale-while-revalidate).
async function CachedTime() {
  'use cache';
  cacheLife('minutes');
  return (
    <span className="font-mono text-sm text-blue-300">
      {new Date().toISOString()}
    </span>
  );
}

export default function Page() {
  return (
    <Boundary label="cache-life/page.tsx (Server Environment)">
      <div className="flex flex-col gap-6">
        <p className="text-sm leading-7 text-gray-300">
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            cacheLife
          </code>{' '}
          controls how long cached data stays valid. Call it inside a{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            &apos;use cache&apos;
          </code>{' '}
          scope with a profile name or a custom object.
        </p>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-xs leading-6 text-gray-400">
{`export async function getProducts() {
  'use cache'
  cacheLife('hours')     // profile
  return db.query(/* … */)
}`}
          </pre>
          <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-xs leading-6 text-gray-400">
{`'use cache'
cacheLife({
  stale: 3600,      // 1h until stale
  revalidate: 7200, // 2h until refreshed
  expire: 86400,    // 1d until expired
})`}
          </pre>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Built-in profiles
          </span>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400">
                  <th className="py-2 pr-4 font-semibold">Profile</th>
                  <th className="py-2 pr-4 font-semibold">stale</th>
                  <th className="py-2 pr-4 font-semibold">revalidate</th>
                  <th className="py-2 font-semibold">expire</th>
                </tr>
              </thead>
              <tbody className="font-mono text-gray-400">
                {PROFILES.map(([name, stale, revalidate, expire]) => (
                  <tr key={name} className="border-b border-gray-800/60">
                    <td className="py-1.5 pr-4 text-blue-400">{name}</td>
                    <td className="py-1.5 pr-4">{stale}</td>
                    <td className="py-1.5 pr-4">{revalidate}</td>
                    <td className="py-1.5">{expire}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="text-xs text-gray-500">
            <span className="font-mono text-gray-400">stale</span>: how long
            clients reuse without checking ·{' '}
            <span className="font-mono text-gray-400">revalidate</span>: when a
            background refresh kicks in ·{' '}
            <span className="font-mono text-gray-400">expire</span>: hard limit
            after which requests block for fresh data.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Timeline × process × layer — cacheLife(&apos;hours&apos;)
          </span>
          <p className="text-xs text-gray-500">
            Say a value is cached at <span className="font-mono text-gray-400">12:00</span>{' '}
            with <span className="font-mono text-gray-400">stale 5m</span>,{' '}
            <span className="font-mono text-gray-400">revalidate 1h</span>,{' '}
            <span className="font-mono text-gray-400">expire 1d</span>. Here is how
            it ages — and note that <strong className="text-gray-300">stale</strong>{' '}
            is a <em>client</em> concern while{' '}
            <strong className="text-gray-300">revalidate</strong> and{' '}
            <strong className="text-gray-300">expire</strong> are the{' '}
            <em>server</em>&apos;s.
          </p>

          <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-[11px] leading-5 text-gray-400">
{`12:00        12:05                 13:00                 next-day 12:00
  |------------|---------------------|----------------------|-----------▶
  |  FRESH     |  ask server again   |  serve stale +       |  too old:
  |  (client   |  each visit; age<1h |  refresh in the      |  block &
  |   reuses)  |  → server returns   |  background (SWR)     |  regenerate
  |            |  cached, no refresh |                      |
  stale(5m)    revalidate not hit    revalidate(1h) hit     expire(1d) hit`}
          </pre>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400">
                  <th className="py-2 pr-4 font-semibold">Phase</th>
                  <th className="py-2 pr-4 font-semibold">Time</th>
                  <th className="py-2 pr-4 font-semibold">What happens (process)</th>
                  <th className="py-2 font-semibold">Layer</th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                <tr className="border-b border-gray-800/60">
                  <td className="py-2 pr-4 font-mono text-blue-400">stale</td>
                  <td className="py-2 pr-4 font-mono">12:00–12:05</td>
                  <td className="py-2 pr-4">
                    Browser reuses its own copy — no request to the server at all.
                  </td>
                  <td className="py-2 font-semibold text-blue-400">Client</td>
                </tr>
                <tr className="border-b border-gray-800/60">
                  <td className="py-2 pr-4 font-mono text-gray-300">re-check</td>
                  <td className="py-2 pr-4 font-mono">after 12:05</td>
                  <td className="py-2 pr-4">
                    Next visit asks the server. Age &lt; 1h, so the server returns
                    the cached value with no refresh; the client re-caches for 5m.
                  </td>
                  <td className="py-2 font-semibold text-gray-300">
                    Client → Server
                  </td>
                </tr>
                <tr className="border-b border-gray-800/60">
                  <td className="py-2 pr-4 font-mono text-orange-400">revalidate</td>
                  <td className="py-2 pr-4 font-mono">after 13:00</td>
                  <td className="py-2 pr-4">
                    Next request gets the stale value{' '}
                    <strong className="text-gray-300">instantly</strong>, and the
                    server refreshes in the background for the next visitor.
                  </td>
                  <td className="py-2 font-semibold text-orange-400">
                    Server (SWR)
                  </td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 font-mono text-red-400">expire</td>
                  <td className="py-2 pr-4 font-mono">after 12:00 +1d</td>
                  <td className="py-2 pr-4">
                    If it was never refreshed, it&apos;s too old to serve — the
                    request <strong className="text-gray-300">blocks</strong> and
                    regenerates fresh before responding.
                  </td>
                  <td className="py-2 font-semibold text-red-400">
                    Server (blocking)
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-xs text-gray-500">
            The background refresh only runs <em>when a request arrives</em>. If a
            page goes cold with no visitors, nothing refreshes on its own — which
            is exactly the case <span className="font-mono text-red-400">expire</span>{' '}
            exists to catch.
          </p>
        </div>

        <div className="flex flex-col gap-2 rounded-lg border border-blue-900/50 bg-blue-950/20 p-5">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400">
            Live — cacheLife(&apos;minutes&apos;)
          </span>
          <CachedTime />
          <span className="text-xs text-gray-500">
            Frozen within the revalidate window. After it passes, the next
            request refreshes this in the background.
          </span>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-xs leading-6 text-gray-500">
            <span className="font-semibold text-gray-400">Good to know:</span>{' '}
            short-lived caches (the{' '}
            <code className="font-mono text-gray-400">seconds</code> profile,{' '}
            <code className="font-mono text-gray-400">revalidate: 0</code>, or an{' '}
            <code className="font-mono text-gray-400">expire</code> under 5
            minutes) are excluded from the static shell and become dynamic holes
            instead.
          </p>
        </div>
      </div>
    </Boundary>
  );
}
