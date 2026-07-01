import { Boundary } from '#/ui/boundary';

export default function Page() {
  return (
    <Boundary label="redirect/page.tsx (Server Environment)">
      <div className="flex flex-col gap-6">
        <p className="text-sm leading-7 text-gray-300">
          Proxy can redirect based on the incoming request. There is{' '}
          <strong className="text-gray-100">no page</strong> at{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            /proxy/go
          </code>{' '}
          — the proxy intercepts it and sends you to{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            /proxy/redirected
          </code>
          .
        </p>

        <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-xs leading-6 text-gray-400">
{`// proxy.ts
if (pathname === '/proxy/go') {
  return NextResponse.redirect(new URL('/proxy/redirected', request.url))
}`}
        </pre>

        {/* Plain <a> = a real navigation the proxy intercepts (no prefetch). */}
        <a
          href="/proxy/go"
          className="inline-flex items-center justify-center self-start rounded-md bg-violet-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-500"
        >
          Visit /proxy/go →
        </a>

        <p className="text-xs text-gray-500">
          Watch the URL bar: you asked for{' '}
          <code className="font-mono text-gray-400">/proxy/go</code> but land on{' '}
          <code className="font-mono text-gray-400">/proxy/redirected</code>{' '}
          (a 307 from the proxy, visible in the Network tab).
        </p>
      </div>
    </Boundary>
  );
}
