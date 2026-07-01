import { Boundary } from '#/ui/boundary';
import { DynamicCaller } from './caller';

export default function Page() {
  return (
    <Boundary label="dynamic/page.tsx (Server Environment)">
      <div className="flex flex-col gap-6">
        <p className="text-sm leading-7 text-gray-300">
          Like pages, route handlers support dynamic segments. A file at{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            api/item/[id]/route.ts
          </code>{' '}
          receives the params in its second argument. Enter an id and call it —
          the handler echoes it back.
        </p>

        <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-xs leading-6 text-gray-400">
{`// api/item/[id]/route.ts
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  return Response.json({ id })
}

// TypeScript tip: you can also type it with the global helper
// (req: NextRequest, ctx: RouteContext<'/…/item/[id]'>)`}
        </pre>

        <DynamicCaller />
      </div>
    </Boundary>
  );
}
