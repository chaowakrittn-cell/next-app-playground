import { Boundary } from '#/ui/boundary';
import Link from 'next/link';

export default function Page() {
  return (
    <Boundary label="page.tsx">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="text-sm leading-7 text-gray-300">
            Prefetching is the process of loading a route in the background
            before the user navigates to it. This makes navigation between
            routes in your application feel instant, because by the time a user
            clicks on a link, the data to render the next route is already
            available client side.
          </p>

          <p className="text-sm leading-7 text-gray-300">
            Next.js automatically prefetches routes linked with the{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
              &lt;Link&gt;
            </code>{' '}
            component when they enter the user&apos;s viewport.
          </p>

          <p className="text-sm leading-7 text-gray-300">
            How much of the route is prefetched depends on whether it&apos;s
            static or dynamic:
          </p>

          <ul className="flex flex-col gap-3 pl-4">
            <li className="flex flex-col gap-1">
              <span className="font-mono text-xs font-semibold text-blue-400">
                Static Route
              </span>
              <span className="text-sm leading-6 text-gray-400">
                The full route is prefetched.
              </span>
            </li>
            <li className="flex flex-col gap-1">
              <span className="font-mono text-xs font-semibold text-pink-400">
                Dynamic Route
              </span>
              <span className="text-sm leading-6 text-gray-400">
                Prefetching is skipped, or the route is partially prefetched if{' '}
                <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-300">
                  loading.tsx
                </code>{' '}
                is present.
              </span>
            </li>
          </ul>

          <p className="text-sm leading-7 text-gray-300">
            By skipping or partially prefetching dynamic routes, Next.js avoids
            unnecessary work on the server for routes the users may never visit.
            However, waiting for a server response before navigation can give
            the users the impression that the app is not responding.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Showcases
          </p>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Link
              href="/prefetching/link-vs-anchor"
              className="flex flex-col gap-2 rounded-lg border border-gray-800 bg-gray-900/50 p-4 transition hover:border-gray-600"
            >
              <span className="font-mono text-sm font-semibold text-gray-200">
                Link vs Anchor →
              </span>
              <span className="text-xs text-gray-500">
                See how{' '}
                <code className="font-mono text-gray-400">&lt;Link&gt;</code>{' '}
                prefetches and navigates client-side, while{' '}
                <code className="font-mono text-gray-400">&lt;a&gt;</code> does
                a full page reload.
              </span>
            </Link>
            <Link
              href="/prefetching/static"
              className="flex flex-col gap-2 rounded-lg border border-blue-900/50 bg-blue-950/20 p-4 transition hover:border-blue-700"
            >
              <span className="font-mono text-sm font-semibold text-blue-400">
                Static Route →
              </span>
              <span className="text-xs text-gray-500">
                Full route is prefetched. Navigation is instant with no server
                wait.
              </span>
            </Link>
            <Link
              href="/prefetching/dynamic"
              className="flex flex-col gap-2 rounded-lg border border-pink-900/50 bg-pink-950/20 p-4 transition hover:border-pink-700"
            >
              <span className="font-mono text-sm font-semibold text-pink-400">
                Dynamic Route →
              </span>
              <span className="text-xs text-gray-500">
                Prefetching is skipped. You wait for the server on every
                navigation.
              </span>
            </Link>
            <Link
              href="/prefetching/dynamic-with-loading"
              className="flex flex-col gap-2 rounded-lg border border-violet-900/50 bg-violet-950/20 p-4 transition hover:border-violet-700"
            >
              <span className="font-mono text-sm font-semibold text-violet-400">
                Dynamic + loading.tsx →
              </span>
              <span className="text-xs text-gray-500">
                The loading skeleton is prefetched. Content streams in after the
                server responds.
              </span>
            </Link>
          </div>
        </div>
      </div>
    </Boundary>
  );
}
