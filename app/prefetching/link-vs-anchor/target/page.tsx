'use cache';

import { Boundary } from '#/ui/boundary';
import Link from 'next/link';

export default async function Page() {
  const renderedAt = new Date().toISOString();

  return (
    <Boundary label="link-vs-anchor/target/page.tsx" color="blue">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400">
            You arrived at the target page
          </span>
          <p className="text-sm leading-6 text-gray-400">
            This page is not linked from the tabs or the home page — only the
            two buttons on the previous page point here. That makes it a clean
            target for comparing prefetch behavior.
          </p>
        </div>

        <div className="flex flex-col gap-2 rounded-lg border border-blue-900/50 bg-blue-950/20 p-4">
          <span className="text-xs text-gray-500">Rendered at (build time)</span>
          <span className="font-mono text-sm text-blue-300">{renderedAt}</span>
        </div>

        <Link
          href="/prefetching/link-vs-anchor"
          className="self-start rounded-md bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-200 transition hover:bg-gray-700"
        >
          ← Back
        </Link>
      </div>
    </Boundary>
  );
}
