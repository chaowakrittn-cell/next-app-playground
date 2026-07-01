import { Boundary } from '#/ui/boundary';
import Link from 'next/link';

export default function Page() {
  return (
    <Boundary label="redirected/page.tsx (Server Environment)" color="violet">
      <div className="flex flex-col gap-4">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-violet-400">
          You were redirected here
        </span>
        <p className="text-sm leading-6 text-gray-300">
          You navigated to{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            /proxy/go
          </code>
          , but <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">proxy.ts</code>{' '}
          redirected the request to{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            /proxy/redirected
          </code>{' '}
          before any page rendered.
        </p>
        <Link
          href="/proxy/redirect"
          className="self-start rounded-md bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-200 transition hover:bg-gray-700"
        >
          ← Back to the Redirect tab
        </Link>
      </div>
    </Boundary>
  );
}
