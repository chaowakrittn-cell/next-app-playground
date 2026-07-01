import { Boundary } from '#/ui/boundary';
import Link from 'next/link';

export default function Page() {
  return (
    <Boundary label="rewritten/page.tsx (Server Environment)" color="cyan">
      <div className="flex flex-col gap-4">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-cyan-400">
          This is /proxy/rewritten
        </span>
        <p className="text-sm leading-6 text-gray-300">
          …but your address bar still says{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            /proxy/masked
          </code>
          . The proxy <strong className="text-gray-100">rewrote</strong> the
          request internally — the client never sees the real path, and no
          redirect happened.
        </p>
        <Link
          href="/proxy/rewrite"
          className="self-start rounded-md bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-200 transition hover:bg-gray-700"
        >
          ← Back to the Rewrite tab
        </Link>
      </div>
    </Boundary>
  );
}
