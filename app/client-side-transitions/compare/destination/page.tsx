import { Boundary } from '#/ui/boundary';
import Link from 'next/link';

export const instant = false;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ via?: string }>;
}) {
  const { via } = await searchParams;
  const viaLink = via === 'link';

  return (
    <Boundary label="compare/destination/page.tsx">
      <div className="flex flex-col gap-6">
        <div
          className={`flex flex-col gap-2 rounded-lg border p-5 ${
            viaLink
              ? 'border-blue-900/50 bg-blue-950/20'
              : 'border-pink-900/50 bg-pink-950/20'
          }`}
        >
          <span
            className={`font-mono text-xs font-semibold uppercase tracking-wider ${
              viaLink ? 'text-blue-400' : 'text-pink-400'
            }`}
          >
            You arrived via {viaLink ? '<Link>' : '<a>'}
          </span>
          <p className="text-sm leading-6 text-gray-400">
            {viaLink ? (
              <>
                This was a <strong className="text-gray-300">client-side transition</strong>.
                The layout stayed mounted — check the counter in the top-right,
                it should still show the value you set.
              </>
            ) : (
              <>
                This was a <strong className="text-gray-300">full page reload</strong>.
                The entire app was torn down and rebuilt — the counter in the
                top-right has reset to 0.
              </>
            )}
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Go back
          </p>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/client-side-transitions/compare"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              ← Back with &lt;Link&gt;
            </Link>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/client-side-transitions/compare"
              className="inline-flex items-center justify-center rounded-md bg-gray-700 px-4 py-2 text-sm font-semibold text-gray-200 transition hover:bg-gray-600"
            >
              ← Back with &lt;a&gt;
            </a>
          </div>
          <p className="text-xs text-gray-600">
            Going back with &lt;Link&gt; keeps the counter. Going back with
            &lt;a&gt; resets it again.
          </p>
        </div>
      </div>
    </Boundary>
  );
}
