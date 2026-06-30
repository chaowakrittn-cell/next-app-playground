import { Boundary } from '#/ui/boundary';
import { connection } from 'next/server';

export const instant = false;

export default async function Page() {
  await connection();

  // Same data fetching as without-streaming — still waits 1500ms for all data.
  // The difference is loading.tsx provides a skeleton while waiting.
  const [fast, medium, slow] = await Promise.all([
    fetch500ms(),
    fetch1000ms(),
    fetch1500ms(),
  ]);

  return (
    <Boundary label="with-loading/page.tsx" color="blue">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400">
            With loading.tsx
          </span>
          <p className="text-sm leading-6 text-gray-400">
            Same data fetching as before — still{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-300">
              Promise.all
            </code>{' '}
            waiting for all three. But{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-300">
              loading.tsx
            </code>{' '}
            showed a skeleton immediately so the page didn&apos;t feel blank.
            All cards still appear together at ~1500ms.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
          <DataCard label="Fast" delay={500} renderedAt={fast} color="green" />
          <DataCard label="Medium" delay={1000} renderedAt={medium} color="yellow" />
          <DataCard label="Slow" delay={1500} renderedAt={slow} color="red" />
        </div>
      </div>
    </Boundary>
  );
}

async function fetch500ms() {
  await new Promise((r) => setTimeout(r, 500));
  return new Date().toISOString();
}

async function fetch1000ms() {
  await new Promise((r) => setTimeout(r, 1000));
  return new Date().toISOString();
}

async function fetch1500ms() {
  await new Promise((r) => setTimeout(r, 1500));
  return new Date().toISOString();
}

function DataCard({
  label,
  delay,
  renderedAt,
  color,
}: {
  label: string;
  delay: number;
  renderedAt: string;
  color: 'green' | 'yellow' | 'red';
}) {
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
      <span className="font-mono text-xs text-gray-500 break-all">{renderedAt}</span>
    </div>
  );
}
