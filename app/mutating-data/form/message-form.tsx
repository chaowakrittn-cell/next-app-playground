'use client';

import { useEffect, useRef, useState } from 'react';
import { useFormStatus } from 'react-dom';
import { createMessage } from '../actions';

// A Client Component form. It still passes the Server Function to `action`, but
// now we can read the submission state with useFormStatus to prove — via UI
// state — that clicking fires a network request (a POST to this route).
export function MessageForm() {
  return (
    <form action={createMessage} className="flex flex-col gap-3">
      <div className="flex gap-2">
        <input
          type="text"
          name="text"
          placeholder="Type a message and submit…"
          required
          className="flex-1 rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-200 placeholder-gray-600 outline-none focus:border-gray-500"
        />
        <SubmitButton />
      </div>
      {/* Must live inside <form> so useFormStatus can read its status. */}
      <RequestStatus />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      type="submit"
      disabled={pending}
      className="inline-flex items-center gap-2 rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-50"
    >
      {pending && (
        <span className="inline-block size-3 animate-spin rounded-full border border-white border-t-transparent" />
      )}
      {pending ? 'Sending…' : 'Add'}
    </button>
  );
}

function RequestStatus() {
  const { pending } = useFormStatus();
  const [requestCount, setRequestCount] = useState(0);
  const wasPending = useRef(false);

  // Count each time a submission starts (pending flips false → true).
  useEffect(() => {
    if (pending && !wasPending.current) {
      setRequestCount((c) => c + 1);
    }
    wasPending.current = pending;
  }, [pending]);

  return (
    <div className="flex items-center justify-between rounded-md border border-gray-800 bg-gray-950/60 px-3 py-2 text-xs">
      <span className="font-mono text-gray-500">
        pending:{' '}
        <code className={pending ? 'text-amber-400' : 'text-gray-400'}>
          {String(pending)}
        </code>
      </span>
      <span className="font-mono text-gray-500">
        POST requests sent:{' '}
        <code className="tabular-nums text-blue-400">{requestCount}</code>
      </span>
    </div>
  );
}
