import { Boundary } from '#/ui/boundary';
import { CachingCaller } from './caller';

export default function Page() {
  return (
    <Boundary label="caching/page.tsx (Server Environment)">
      <div className="flex flex-col gap-6">
        <p className="text-sm leading-7 text-gray-300">
          Route handlers are <strong className="text-gray-100">not cached by default</strong>.
          With Cache Components enabled (as in this repo),{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            GET
          </code>{' '}
          handlers follow the same model as pages: prerendered when they use no
          runtime/non-deterministic data, otherwise run at request time. Only{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            GET
          </code>{' '}
          can be cached — POST/PUT/etc never are.
        </p>

        <CachingCaller />

        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            The three handlers
          </span>
          <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-xs leading-6 text-gray-400">
{`// static → prerendered
export async function GET() {
  return Response.json({ projectName: 'Next.js' })
}

// dynamic → Math.random() defers to request time
export async function GET() {
  return Response.json({ randomNumber: Math.random() })
}

// runtime → headers() is request-specific
export async function GET() {
  const h = await headers()
  return Response.json({ userAgent: h.get('user-agent') })
}`}
          </pre>
          <p className="text-xs leading-6 text-gray-500">
            To include <em>uncached</em> data (a DB query) in a prerendered
            response, wrap it in a{' '}
            <code className="font-mono text-gray-400">&apos;use cache&apos;</code>{' '}
            helper with{' '}
            <code className="font-mono text-gray-400">cacheLife</code> —{' '}
            <code className="font-mono text-gray-400">&apos;use cache&apos;</code>{' '}
            can&apos;t sit directly in the handler body, so extract a function.
          </p>
        </div>
      </div>
    </Boundary>
  );
}
