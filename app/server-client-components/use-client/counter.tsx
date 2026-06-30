'use client';

import { useState } from 'react';

export function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-sm tabular-nums text-gray-300">
        {count} likes
      </span>
      <button
        onClick={() => setCount(count + 1)}
        className="rounded-md bg-blue-600 px-3 py-1 text-sm font-semibold text-white transition hover:bg-blue-500"
      >
        Click me
      </button>
    </div>
  );
}
