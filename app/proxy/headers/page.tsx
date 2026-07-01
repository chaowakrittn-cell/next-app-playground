import { Boundary } from '#/ui/boundary';
import { HeadersCaller } from './caller';

export default function Page() {
  return (
    <Boundary label="headers/page.tsx (Server Environment)">
      <div className="flex flex-col gap-6">
        <p className="text-sm leading-7 text-gray-300">
          Proxy can modify request (and response) headers before the request is
          handled. Here it injects{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            x-proxy-demo
          </code>{' '}
          into every <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">/proxy/*</code>{' '}
          request; the route handler reads it back.
        </p>

        <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-xs leading-6 text-gray-400">
{`// proxy.ts
const requestHeaders = new Headers(request.headers)
requestHeaders.set('x-proxy-demo', 'hello-from-proxy')
return NextResponse.next({ request: { headers: requestHeaders } })`}
        </pre>

        <HeadersCaller />
      </div>
    </Boundary>
  );
}
