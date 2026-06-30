import { Boundary } from '#/ui/boundary';
import Link from 'next/link';

export const instant = false;

// No generateStaticParams — Next.js does not know these pages exist at build time.
// They are rendered and cached on the first request for each id.

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  console.log(`[unknown/${id}] — FIRST REQUEST (then cached)`);

  return (
    <Boundary label={`unknown/[id]/page.tsx — id="${id}"`} color="orange">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-orange-400">
            Cached on first request
          </span>
          <p className="text-sm leading-6 text-gray-400">
            This route has no{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-300">
              generateStaticParams
            </code>
            , so Next.js had no idea this page existed at build time. It was
            rendered and cached on your{' '}
            <strong className="text-gray-300">first visit</strong>. Navigating
            here again logs nothing — it is served from cache.
          </p>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <p className="font-mono text-xs text-gray-500">
            <span className="text-gray-400">Check your terminal</span> —{' '}
            <code className="text-orange-400">
              [unknown/{id}] — FIRST REQUEST
            </code>{' '}
            logged once on your first visit. Refresh the page — nothing logs
            again.
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
