import { Boundary } from '#/ui/boundary';
import { RiskyButton } from './risky-button';

export default function Page() {
  return (
    <Boundary label="event-handler/page.tsx (Server Environment)">
      <div className="flex flex-col gap-6">
        <p className="text-sm leading-7 text-gray-300">
          Error boundaries only catch errors thrown{' '}
          <strong className="text-gray-100">during rendering</strong>. An error
          thrown inside an event handler (like{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            onClick
          </code>
          ) or async callback runs <em>after</em> render, so{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            error.tsx
          </code>{' '}
          won&apos;t see it. Catch it manually and store it in state.
        </p>

        <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-xs leading-6 text-gray-400">
{`'use client'
const [error, setError] = useState(null)

function handleClick() {
  try {
    // work that might fail
  } catch (reason) {
    setError(reason)   // update UI yourself
  }
}`}
        </pre>

        <Boundary
          label="risky-button.tsx (Client Environment)"
          color="orange"
          animateRerendering={false}
        >
          <RiskyButton />
        </Boundary>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-xs leading-6 text-gray-500">
            <span className="font-semibold text-gray-400">Note:</span> the
            exception here never reaches the error boundary — the button keeps
            working and the message comes from local state. (One exception:
            errors thrown inside{' '}
            <code className="font-mono text-gray-400">startTransition</code> from{' '}
            <code className="font-mono text-gray-400">useTransition</code>{' '}
            <em>do</em> bubble up to the nearest boundary.)
          </p>
        </div>
      </div>
    </Boundary>
  );
}
