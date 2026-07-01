'use client';

import { useState } from 'react';

// When clicked, this re-renders with shouldThrow=true and throws DURING RENDER.
// That render error bubbles up to the nearest error boundary (error.tsx).
export function Buggy() {
  const [shouldThrow, setShouldThrow] = useState(false);

  if (shouldThrow) {
    throw new Error('Something went wrong while rendering <Buggy>.');
  }

  return (
    <button
      onClick={() => setShouldThrow(true)}
      className="self-start rounded-md bg-red-700 px-4 py-2 text-sm font-semibold text-red-50 transition hover:bg-red-600"
    >
      Trigger a render error
    </button>
  );
}
