import { Boundary } from '#/ui/boundary';
import { MethodsCaller } from './caller';

export default function Page() {
  return (
    <Boundary label="methods/page.tsx (Server Environment)">
      <div className="flex flex-col gap-6">
        <p className="text-sm leading-7 text-gray-300">
          One <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">route.ts</code>{' '}
          can export a function per HTTP method. This{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            /route-handlers/api/echo
          </code>{' '}
          endpoint has a GET (reads a query param) and a POST (reads the JSON
          body). Call them below — the responses are live.
        </p>

        <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-xs leading-6 text-gray-400">
{`export async function GET(request: NextRequest) {
  const msg = request.nextUrl.searchParams.get('msg')
  return NextResponse.json({ method: 'GET', msg })
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  return NextResponse.json({ method: 'POST', received: body })
}`}
        </pre>

        <MethodsCaller />

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-xs leading-6 text-gray-500">
            Open the <strong className="text-gray-300">Network tab</strong> to
            see the actual requests. An unsupported method (e.g. DELETE here)
            would return <code className="font-mono text-gray-400">405 Method Not Allowed</code>.
          </p>
        </div>
      </div>
    </Boundary>
  );
}
