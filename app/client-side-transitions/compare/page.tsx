import { Boundary } from '#/ui/boundary';
import Link from 'next/link';

export default function Page() {
  return (
    <Boundary label="compare/page.tsx">
      <div className="flex flex-col gap-6">
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-sm text-gray-400">
            <span className="font-semibold text-gray-200">Step 1:</span> Click
            the{' '}
            <span className="rounded bg-gray-700 px-2 py-0.5 font-mono text-xs text-gray-100">
              0 Clicks
            </span>{' '}
            counter in the top-right corner a few times.
            <br />
            <span className="font-semibold text-gray-200">Step 2:</span> Use
            one of the buttons below to navigate to the destination page and
            observe whether the counter survives.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-lg border border-blue-900/50 bg-blue-950/20 p-5">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs font-semibold text-blue-400">
                &lt;Link&gt; — client-side transition
              </span>
              <ul className="flex flex-col gap-1 pl-3 text-xs text-gray-500">
                <li>Layout stays mounted — counter is preserved</li>
                <li>Only the page content swaps</li>
                <li>No white flash or full reload</li>
              </ul>
            </div>
            <Link
              href="/client-side-transitions/compare/destination?via=link"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              Navigate with &lt;Link&gt;
            </Link>
          </div>

          <div className="flex flex-col gap-3 rounded-lg border border-pink-900/50 bg-pink-950/20 p-5">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs font-semibold text-pink-400">
                &lt;a&gt; — full page reload
              </span>
              <ul className="flex flex-col gap-1 pl-3 text-xs text-gray-500">
                <li>Page fully reloads — counter resets to 0</li>
                <li>All JS state is destroyed and rebuilt</li>
                <li>Brief white flash as browser repaints</li>
              </ul>
            </div>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/client-side-transitions/compare/destination?via=anchor"
              className="inline-flex items-center justify-center rounded-md bg-pink-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-pink-600"
            >
              Navigate with &lt;a&gt;
            </a>
          </div>
        </div>
      </div>
    </Boundary>
  );
}
