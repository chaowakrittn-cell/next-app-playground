import { Boundary } from '#/ui/boundary';
import Link from 'next/link';

export default function Page() {
  return (
    <Boundary label="page.tsx (Server Environment)">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="rounded-lg border border-blue-900/50 bg-blue-950/20 px-4 py-3 text-sm text-gray-300">
            <span className="font-semibold text-blue-300">Naming:</span> as of
            Next.js 16, Middleware is called{' '}
            <strong className="text-gray-100">Proxy</strong> — same
            functionality, the file is now{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
              proxy.ts
            </code>
            .
          </p>

          <p className="text-sm leading-7 text-gray-300">
            Proxy runs code <strong className="text-gray-100">before a request completes</strong>.
            Based on the incoming request you can redirect, rewrite, modify
            request/response headers, or respond directly. There&apos;s{' '}
            <strong className="text-gray-100">one</strong>{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
              proxy.ts
            </code>{' '}
            per project, at the root, scoped with a{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
              matcher
            </code>
            .
          </p>

          <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-xs leading-6 text-gray-400">
{`// proxy.ts (project root)
import { NextResponse, type NextRequest } from 'next/server'

export function proxy(request: NextRequest) {
  return NextResponse.redirect(new URL('/home', request.url))
}

export const config = { matcher: '/about/:path*' }`}
          </pre>

          <div className="rounded-lg border border-amber-800/50 bg-amber-950/20 p-4">
            <p className="text-xs leading-6 text-gray-400">
              <span className="font-semibold text-amber-400">Use it for:</span>{' '}
              header tweaks, A/B rewrites, and optimistic redirects based on
              request data. <span className="font-semibold text-amber-400">Not for:</span>{' '}
              slow data fetching or full auth/session management —{' '}
              <code className="font-mono text-gray-400">fetch</code> caching
              options have no effect in Proxy. For simple static redirects,
              prefer the{' '}
              <code className="font-mono text-gray-400">redirects</code> config
              in <code className="font-mono text-gray-400">next.config</code>.
            </p>
          </div>

          <p className="text-xs text-gray-500">
            This demo ships a real{' '}
            <code className="font-mono text-gray-400">proxy.ts</code> whose
            matcher is scoped to{' '}
            <code className="font-mono text-gray-400">/proxy/:path*</code>, so it
            only affects these pages.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Explore (live)
          </span>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            <Link
              href="/proxy/headers"
              className="flex flex-col gap-1 rounded-lg border border-blue-900/50 bg-blue-950/20 p-4 transition hover:border-blue-700"
            >
              <span className="font-mono text-sm font-semibold text-blue-400">
                Modify Headers →
              </span>
              <span className="text-xs text-gray-500">
                Proxy injects a request header the app reads back.
              </span>
            </Link>
            <Link
              href="/proxy/redirect"
              className="flex flex-col gap-1 rounded-lg border border-violet-900/50 bg-violet-950/20 p-4 transition hover:border-violet-700"
            >
              <span className="font-mono text-sm font-semibold text-violet-400">
                Redirect →
              </span>
              <span className="text-xs text-gray-500">
                Visit a path, get sent somewhere else.
              </span>
            </Link>
            <Link
              href="/proxy/rewrite"
              className="flex flex-col gap-1 rounded-lg border border-cyan-900/50 bg-cyan-950/20 p-4 transition hover:border-cyan-700"
            >
              <span className="font-mono text-sm font-semibold text-cyan-400">
                Rewrite →
              </span>
              <span className="text-xs text-gray-500">
                Same URL, different content served.
              </span>
            </Link>
          </div>
        </div>
      </div>
    </Boundary>
  );
}
