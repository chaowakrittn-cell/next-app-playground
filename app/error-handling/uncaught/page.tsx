import { Boundary } from '#/ui/boundary';
import { Buggy } from './buggy';

export default function Page() {
  return (
    <Boundary label="uncaught/page.tsx (Server Environment)">
      <div className="flex flex-col gap-6">
        <p className="text-sm leading-7 text-gray-300">
          Unexpected bugs should be <strong className="text-gray-100">thrown</strong>.
          An{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            error.tsx
          </code>{' '}
          file in the route segment creates an error boundary that catches the
          error, shows a fallback UI, and offers a{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            reset()
          </code>{' '}
          to retry. Errors bubble up to the nearest boundary, so you can place
          them at different levels of the route tree.
        </p>

        <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-xs leading-6 text-gray-400">
{`// error.tsx — must be a Client Component
'use client'

export default function Error({ error, reset }) {
  return (
    <div>
      <h2>Something went wrong!</h2>
      <button onClick={() => reset()}>Try again</button>
    </div>
  )
}`}
        </pre>

        <div className="flex flex-col gap-2 rounded-lg border border-gray-800 bg-gray-900/50 p-5">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-gray-400">
            Live
          </span>
          <p className="text-xs text-gray-500">
            Click the button. It throws during render → this whole area is
            replaced by the fallback from{' '}
            <code className="font-mono text-gray-400">uncaught/error.tsx</code>.
            The tabs above stay put (the boundary only wraps this segment). Then{' '}
            <em>Try again</em> resets and restores it.
          </p>
          <Buggy />
        </div>
      </div>
    </Boundary>
  );
}
