'use client'; // Error boundaries must be Client Components

import { Boundary } from '#/ui/boundary';
import { useEffect } from 'react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log to your error reporting service here.
    console.error('[error.tsx] caught:', error);
  }, [error]);

  return (
    <Boundary label="uncaught/error.tsx (Client Environment)" color="red">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="text-lg font-semibold text-red-300">
            Something went wrong!
          </h2>
          <p className="font-mono text-sm text-gray-500">{error.message}</p>
        </div>
        <button
          onClick={() => reset()}
          className="self-start rounded-md bg-gray-700 px-4 py-2 text-sm font-semibold text-gray-100 transition hover:bg-gray-500"
        >
          Try again
        </button>
      </div>
    </Boundary>
  );
}
