import { Boundary } from '#/ui/boundary';
import Link from 'next/link';
import { connection } from 'next/server';

export const instant = false;

export default async function Page() {
  await connection();
  await new Promise((r) => setTimeout(r, 2000));

  return (
    <Boundary label="link-status/target/page.tsx" color="blue">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400">
            Target page loaded
          </span>
          <p className="text-sm leading-6 text-gray-400">
            This page has a 2s artificial delay to simulate a slow server
            response. On the previous page you could see the difference between
            no feedback, immediate spinner, and debounced spinner during that
            wait.
          </p>
        </div>

        <Link
          href="/prefetching/link-status"
          className="self-start rounded-md bg-gray-800 px-4 py-2 text-sm font-semibold text-gray-200 transition hover:bg-gray-700"
        >
          ← Back
        </Link>
      </div>
    </Boundary>
  );
}
