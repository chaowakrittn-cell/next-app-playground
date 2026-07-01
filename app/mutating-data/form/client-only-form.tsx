'use client';

import { useState } from 'react';

// A purely client-side form: submitting updates local useState only. It never
// calls a Server Function, so no network request is made — and the messages
// live only in the browser, disappearing on reload or navigation.
export function ClientOnlyForm() {
  const [messages, setMessages] = useState<string[]>([
    'This list lives only in the browser.',
  ]);
  const [submitCount, setSubmitCount] = useState(0);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    // Prevent the browser's default submit — everything stays on the client.
    event.preventDefault();
    const form = event.currentTarget;
    const text = String(new FormData(form).get('text') ?? '').trim();
    if (!text) return;

    setMessages((prev) => [...prev, text]);
    setSubmitCount((c) => c + 1);
    form.reset();
  }

  return (
    <div className="flex flex-col gap-3">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <div className="flex gap-2">
          <input
            type="text"
            name="text"
            placeholder="Type a message and submit…"
            required
            className="flex-1 rounded-md border border-gray-700 bg-gray-900 px-3 py-2 text-sm text-gray-200 placeholder-gray-600 outline-none focus:border-gray-500"
          />
          <button
            type="submit"
            className="rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-500"
          >
            Add
          </button>
        </div>
        <div className="flex items-center justify-between rounded-md border border-gray-800 bg-gray-950/60 px-3 py-2 text-xs">
          <span className="font-mono text-gray-500">
            network requests:{' '}
            <code className="text-orange-400">0</code>
          </span>
          <span className="font-mono text-gray-500">
            submits handled on client:{' '}
            <code className="tabular-nums text-orange-400">{submitCount}</code>
          </span>
        </div>
      </form>

      <div className="flex flex-col gap-2">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-gray-400">
          Messages ({messages.length})
        </span>
        <ul className="flex flex-col gap-2">
          {messages.map((text, i) => (
            <li
              key={i}
              className="rounded-lg border border-gray-800 bg-gray-900/30 px-4 py-3 text-sm text-gray-300"
            >
              {text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
