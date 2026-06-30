import { Boundary } from '#/ui/boundary';
import Link from 'next/link';

const ITEMS = Array.from({ length: 18 }, (_, i) => i + 1);

export const instant = false;

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ scroll?: string }>;
}) {
  const { scroll } = await searchParams;
  const scrolledToTop = scroll !== 'false';

  return (
    <Boundary
      label="scroll-to-top/result/page.tsx"
      color={scrolledToTop ? 'blue' : 'violet'}
    >
      <div className="flex flex-col gap-6">
        <div
          className={`flex flex-col gap-2 rounded-lg border p-5 ${
            scrolledToTop
              ? 'border-blue-900/50 bg-blue-950/20'
              : 'border-violet-900/50 bg-violet-950/20'
          }`}
        >
          <span
            className={`font-mono text-xs font-semibold uppercase tracking-wider ${
              scrolledToTop ? 'text-blue-400' : 'text-violet-400'
            }`}
          >
            {scrolledToTop ? 'scroll=true (default)' : 'scroll=false'}
          </span>
          <p className="text-sm leading-6 text-gray-400">
            {scrolledToTop ? (
              <>
                You were scrolled to the{' '}
                <strong className="text-gray-300">top of this page</strong>{' '}
                automatically on arrival. This is the default behavior of{' '}
                <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-300">
                  &lt;Link&gt;
                </code>
                .
              </>
            ) : (
              <>
                Your scroll position was{' '}
                <strong className="text-gray-300">preserved from the previous page</strong>.{' '}
                <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-300">
                  scroll={'{false}'}
                </code>{' '}
                skips the automatic scroll-to-top.
              </>
            )}
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

        <Link
          href="/client-side-transitions/scroll-to-top"
          className="self-start rounded-md bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-200 transition hover:bg-gray-700"
        >
          ← Back
        </Link>
      </div>
    </Boundary>
  );
}
