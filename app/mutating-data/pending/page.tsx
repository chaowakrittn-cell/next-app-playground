import { Boundary } from '#/ui/boundary';
import { SubscribeForm } from './subscribe-form';

export default function Page() {
  return (
    <Boundary label="pending/page.tsx (Server Environment)">
      <div className="flex flex-col gap-6">
        <p className="text-sm leading-7 text-gray-300">
          While a Server Function runs, show a loading indicator with React&apos;s{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            useActionState
          </code>{' '}
          hook. It returns{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            [state, formAction, pending]
          </code>{' '}
          — the <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">state</code>{' '}
          is whatever the action returns, and{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            pending
          </code>{' '}
          is true while it&apos;s in flight.
        </p>

        <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-xs leading-6 text-gray-400">
{`'use client'
const [state, formAction, pending] = useActionState(subscribe, initialState)

<form action={formAction}>
  <input name="email" />
  <button disabled={pending}>{pending ? 'Subscribing…' : 'Subscribe'}</button>
</form>`}
        </pre>

        <Boundary
          label="subscribe-form.tsx (Client Environment)"
          color="cyan"
          animateRerendering={false}
        >
          <SubscribeForm />
        </Boundary>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-xs leading-6 text-gray-500">
            <span className="font-semibold text-gray-400">Try it:</span> submit
            with and without a valid email. The action takes ~1s (watch the
            spinner and the disabled button), then returns a{' '}
            <code className="font-mono text-gray-400">state</code> object with a
            success or error message.
          </p>
        </div>
      </div>
    </Boundary>
  );
}
