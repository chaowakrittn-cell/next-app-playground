import { Boundary } from '#/ui/boundary';
import Link from 'next/link';

export default function Page() {
  return (
    <Boundary label="viewport/page.tsx">
      <div className="flex flex-col gap-4">
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-sm text-gray-400">
            <span className="font-semibold text-gray-200">How to observe:</span>{' '}
            Open the{' '}
            <strong className="text-gray-300">Network tab</strong> in DevTools,
            then scroll down. The{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-300">
              &lt;Link&gt;
            </code>{' '}
            below the fold will trigger a prefetch request the moment it enters
            the viewport.
          </p>
        </div>

        {/* Spacer to push the link below the fold */}
        <div className="flex h-[100vh] flex-col items-center justify-center gap-2 text-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="animate-bounce"
          >
            <path d="M12 5v14M5 12l7 7 7-7" />
          </svg>
          <span className="font-mono text-xs">scroll down</span>
        </div>

        <div className="flex flex-col items-start gap-3 rounded-lg border border-blue-900/50 bg-blue-950/20 p-5">
          <div className="flex flex-col gap-1">
            <span className="font-mono text-xs font-semibold text-blue-400">
              Link entered viewport — prefetch fires now
            </span>
            <span className="text-xs text-gray-500">
              Watch the Network tab — a request for the target page should
              appear as soon as this card becomes visible.
            </span>
          </div>
          <Link
            href="/prefetching/viewport/target"
            className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
          >
            Go to target page
          </Link>
        </div>
      </div>
    </Boundary>
  );
}
