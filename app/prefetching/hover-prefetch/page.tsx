import { Boundary } from '#/ui/boundary';
import Link from 'next/link';
import { HoverPrefetchLink } from './hover-link';

const DEFAULT_TARGET = '/prefetching/hover-prefetch/default-target';
const HOVER_TARGET = '/prefetching/hover-prefetch/hover-target';

export default function Page() {
  return (
    <Boundary label="hover-prefetch/page.tsx">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="text-sm leading-7 text-gray-300">
            By default,{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
              &lt;Link&gt;
            </code>{' '}
            prefetches routes as soon as they enter the viewport. On pages with
            many links, this can trigger a large number of prefetch requests
            upfront.
          </p>
          <p className="text-sm leading-7 text-gray-300">
            You can defer prefetching until hover by setting{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
              prefetch={'{false}'}
            </code>{' '}
            and calling{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
              router.prefetch(href)
            </code>{' '}
            on{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
              onMouseEnter
            </code>
            . The route is still prefetched before you click — just later and
            only for links you actually interact with.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-lg border border-gray-800 bg-gray-900/50 p-5">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs font-semibold text-gray-300">
                Default &lt;Link&gt;
              </span>
              <p className="text-xs text-gray-500">
                Prefetch fires as soon as this link enters the viewport — before
                you hover or click.
              </p>
              <code className="mt-1 rounded bg-gray-800 px-2 py-1 font-mono text-xs text-gray-400">
                &lt;Link href="..."&gt;
              </code>
            </div>
            <Link
              href={DEFAULT_TARGET}
              className="inline-flex items-center justify-center rounded-md bg-gray-700 px-4 py-2 text-sm font-semibold text-gray-200 transition hover:bg-gray-600"
            >
              Navigate (default prefetch)
            </Link>
          </div>

          <div className="flex flex-col gap-3 rounded-lg border border-blue-900/50 bg-blue-950/20 p-5">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs font-semibold text-blue-400">
                Hover Prefetch
              </span>
              <p className="text-xs text-gray-500">
                No prefetch request until you hover. The route is still ready
                by the time you click.
              </p>
              <code className="mt-1 rounded bg-gray-800 px-2 py-1 font-mono text-xs text-gray-400">
                prefetch={'{false}'} onMouseEnter={'{() => router.prefetch(...)}'}
              </code>
            </div>
            <HoverPrefetchLink
              href={HOVER_TARGET}
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Navigate (hover prefetch)
            </HoverPrefetchLink>
          </div>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-xs text-gray-500">
            <span className="font-semibold text-gray-400">How to observe:</span>{' '}
            Open DevTools → Network tab. The default link fires a prefetch
            request immediately when this page loads. The hover link fires
            nothing — until you move your mouse over it.
          </p>
        </div>
      </div>
    </Boundary>
  );
}
