'use client';

import { useState } from 'react';

export function RiskyButton() {
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);

  function handleClick() {
    setError(null);
    setDone(false);
    try {
      // Work that might fail. An error thrown HERE (in an event handler) is
      // NOT caught by error.tsx — event handlers run after rendering.
      if (Math.random() < 0.5) {
        throw new Error('The operation failed (simulated).');
      }
      setDone(true);
    } catch (reason) {
      // So we catch it manually and store it in state to update the UI.
      setError(reason instanceof Error ? reason.message : String(reason));
    }
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={handleClick}
        className="self-start rounded-md bg-orange-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-orange-500"
      >
        Run risky action (~50% fails)
      </button>
      {error && <p className="text-sm text-red-400">Error: {error}</p>}
      {done && <p className="text-sm text-green-400">Success!</p>}
    </div>
  );
}
