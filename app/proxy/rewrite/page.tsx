import { Boundary } from '#/ui/boundary';

export default function Page() {
  return (
    <Boundary label="rewrite/page.tsx (Server Environment)">
      <div className="flex flex-col gap-6">
        <p className="text-sm leading-7 text-gray-300">
          A rewrite serves different content <strong className="text-gray-100">without changing the URL</strong>.
          There is no page at{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            /proxy/masked
          </code>{' '}
          — the proxy rewrites it to render{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            /proxy/rewritten
          </code>{' '}
          while the address bar keeps showing{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            /proxy/masked
          </code>
          .
        </p>

        <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-xs leading-6 text-gray-400">
{`// proxy.ts
if (pathname === '/proxy/masked') {
  return NextResponse.rewrite(new URL('/proxy/rewritten', request.url))
}`}
        </pre>

        {/* Plain <a> so it's a full navigation the proxy rewrites. */}
        <a
          href="/proxy/masked"
          className="inline-flex items-center justify-center self-start rounded-md bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-500"
        >
          Visit /proxy/masked →
        </a>

        <p className="text-xs text-gray-500">
          Compare with the Redirect tab: a redirect{' '}
          <em>changes</em> the URL; a rewrite <em>keeps</em> it.
        </p>
      </div>
    </Boundary>
  );
}
