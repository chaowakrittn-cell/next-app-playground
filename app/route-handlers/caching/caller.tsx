'use client';

import { useState } from 'react';

function Card({
  title,
  color,
  endpoint,
  hint,
}: {
  title: string;
  color: string;
  endpoint: string;
  hint: string;
}) {
  const [log, setLog] = useState<string[]>([]);

  async function call() {
    const r = await fetch(endpoint);
    const data = await r.json();
    setLog((prev) => [JSON.stringify(data), ...prev].slice(0, 4));
  }

  return (
    <div className={`flex flex-col gap-2 rounded-lg border p-4 ${color}`}>
      <span className="font-mono text-xs font-semibold">{title}</span>
      <span className="font-mono text-[11px] text-gray-500 break-all">
        {endpoint}
      </span>
      <button
        onClick={call}
        className="self-start rounded-md bg-gray-700 px-3 py-1.5 text-xs font-semibold text-gray-100 hover:bg-gray-600"
      >
        Call twice &amp; compare
      </button>
      {log.length > 0 && (
        <div className="flex flex-col gap-1">
          {log.map((l, i) => (
            <code
              key={i}
              className="block overflow-x-auto rounded bg-gray-950/60 px-2 py-1 font-mono text-[11px] text-green-300"
            >
              {l}
            </code>
          ))}
        </div>
      )}
      <span className="text-xs text-gray-500">{hint}</span>
    </div>
  );
}

export function CachingCaller() {
  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
      <Card
        title="Static GET"
        color="border-blue-900/50 bg-blue-950/20 text-blue-400"
        endpoint="/route-handlers/api/info"
        hint="Fixed data → prerendered. Every call is identical."
      />
      <Card
        title="Dynamic GET"
        color="border-pink-900/50 bg-pink-950/20 text-pink-400"
        endpoint="/route-handlers/api/random"
        hint="Math.random() → request-time. Changes every call."
      />
      <Card
        title="Runtime GET"
        color="border-orange-900/50 bg-orange-950/20 text-orange-400"
        endpoint="/route-handlers/api/user-agent"
        hint="headers() → reflects your own request."
      />
    </div>
  );
}
