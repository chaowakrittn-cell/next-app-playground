'use client';

import Link, { useLinkStatus } from 'next/link';

const TARGET = '/prefetching/link-status/target';

// Spinner shown inside the Link so useLinkStatus can be called correctly.
function Spinner({ debounce = false }: { debounce?: boolean }) {
  const { pending } = useLinkStatus();
  if (!pending) return null;
  return (
    <span
      style={
        debounce
          ? {
              // Start invisible. CSS animation fades in after 150ms.
              // If navigation finishes before 150ms, the spinner never appears.
              opacity: 0,
              animation: 'fadeIn 0ms ease 150ms forwards',
            }
          : undefined
      }
      className="ml-2 inline-block h-3 w-3 animate-spin rounded-full border border-current border-t-transparent"
    />
  );
}

export function PlainLink() {
  return (
    <Link
      href={TARGET}
      className="inline-flex items-center justify-center rounded-md bg-gray-700 px-4 py-2 text-sm font-semibold text-gray-200 transition hover:bg-gray-600"
    >
      Navigate
    </Link>
  );
}

export function LinkWithStatus() {
  return (
    <Link
      href={TARGET}
      className="inline-flex items-center justify-center rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
    >
      Navigate
      <Spinner />
    </Link>
  );
}

export function LinkWithDebounce() {
  return (
    <>
      <style>{`@keyframes fadeIn { to { opacity: 1; } }`}</style>
      <Link
        href={TARGET}
        className="inline-flex items-center justify-center rounded-md bg-violet-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-violet-600"
      >
        Navigate
        <Spinner debounce />
      </Link>
    </>
  );
}
