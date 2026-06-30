import { Boundary } from '#/ui/boundary';
import Link from 'next/link';

export default function Page() {
  return (
    <Boundary label="page.tsx (Server Environment)">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="text-sm leading-7 text-gray-300">
            Prefer fetching on the server. But when data depends on user
            interaction, is real-time, or otherwise can&apos;t be known at
            render time, you fetch in a Client Component. There are two common
            approaches:
          </p>
          <ul className="flex flex-col gap-3 pl-4">
            <li className="flex flex-col gap-1">
              <span className="font-mono text-xs font-semibold text-violet-400">
                The use API
              </span>
              <span className="text-sm leading-6 text-gray-400">
                Start the fetch in a Server Component, pass the{' '}
                <strong className="text-gray-300">promise</strong> to a Client
                Component, and unwrap it with{' '}
                <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-300">
                  use()
                </code>{' '}
                inside a{' '}
                <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-300">
                  &lt;Suspense&gt;
                </code>{' '}
                boundary. The data streams from server to client.
              </span>
            </li>
            <li className="flex flex-col gap-1">
              <span className="font-mono text-xs font-semibold text-blue-400">
                useEffect (or SWR / React Query)
              </span>
              <span className="text-sm leading-6 text-gray-400">
                Fetch from an API endpoint in the browser after mount, managing
                loading and error state yourself. Community libraries add
                caching, revalidation, and more.
              </span>
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <Link
            href="/data-client-components/use-api"
            className="flex flex-col gap-1 rounded-lg border border-violet-900/50 bg-violet-950/20 p-4 transition hover:border-violet-700"
          >
            <span className="font-mono text-sm font-semibold text-violet-400">
              use API →
            </span>
            <span className="text-xs text-gray-500">
              Server starts the fetch; client unwraps the promise with use().
            </span>
          </Link>
          <Link
            href="/data-client-components/use-effect"
            className="flex flex-col gap-1 rounded-lg border border-blue-900/50 bg-blue-950/20 p-4 transition hover:border-blue-700"
          >
            <span className="font-mono text-sm font-semibold text-blue-400">
              useEffect →
            </span>
            <span className="text-xs text-gray-500">
              Classic browser fetch from /api/posts with a loading state.
            </span>
          </Link>
          <Link
            href="/data-client-components/use-swr"
            className="flex flex-col gap-1 rounded-lg border border-blue-900/50 bg-blue-950/20 p-4 transition hover:border-blue-700"
          >
            <span className="font-mono text-sm font-semibold text-blue-400">
              useSWR →
            </span>
            <span className="text-xs text-gray-500">
              Caching, revalidation, and loading/error state from a community
              library.
            </span>
          </Link>
        </div>
      </div>
    </Boundary>
  );
}
