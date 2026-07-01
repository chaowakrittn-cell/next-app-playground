import { Boundary } from '#/ui/boundary';
import Link from 'next/link';

export default function Page() {
  return (
    <Boundary label="page.tsx (Server Environment)">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="text-sm leading-7 text-gray-300">
            Revalidation is the process of updating cached data — you keep
            serving fast cached responses while making sure content stays fresh.
            There are two strategies:
          </p>
          <ul className="flex flex-col gap-3 pl-4">
            <li className="flex flex-col gap-1">
              <span className="font-mono text-xs font-semibold text-blue-400">
                Time-based
              </span>
              <span className="text-sm leading-6 text-gray-400">
                Automatically refresh after a duration with{' '}
                <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-300">
                  cacheLife
                </code>
                .
              </span>
            </li>
            <li className="flex flex-col gap-1">
              <span className="font-mono text-xs font-semibold text-violet-400">
                On-demand
              </span>
              <span className="text-sm leading-6 text-gray-400">
                Manually invalidate after a mutation with{' '}
                <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-300">
                  revalidateTag
                </code>
                ,{' '}
                <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-300">
                  updateTag
                </code>
                , or{' '}
                <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-300">
                  revalidatePath
                </code>
                .
              </span>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            updateTag vs revalidateTag
          </span>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400">
                  <th className="py-2 pr-4 font-semibold"> </th>
                  <th className="py-2 pr-4 font-semibold text-violet-400">
                    updateTag
                  </th>
                  <th className="py-2 font-semibold text-blue-400">
                    revalidateTag
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-400">
                <tr className="border-b border-gray-800/60">
                  <td className="py-2 pr-4 text-gray-500">Where</td>
                  <td className="py-2 pr-4">Server Actions only</td>
                  <td className="py-2">Server Actions &amp; Route Handlers</td>
                </tr>
                <tr className="border-b border-gray-800/60">
                  <td className="py-2 pr-4 text-gray-500">Behavior</td>
                  <td className="py-2 pr-4 text-gray-200">
                    immediately expires
                  </td>
                  <td className="py-2">stale-while-revalidate</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 text-gray-500">Use case</td>
                  <td className="py-2 pr-4">
                    read-your-own-writes (see your change now)
                  </td>
                  <td className="py-2">background refresh (slight delay OK)</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Explore
          </span>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            <Link
              href="/revalidating/cache-life"
              className="flex flex-col gap-1 rounded-lg border border-blue-900/50 bg-blue-950/20 p-4 transition hover:border-blue-700"
            >
              <span className="font-mono text-sm font-semibold text-blue-400">
                cacheLife →
              </span>
              <span className="text-xs text-gray-500">
                Time-based revalidation with profiles and custom durations.
              </span>
            </Link>
            <Link
              href="/revalidating/tags"
              className="flex flex-col gap-1 rounded-lg border border-violet-900/50 bg-violet-950/20 p-4 transition hover:border-violet-700"
            >
              <span className="font-mono text-sm font-semibold text-violet-400">
                Tags →
              </span>
              <span className="text-xs text-gray-500">
                On-demand invalidation with cacheTag + revalidateTag/updateTag.
              </span>
            </Link>
          </div>
        </div>
      </div>
    </Boundary>
  );
}
