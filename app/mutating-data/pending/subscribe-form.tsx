'use client';

import { useActionState } from 'react';
import { subscribe, type SubscribeState } from '../actions';

const initialState: SubscribeState = { status: 'idle', message: '' };

// useActionState wires a Server Function to a form and returns:
//   [state, formAction, pending]
// `pending` is true while the action runs — perfect for loading UI.
export function SubscribeForm() {
  const [state, formAction, pending] = useActionState(subscribe, initialState);

  return (
    <div className="flex flex-col gap-3">
      <form action={formAction} className="flex gap-2">
        <input
          type="email"
          name="email"
          placeholder="you@example.com"
          className="flex-1 rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-200 placeholder-gray-600 outline-none focus:border-gray-500"
        />
        <button
          type="submit"
          disabled={pending}
          className="inline-flex items-center gap-2 rounded-md bg-green-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-green-500 disabled:opacity-50"
        >
          {pending && (
            <span className="inline-block size-3 animate-spin rounded-full border border-white border-t-transparent" />
          )}
          {pending ? 'Subscribing…' : 'Subscribe'}
        </button>
      </form>

      {state.status !== 'idle' && (
        <p
          className={`text-sm ${
            state.status === 'success' ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {state.message}
        </p>
      )}
    </div>
  );
}
