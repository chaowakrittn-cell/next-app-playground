import { Boundary } from '#/ui/boundary';
import { connection } from 'next/server';

// Intentionally blocks prerendering — this is the point of the demo.
export const instant = false;

export default async function Page() {
  // Opts into dynamic rendering — Next.js will not prerender this page.
  await connection();
  // Artificial delay to make the server wait observable during navigation.
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const renderedAt = new Date().toISOString();
  console.log('[dynamic] rendered at', renderedAt);

  return (
    <Boundary label="dynamic/page.tsx" color="pink">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-pink-400">
            Dynamic Rendering
          </span>
          <p className="text-sm leading-6 text-gray-400">
            This page calls{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-300">
              connection()
            </code>{' '}
            which opts into dynamic rendering. Next.js runs this page on the
            server for <strong className="text-gray-300">every request</strong>{' '}
            — notice the ~1s delay when navigating here.
          </p>
        </div>

        <div className="flex flex-col gap-2 rounded-lg border border-pink-900/50 bg-pink-950/20 p-4">
          <span className="text-xs text-gray-500">Rendered at</span>
          <span className="font-mono text-sm text-pink-300">{renderedAt}</span>
          <span className="text-xs text-gray-600">
            Navigate away and come back — this timestamp updates on every visit
            because the page is re-rendered per request.
          </span>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <p className="font-mono text-xs text-gray-500">
            <span className="text-gray-400">Check your terminal</span> — you
            will see{' '}
            <code className="text-pink-400">[dynamic] rendered at: …</code>{' '}
            logged <strong className="text-gray-300">every time</strong> you
            navigate to this page. Each visit triggers a fresh server render.
          </p>
        </div>
      </div>
    </Boundary>
  );
}
