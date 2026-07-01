'use client';

import { useState } from 'react';

export function HeadersCaller() {
  const [res, setRes] = useState<string | null>(null);

  async function call() {
    const r = await fetch('/proxy/api/headers');
    setRes(JSON.stringify(await r.json(), null, 2));
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-blue-900/50 bg-blue-950/20 p-4">
      <span className="font-mono text-xs font-semibold text-blue-400">
        GET /proxy/api/headers
      </span>
      <button
        onClick={call}
        className="self-start rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-500"
      >
        Call the endpoint
      </button>
      {res && (
        <pre className="overflow-x-auto rounded bg-gray-950/60 p-3 font-mono text-xs text-green-300">
          {res}
        </pre>
      )}
      <span className="text-xs text-gray-500">
        The <code className="font-mono text-gray-400">x-proxy-demo</code> value
        was added by <code className="font-mono text-gray-400">proxy.ts</code>{' '}
        before the request reached the route handler — the app never set it.
      </span>
    </div>
  );
}
