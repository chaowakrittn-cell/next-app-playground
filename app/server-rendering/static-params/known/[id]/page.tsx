import { Boundary } from '#/ui/boundary';
import Link from 'next/link';

export function generateStaticParams() {
  return [{ id: '1' }, { id: '2' }, { id: '3' }];
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  console.log(`[known/${id}] — BUILD TIME`);

  return (
    <Boundary label={`known/[id]/page.tsx — id="${id}"`} color="blue">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400">
            Prerendered at build time
          </span>
          <p className="text-sm leading-6 text-gray-400">
            This route has{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-300">
              generateStaticParams
            </code>{' '}
            returning ids 1, 2, and 3. Next.js prerendered all three pages
            during <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-300">next build</code> and
            cached the result. The server code never runs again at request time.
          </p>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <p className="font-mono text-xs text-gray-500">
            <span className="text-gray-400">Check your terminal</span> —{' '}
            <code className="text-blue-400">[known/{id}] — BUILD TIME</code>{' '}
            was logged once during the build. Navigating here logs nothing.
          </p>
        </div>

        <Link
          href="/server-rendering/static-params"
          className="self-start rounded-md bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-200 transition hover:bg-gray-700"
        >
          ← Back to list
        </Link>
      </div>
    </Boundary>
  );
}
