import { Boundary } from '#/ui/boundary';
import Link from 'next/link';

export default function Page() {
  return (
    <Boundary label="page.tsx">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="text-sm leading-7 text-gray-300">
            Streaming allows the server to send parts of a dynamic route to the
            client as soon as they&apos;re ready, rather than waiting for the
            entire route to be rendered. This means users see something sooner,
            even if parts of the page are still loading.
          </p>

          <p className="text-sm leading-7 text-gray-300">
            For dynamic routes, it means they can be{' '}
            <strong className="text-gray-200">partially prefetched</strong>.
            That is, shared layouts and loading skeletons can be requested ahead
            of time.
          </p>

          <p className="text-sm leading-7 text-gray-300">
            To use streaming, create a{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
              loading.tsx
            </code>{' '}
            in your route folder. Behind the scenes, Next.js will automatically
            wrap the{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
              page.tsx
            </code>{' '}
            contents in a{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
              &lt;Suspense&gt;
            </code>{' '}
            boundary. The prefetched fallback UI will be shown while the route
            is loading, and swapped for the actual content once ready.
          </p>

          <p className="rounded-lg border border-gray-800 bg-gray-900/50 px-4 py-3 text-sm text-gray-500">
            <span className="font-semibold text-gray-400">Good to know:</span>{' '}
            You can also use{' '}
            <code className="font-mono text-xs text-gray-300">&lt;Suspense&gt;</code>{' '}
            directly to create loading UI for nested components.
          </p>

          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold text-gray-300">
              Benefits of{' '}
              <code className="font-mono text-xs">loading.tsx</code>:
            </p>
            <ul className="flex flex-col gap-1.5 pl-4">
              {[
                'Immediate navigation and visual feedback for the user.',
                'Shared layouts remain interactive and navigation is interruptible.',
                'Improved Core Web Vitals: TTFB, FCP, and TTI.',
              ].map((item) => (
                <li key={item} className="text-sm leading-6 text-gray-400">
                  <span className="mr-2 text-gray-600">—</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Showcases
          </p>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            <Link
              href="/streaming/without-streaming"
              className="flex flex-col gap-2 rounded-lg border border-pink-900/50 bg-pink-950/20 p-4 transition hover:border-pink-700"
            >
              <span className="font-mono text-sm font-semibold text-pink-400">
                Without Streaming →
              </span>
              <span className="text-xs text-gray-500">
                Everything blocks. The user sees nothing until all data
                resolves.
              </span>
            </Link>
            <Link
              href="/streaming/with-loading"
              className="flex flex-col gap-2 rounded-lg border border-blue-900/50 bg-blue-950/20 p-4 transition hover:border-blue-700"
            >
              <span className="font-mono text-sm font-semibold text-blue-400">
                With loading.tsx →
              </span>
              <span className="text-xs text-gray-500">
                Skeleton shown immediately. All content appears together once
                ready.
              </span>
            </Link>
            <Link
              href="/streaming/with-suspense"
              className="flex flex-col gap-2 rounded-lg border border-violet-900/50 bg-violet-950/20 p-4 transition hover:border-violet-700"
            >
              <span className="font-mono text-sm font-semibold text-violet-400">
                With Suspense →
              </span>
              <span className="text-xs text-gray-500">
                Each component streams in independently as it resolves.
              </span>
            </Link>
          </div>
        </div>
      </div>
    </Boundary>
  );
}
