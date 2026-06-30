import { Boundary } from '#/ui/boundary';
import { connection } from 'next/server';
import { Suspense } from 'react';

export const instant = false;

export default async function Page() {
  await connection();

  return (
    <Boundary label="with-suspense/page.tsx" color="violet">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-violet-400">
            With Suspense
          </span>
          <p className="text-sm leading-6 text-gray-400">
            Each component is wrapped in its own{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-300">
              &lt;Suspense&gt;
            </code>{' '}
            boundary. They resolve independently — watch them stream in one by
            one at 500ms, 1000ms, and 1500ms instead of all waiting for the
            slowest.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          <Suspense fallback={<CardSkeleton label="Fast" delay={500} />}>
            <DataCard label="Fast" delay={500} color="green" />
          </Suspense>
          <Suspense fallback={<CardSkeleton label="Medium" delay={1000} />}>
            <DataCard label="Medium" delay={1000} color="yellow" />
          </Suspense>
          <Suspense fallback={<CardSkeleton label="Slow" delay={1500} />}>
            <DataCard label="Slow" delay={1500} color="red" />
          </Suspense>
        </div>
      </div>
    </Boundary>
  );
}

async function DataCard({
  label,
  delay,
  color,
}: {
  label: string;
  delay: number;
  color: 'green' | 'yellow' | 'red';
}) {
  await new Promise((r) => setTimeout(r, delay));
  const renderedAt = new Date().toISOString();

  const styles = {
    green: 'border-green-900/50 bg-green-950/20 text-green-400',
    yellow: 'border-yellow-900/50 bg-yellow-950/20 text-yellow-400',
    red: 'border-red-900/50 bg-red-950/20 text-red-400',
  };

  return (
    <div className={`flex flex-col gap-2 rounded-lg border p-4 ${styles[color]}`}>
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs font-semibold">{label}</span>
        <span className="font-mono text-xs text-gray-600">{delay}ms</span>
      </div>
      <span className="font-mono text-xs text-gray-500 break-all">
        {renderedAt}
      </span>
    </div>
  );
}

function CardSkeleton({ label, delay }: { label: string; delay: number }) {
  return (
    <div className="flex flex-col gap-2 rounded-lg border border-gray-800 bg-gray-900/50 p-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-xs text-gray-600">{label}</span>
        <span className="font-mono text-xs text-gray-700">{delay}ms</span>
      </div>
      <div className="h-2.5 w-full animate-pulse rounded bg-gray-800" />
    </div>
  );
}
