import { Boundary } from '#/ui/boundary';
import Link from 'next/link';

export default function Page() {
  return (
    <Boundary label="page.tsx (Server Environment)">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="text-sm leading-7 text-gray-300">
            When you fetch data in a Server Component, the route is blocked from
            rendering until that data is ready. If a request is slow, the user
            stares at nothing. Streaming breaks the page into chunks and sends
            them as they become ready.
          </p>
          <p className="text-sm leading-7 text-gray-300">
            There are two ways to stream:
          </p>
          <ul className="flex flex-col gap-3 pl-4">
            <li className="flex flex-col gap-1">
              <span className="font-mono text-xs font-semibold text-blue-400">
                loading.js
              </span>
              <span className="text-sm leading-6 text-gray-400">
                Streams the <strong className="text-gray-300">entire page</strong>.
                Next.js wraps the page in a{' '}
                <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-300">
                  &lt;Suspense&gt;
                </code>{' '}
                boundary automatically and shows the fallback while it renders.
              </span>
            </li>
            <li className="flex flex-col gap-1">
              <span className="font-mono text-xs font-semibold text-violet-400">
                &lt;Suspense&gt;
              </span>
              <span className="text-sm leading-6 text-gray-400">
                Streams <strong className="text-gray-300">specific parts</strong>.
                Content outside the boundary shows immediately; only what&apos;s
                inside streams in.
              </span>
            </li>
          </ul>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
          <Link
            href="/data-streaming/with-loading"
            className="flex flex-col gap-1 rounded-lg border border-blue-900/50 bg-blue-950/20 p-4 transition hover:border-blue-700"
          >
            <span className="font-mono text-sm font-semibold text-blue-400">
              With loading.js →
            </span>
            <span className="text-xs text-gray-500">
              The whole page shows a skeleton, then swaps to content.
            </span>
          </Link>
          <Link
            href="/data-streaming/with-suspense"
            className="flex flex-col gap-1 rounded-lg border border-violet-900/50 bg-violet-950/20 p-4 transition hover:border-violet-700"
          >
            <span className="font-mono text-sm font-semibold text-violet-400">
              With Suspense →
            </span>
            <span className="text-xs text-gray-500">
              Header is instant; each section streams in independently.
            </span>
          </Link>
        </div>
      </div>
    </Boundary>
  );
}
