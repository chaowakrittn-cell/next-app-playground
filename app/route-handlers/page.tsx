import { Boundary } from '#/ui/boundary';
import Link from 'next/link';

export default function Page() {
  return (
    <Boundary label="page.tsx (Server Environment)">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="text-sm leading-7 text-gray-300">
            Route Handlers let you build custom request handlers (API endpoints)
            with the Web{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
              Request
            </code>{' '}
            /{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
              Response
            </code>{' '}
            APIs. Define one by exporting an HTTP-method function from a{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
              route.ts
            </code>{' '}
            file.
          </p>

          <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-xs leading-6 text-gray-400">
{`// app/api/route.ts
export async function GET(request: Request) {
  return Response.json({ hello: 'world' })
}`}
          </pre>

          <ul className="flex flex-col gap-2 rounded-lg border border-gray-800 bg-gray-900/50 p-4 text-xs leading-6 text-gray-500">
            <li>
              <span className="text-gray-400">Methods:</span>{' '}
              <code className="font-mono text-gray-400">
                GET, POST, PUT, PATCH, DELETE, HEAD, OPTIONS
              </code>{' '}
              — an unsupported one returns 405.
            </li>
            <li>
              <span className="text-gray-400">NextRequest / NextResponse</span>{' '}
              extend the native Request/Response with helpers.
            </li>
            <li>
              <span className="text-amber-400/80">route.ts and page.tsx cannot coexist</span>{' '}
              at the same route segment — a route is the lowest-level routing
              primitive and doesn&apos;t use layouts or client navigation.
            </li>
          </ul>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left text-xs">
              <thead>
                <tr className="border-b border-gray-800 text-gray-400">
                  <th className="py-2 pr-4 font-semibold">page</th>
                  <th className="py-2 pr-4 font-semibold">route</th>
                  <th className="py-2 font-semibold">result</th>
                </tr>
              </thead>
              <tbody className="font-mono text-gray-400">
                <tr className="border-b border-gray-800/60">
                  <td className="py-1.5 pr-4">app/page.js</td>
                  <td className="py-1.5 pr-4">app/route.js</td>
                  <td className="py-1.5 text-red-400">✗ conflict</td>
                </tr>
                <tr className="border-b border-gray-800/60">
                  <td className="py-1.5 pr-4">app/page.js</td>
                  <td className="py-1.5 pr-4">app/api/route.js</td>
                  <td className="py-1.5 text-green-400">✓ valid</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Explore (live endpoints)
          </span>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            <Link
              href="/route-handlers/methods"
              className="flex flex-col gap-1 rounded-lg border border-blue-900/50 bg-blue-950/20 p-4 transition hover:border-blue-700"
            >
              <span className="font-mono text-sm font-semibold text-blue-400">
                Methods & Params →
              </span>
              <span className="text-xs text-gray-500">
                GET with query params, POST with a JSON body.
              </span>
            </Link>
            <Link
              href="/route-handlers/dynamic"
              className="flex flex-col gap-1 rounded-lg border border-violet-900/50 bg-violet-950/20 p-4 transition hover:border-violet-700"
            >
              <span className="font-mono text-sm font-semibold text-violet-400">
                Dynamic Segment →
              </span>
              <span className="text-xs text-gray-500">
                Read <code className="font-mono">[id]</code> from the URL.
              </span>
            </Link>
            <Link
              href="/route-handlers/caching"
              className="flex flex-col gap-1 rounded-lg border border-cyan-900/50 bg-cyan-950/20 p-4 transition hover:border-cyan-700"
            >
              <span className="font-mono text-sm font-semibold text-cyan-400">
                Caching →
              </span>
              <span className="text-xs text-gray-500">
                Static vs dynamic vs runtime GET handlers.
              </span>
            </Link>
          </div>
        </div>
      </div>
    </Boundary>
  );
}
