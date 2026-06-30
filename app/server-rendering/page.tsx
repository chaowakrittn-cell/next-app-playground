import { Boundary } from '#/ui/boundary';
import Link from 'next/link';

export default function Page() {
  return (
    <Boundary label="page.tsx">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="text-sm leading-7 text-gray-300">
            In Next.js, Layouts and Pages are React Server Components by
            default. On initial and subsequent navigations, the Server Component
            Payload is generated on the server before being sent to the client.
          </p>

          <p className="text-sm leading-7 text-gray-300">
            There are two types of server rendering, based on when it happens:
          </p>

          <ul className="flex flex-col gap-3 pl-4">
            <li className="flex flex-col gap-1">
              <span className="font-mono text-xs font-semibold text-blue-400">
                Prerendering
              </span>
              <span className="text-sm leading-6 text-gray-400">
                Happens at build time or during revalidation and the result is
                cached.
              </span>
            </li>
            <li className="flex flex-col gap-1">
              <span className="font-mono text-xs font-semibold text-pink-400">
                Dynamic Rendering
              </span>
              <span className="text-sm leading-6 text-gray-400">
                Happens at request time in response to a client request.
              </span>
            </li>
          </ul>

          <p className="text-sm leading-7 text-gray-300">
            The trade-off of server rendering is that the client must wait for
            the server to respond before the new route can be shown. Next.js
            addresses this delay by prefetching routes the user is likely to
            visit and performing client-side transitions.
          </p>

          <p className="rounded-lg border border-gray-800 bg-gray-900/50 px-4 py-3 text-sm text-gray-500">
            <span className="font-semibold text-gray-400">Good to know:</span>{' '}
            HTML is also generated for the initial visit.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            See the difference
          </p>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <Link
              href="/server-rendering/prerendered"
              className="group flex flex-col gap-2 rounded-lg border border-blue-900/50 bg-blue-950/20 p-4 transition hover:border-blue-700"
            >
              <span className="font-mono text-sm font-semibold text-blue-400">
                Prerendered →
              </span>
              <span className="text-xs text-gray-500">
                Rendered at build time. Navigation is instant — no server
                round-trip needed.
              </span>
            </Link>
            <Link
              href="/server-rendering/dynamic"
              className="group flex flex-col gap-2 rounded-lg border border-pink-900/50 bg-pink-950/20 p-4 transition hover:border-pink-700"
            >
              <span className="font-mono text-sm font-semibold text-pink-400">
                Dynamic Rendering →
              </span>
              <span className="text-xs text-gray-500">
                Rendered per request. Navigation waits for the server to
                respond.
              </span>
            </Link>
          </div>
        </div>
      </div>
    </Boundary>
  );
}
