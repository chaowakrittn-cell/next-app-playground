'use cache';

import { Boundary } from '#/ui/boundary';

// Static page — no dynamic APIs. Full route prefetched by <Link>.
export default async function Page() {
  const renderedAt = new Date().toISOString();

  return (
    <Boundary label="static/page.tsx" color="blue">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400">
            Static Route — full prefetch
          </span>
          <p className="text-sm leading-6 text-gray-400">
            This page has no dynamic APIs, so Next.js fully prefetches it when
            the link enters the viewport. By the time you clicked, the page was
            already loaded client-side — navigation was instant.
          </p>
        </div>

        <div className="flex flex-col gap-2 rounded-lg border border-blue-900/50 bg-blue-950/20 p-4">
          <span className="text-xs text-gray-500">Rendered at (build time)</span>
          <span className="font-mono text-sm text-blue-300">{renderedAt}</span>
          <span className="text-xs text-gray-600">
            This timestamp is frozen — the page is served from cache and never
            re-rendered at request time.
          </span>
        </div>
      </div>
    </Boundary>
  );
}
