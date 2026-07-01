import { Boundary } from '#/ui/boundary';
import { connection } from 'next/server';
import { removeMessage } from '../actions';
import { getMessages } from '../store';
import { ClientOnlyForm } from './client-only-form';
import { MessageForm } from './message-form';

// Dynamic so the list always reflects the current in-memory store.
export const instant = false;

export default async function Page() {
  await connection();
  const messages = getMessages();

  return (
    <Boundary label="form/page.tsx (Server Environment)">
      <div className="flex flex-col gap-6">
        <p className="text-sm leading-7 text-gray-300">
          React extends{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            &lt;form&gt;
          </code>{' '}
          so you can pass a Server Function to the{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            action
          </code>{' '}
          prop. On submit the function runs on the server and receives the{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            FormData
          </code>{' '}
          automatically — no{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            onSubmit
          </code>
          , no manual fetch. This form works even before JavaScript loads
          (progressive enhancement).
        </p>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-blue-400">
            1. Server Action form
          </span>
          <span className="text-xs text-gray-500">
            Submits to a Server Function → fires a POST, persists in the server
            store.
          </span>
        </div>

        {/* Client form: the action still runs on the server, but useFormStatus
            lets us surface the in-flight request as UI state. */}
        <Boundary
          label="message-form.tsx (Client Environment)"
          color="blue"
          animateRerendering={false}
        >
          <MessageForm />
        </Boundary>

        <div className="flex flex-col gap-2">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-gray-400">
            Messages ({messages.length})
          </span>
          <ul className="flex flex-col gap-2">
            {messages.map((message) => (
              <li
                key={message.id}
                className="flex items-center justify-between gap-3 rounded-lg border border-gray-800 bg-gray-900/30 px-4 py-3"
              >
                <span className="text-sm text-gray-300">{message.text}</span>
                {/* A second form whose action deletes this message. */}
                <form action={removeMessage}>
                  <input type="hidden" name="id" value={message.id} />
                  <button
                    type="submit"
                    className="rounded-md bg-gray-800 px-2.5 py-1 text-xs font-semibold text-gray-400 transition hover:bg-red-900/50 hover:text-red-300"
                  >
                    Delete
                  </button>
                </form>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-xs leading-6 text-gray-500">
            <span className="font-semibold text-gray-400">
              Watch the Network tab:
            </span>{' '}
            each submit fires a{' '}
            <code className="font-mono text-gray-400">POST</code> to{' '}
            <code className="font-mono text-gray-400">/mutating-data/form</code>{' '}
            (the current route) — that&apos;s the Server Function being invoked.
            The <code className="font-mono text-amber-400">pending</code> flag
            and request counter above are driven by{' '}
            <code className="font-mono text-gray-400">useFormStatus</code> while
            that request is in flight. Afterwards the action calls{' '}
            <code className="font-mono text-gray-400">
              revalidatePath
            </code>{' '}
            so the list re-renders. State is in-memory — it resets when the dev
            server restarts.
          </p>
        </div>

        <div className="mt-2 flex flex-col gap-1 border-t border-gray-800 pt-6">
          <span className="text-sm font-semibold text-orange-400">
            2. Client-only form (for comparison)
          </span>
          <span className="text-xs text-gray-500">
            Handles submit with{' '}
            <code className="font-mono text-gray-400">onSubmit</code> +{' '}
            <code className="font-mono text-gray-400">useState</code> — no
            Server Function, no request at all.
          </span>
        </div>

        <Boundary
          label="client-only-form.tsx (Client Environment)"
          color="orange"
          animateRerendering={false}
        >
          <ClientOnlyForm />
        </Boundary>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-xs leading-6 text-gray-500">
            <span className="font-semibold text-gray-400">
              Compare the two:
            </span>{' '}
            submitting the client-only form fires{' '}
            <strong className="text-gray-300">no network request</strong> — it
            calls <code className="font-mono text-gray-400">event.preventDefault()</code>{' '}
            and only updates local{' '}
            <code className="font-mono text-gray-400">useState</code>. That&apos;s
            fine for ephemeral UI state, but the data is{' '}
            <strong className="text-gray-300">lost on reload</strong> and never
            reaches the server. The Server Action form above persists because it
            actually POSTs to the server.
          </p>
        </div>
      </div>
    </Boundary>
  );
}
