import { Boundary } from '#/ui/boundary';
import Link from 'next/link';

export const instant = false;

export default async function Page({
  params,
}: {
  params: Promise<{ item: string }>;
}) {
  const { item } = await params;

  return (
    <Boundary label="scroll-restore/[item]/page.tsx" color="blue">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2 rounded-lg border border-blue-900/50 bg-blue-950/20 p-5">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400">
            Item #{item}
          </span>
          <p className="text-sm leading-6 text-gray-400">
            You navigated here with{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-300">
              &lt;Link&gt;
            </code>
            . Now hit the{' '}
            <strong className="text-gray-300">browser back button</strong> — the
            list will scroll back to exactly where item #{item} was.
          </p>
          <p className="text-sm leading-6 text-gray-400">
            Next.js saves the scroll position for every client-side navigation
            in the browser&apos;s history stack, and restores it when you go
            back or forward.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap gap-3">
            <Link
              href="/client-side-transitions/scroll-restore"
              className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
            >
              ← Back with &lt;Link&gt;
            </Link>
            {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
            <a
              href="/client-side-transitions/scroll-restore"
              className="inline-flex items-center justify-center rounded-md bg-gray-700 px-4 py-2 text-sm font-semibold text-gray-200 transition hover:bg-gray-600"
            >
              ← Back with &lt;a&gt;
            </a>
          </div>
          <p className="text-xs text-gray-600">
            &lt;Link&gt; restores your scroll position.{' '}
            &lt;a&gt; reloads the page and starts at the top.
          </p>
        </div>
      </div>
    </Boundary>
  );
}
