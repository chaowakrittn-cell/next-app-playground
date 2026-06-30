import { Boundary } from '#/ui/boundary';
import { connection } from 'next/server';

export const instant = false;

// Dynamic page with loading.tsx — the loading skeleton is prefetched.
// Clicking shows the skeleton immediately, content streams in after server responds.
export default async function Page() {
  await connection();
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const renderedAt = new Date().toISOString();

  return (
    <Boundary label="dynamic-with-loading/page.tsx" color="violet">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-violet-400">
            Dynamic Route + loading.tsx — partial prefetch
          </span>
          <p className="text-sm leading-6 text-gray-400">
            This page is dynamic, but because{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-300">
              loading.tsx
            </code>{' '}
            exists, Next.js prefetches the loading skeleton. Clicking felt
            instant — the skeleton appeared immediately while the server
            prepared this content.
          </p>
        </div>

        <div className="flex flex-col gap-2 rounded-lg border border-violet-900/50 bg-violet-950/20 p-4">
          <span className="text-xs text-gray-500">Rendered at (request time)</span>
          <span className="font-mono text-sm text-violet-300">{renderedAt}</span>
          <span className="text-xs text-gray-600">
            Fresh every visit — but unlike the plain dynamic route, you saw a
            skeleton placeholder immediately instead of a blank screen.
          </span>
        </div>
      </div>
    </Boundary>
  );
}
