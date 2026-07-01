'use client';

import { useActionState } from 'react';
import { createPost, type FormState } from './actions';

const initialState: FormState = { message: '' };

export function Form() {
  const [state, formAction, pending] = useActionState(createPost, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-3">
      <input
        type="text"
        name="title"
        placeholder="Post title (try &lt; 3 chars, or 'error')"
        className="rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-200 placeholder-gray-600 outline-none focus:border-gray-500"
      />
      <button
        type="submit"
        disabled={pending}
        className="inline-flex items-center justify-center gap-2 self-start rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500 disabled:opacity-50"
      >
        {pending && (
          <span className="inline-block size-3 animate-spin rounded-full border border-white border-t-transparent" />
        )}
        {pending ? 'Creating…' : 'Create Post'}
      </button>

      {/* The returned state carries the expected error (or success) message. */}
      {state.message && (
        <p
          aria-live="polite"
          className={`text-sm ${state.ok ? 'text-green-400' : 'text-red-400'}`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
