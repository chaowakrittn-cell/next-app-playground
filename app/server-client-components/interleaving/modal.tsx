'use client';

import { useState } from 'react';

// A Client Component that uses state to toggle visibility.
// It renders `children` in a "slot" — those children can be Server Components.
export function Modal({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={() => setOpen((v) => !v)}
        className="self-start rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-blue-500"
      >
        {open ? 'Hide cart' : 'View cart'}
      </button>

      {open && (
        <div className="rounded-lg border border-gray-700 bg-gray-950/60 p-4">
          {children}
        </div>
      )}
    </div>
  );
}
