'use client';

import { useState } from 'react';

export function DynamicCaller() {
  const [id, setId] = useState('42');
  const [res, setRes] = useState<string | null>(null);

  async function call() {
    const r = await fetch(
      `/route-handlers/api/item/${encodeURIComponent(id)}`,
    );
    setRes(JSON.stringify(await r.json(), null, 2));
  }

  return (
    <div className="flex flex-col gap-3 rounded-lg border border-violet-900/50 bg-violet-950/20 p-4">
      <span className="font-mono text-xs font-semibold text-violet-400">
        GET /route-handlers/api/item/<span className="text-gray-300">{id || '…'}</span>
      </span>
      <div className="flex gap-2">
        <input
          value={id}
          onChange={(e) => setId(e.target.value)}
          placeholder="id"
          className="w-32 rounded-md border border-gray-700 bg-gray-900 px-3 py-1.5 text-sm text-gray-200 outline-none focus:border-gray-500"
        />
        <button
          onClick={call}
          className="rounded-md bg-violet-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-violet-500"
        >
          Send GET
        </button>
      </div>
      {res && (
        <pre className="overflow-x-auto rounded bg-gray-950/60 p-3 font-mono text-xs text-green-300">
          {res}
        </pre>
      )}
    </div>
  );
}
