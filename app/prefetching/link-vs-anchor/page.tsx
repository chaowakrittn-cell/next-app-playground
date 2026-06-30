import { Boundary } from '#/ui/boundary';
import Link from 'next/link';

export default function Page() {
  return (
    <Boundary label="link-vs-anchor/page.tsx">
      <div className="flex flex-col gap-6">
        <p className="text-sm leading-6 text-gray-400">
          Both buttons below navigate to the same target page. That target is
          not linked from anywhere else on the site, so it starts cold with no
          prefetch. Open the{' '}
          <strong className="text-gray-300">Network tab</strong> in DevTools —
          you will see{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-300">
            &lt;Link&gt;
          </code>{' '}
          fire a prefetch request as soon as it enters the viewport.
        </p>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-lg border border-blue-900/50 bg-blue-950/20 p-5">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs font-semibold text-blue-400">
                &lt;Link&gt; — Next.js component
              </span>
              <ul className="flex flex-col gap-1 pl-3 text-xs text-gray-500">
                <li>Prefetches the route when visible in viewport</li>
                <li>Client-side navigation — no full page reload</li>
                <li>Keeps browser state (scroll, JS memory)</li>
              </ul>
            </div>
            <Link
              href="/prefetching/link-vs-anchor/target"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Go to target page
            </Link>
          </div>

          <div className="flex flex-col gap-3 rounded-lg border border-gray-700 bg-gray-900/50 p-5">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs font-semibold text-gray-300">
                &lt;a&gt; — plain HTML tag
              </span>
              <ul className="flex flex-col gap-1 pl-3 text-xs text-gray-500">
                <li>No prefetching</li>
                <li>Full page reload on every click</li>
                <li>Resets all browser and JS state</li>
              </ul>
            </div>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/prefetching/link-vs-anchor/target"
              className="inline-flex items-center justify-center rounded-md bg-gray-700 px-4 py-2 text-sm font-semibold text-gray-200 transition hover:bg-gray-600"
            >
              Go to target page
            </a>
          </div>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-xs text-gray-500">
            <span className="font-semibold text-gray-400">Tip:</span> After
            clicking the{' '}
            <code className="font-mono text-gray-300">&lt;a&gt;</code> link, hit
            the browser back button — you will notice the page fully reloads
            again. With{' '}
            <code className="font-mono text-gray-300">&lt;Link&gt;</code>, going
            back is instant and preserves scroll position.
          </p>
        </div>
      </div>
    </Boundary>
  );
}
