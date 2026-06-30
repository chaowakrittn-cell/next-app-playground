'use cache';

import { Boundary } from '#/ui/boundary';
import Link from 'next/link';

export default async function Page() {
  return (
    <Boundary label="hover-target/page.tsx" color="blue">
      <div className="flex flex-col gap-4">
        <p className="text-sm leading-6 text-gray-400">
          This page was prefetched only when you hovered the link. In the
          Network tab you saw no request for{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-300">
            /hover-target
          </code>{' '}
          on page load — it only fired on{' '}
          <strong className="text-gray-300">mouseenter</strong>.
        </p>
        <Link
          href="/prefetching/hover-prefetch"
          className="self-start rounded-md bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-200 transition hover:bg-gray-700"
        >
          ← Back
        </Link>
      </div>
    </Boundary>
  );
}
