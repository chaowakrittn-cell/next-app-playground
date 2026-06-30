import { Boundary } from '#/ui/boundary';
import Link from 'next/link';

const ITEMS = Array.from({ length: 18 }, (_, i) => i + 1);

export default function Page() {
  return (
    <Boundary label="scroll-to-top/page.tsx">
      <div className="flex flex-col gap-4">
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-sm text-gray-400">
            <span className="font-semibold text-gray-200">How to observe:</span>{' '}
            Scroll to the bottom of this list, then click one of the two
            buttons. Notice where you land on the result page.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {ITEMS.map((n) => (
            <div
              key={n}
              className="flex items-center gap-3 rounded-lg border border-gray-800 bg-gray-900/30 px-4 py-3"
            >
              <span className="font-mono text-xs text-gray-600">#{n}</span>
              <div className="h-2 flex-1 rounded bg-gray-800" />
            </div>
          ))}
        </div>

        <div className="mt-2 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-lg border border-blue-900/50 bg-blue-950/20 p-5">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs font-semibold text-blue-400">
                &lt;Link&gt; — default scroll=true
              </span>
              <p className="text-xs text-gray-500">
                Scrolls to the top of the page on navigation. You will land at
                the top of the result page.
              </p>
            </div>
            <Link
              href="/client-side-transitions/scroll-to-top/result?scroll=default"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Navigate (scroll=true)
            </Link>
          </div>

          <div className="flex flex-col gap-3 rounded-lg border border-violet-900/50 bg-violet-950/20 p-5">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs font-semibold text-violet-400">
                &lt;Link scroll={'{false}'}&gt;
              </span>
              <p className="text-xs text-gray-500">
                Skips the scroll-to-top. You will arrive at the same scroll
                position you were at here.
              </p>
            </div>
            <Link
              href="/client-side-transitions/scroll-to-top/result?scroll=false"
              scroll={false}
              className="inline-flex items-center justify-center rounded-md bg-violet-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-600"
            >
              Navigate (scroll=false)
            </Link>
          </div>
        </div>
      </div>
    </Boundary>
  );
}
