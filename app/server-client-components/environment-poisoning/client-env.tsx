'use client';

// Reads env vars in the browser. Next.js inlines these values at build time:
//   - NEXT_PUBLIC_* → replaced with the real value
//   - anything else → replaced with an empty string (stripped from the bundle)
export function ClientEnv() {
  // Must reference process.env.X literally so Next.js can statically replace it.
  const secret = process.env.SECRET_SERVER_VALUE;
  const publicValue = process.env.NEXT_PUBLIC_DEMO_VALUE;

  return (
    <div className="flex flex-col gap-3">
      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400">
        client-env.tsx (Client Environment)
      </span>
      <dl className="flex flex-col gap-2 text-sm">
        <div className="flex items-center justify-between gap-4">
          <dt className="font-mono text-xs text-gray-400">
            SECRET_SERVER_VALUE
          </dt>
          <dd className="font-mono text-xs text-pink-400">
            {secret ? secret : '"" (stripped)'}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-4">
          <dt className="font-mono text-xs text-gray-400">
            NEXT_PUBLIC_DEMO_VALUE
          </dt>
          <dd className="font-mono text-xs text-green-400">
            {publicValue ? publicValue : '"" (not set)'}
          </dd>
        </div>
      </dl>
      <p className="text-xs text-gray-500">
        The secret came back empty — Next.js stripped it from the client bundle.
        Only the{' '}
        <code className="font-mono text-green-400">NEXT_PUBLIC_</code> value
        survives in the browser.
      </p>
    </div>
  );
}
