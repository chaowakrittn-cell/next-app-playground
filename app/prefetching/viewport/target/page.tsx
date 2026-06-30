'use cache';

import { Boundary } from '#/ui/boundary';
import Link from 'next/link';

export default async function Page() {
  const renderedAt = new Date().toISOString();

  return (
    <Boundary label="viewport/target/page.tsx" color="blue">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400">
            You arrived at the target page
          </span>
          <p className="text-sm leading-6 text-gray-400">
            This page is not linked from the tabs or any other page — only the{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-300">
              &lt;Link&gt;
            </code>{' '}
            below the fold on the Viewport page points here. If navigation felt
            instant, it was already prefetched when you scrolled the link into
            view.
          </p>
        </div>

        <div className="flex flex-col gap-2 rounded-lg border border-blue-900/50 bg-blue-950/20 p-4">
          <span className="text-xs text-gray-500">Rendered at (build time)</span>
          <span className="font-mono text-sm text-blue-300">{renderedAt}</span>
        </div>

        <Link
          href="/prefetching/viewport"
          className="self-start rounded-md bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-200 transition hover:bg-gray-700"
        >
          ← Back
        </Link>
      </div>
    </Boundary>
  );
}
