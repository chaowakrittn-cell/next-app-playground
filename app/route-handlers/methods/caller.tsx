'use client';

import { useState } from 'react';

export function MethodsCaller() {
  const [msg, setMsg] = useState('hello');
  const [getRes, setGetRes] = useState<string | null>(null);
  const [body, setBody] = useState('{ "name": "Ada" }');
  const [postRes, setPostRes] = useState<string | null>(null);

  async function callGet() {
    const res = await fetch(
      `/route-handlers/api/echo?msg=${encodeURIComponent(msg)}`,
    );
    setGetRes(JSON.stringify(await res.json(), null, 2));
  }

  async function callPost() {
    const res = await fetch('/route-handlers/api/echo', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body,
    });
    setPostRes(JSON.stringify(await res.json(), null, 2));
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div className="flex flex-col gap-2 rounded-lg border border-blue-900/50 bg-blue-950/20 p-4">
        <span className="font-mono text-xs font-semibold text-blue-400">
          GET /route-handlers/api/echo?msg=…
        </span>
        <div className="flex gap-2">
          <input
            value={msg}
            onChange={(e) => setMsg(e.target.value)}
            className="flex-1 rounded-md border border-gray-700 bg-gray-900 px-3 py-1.5 text-sm text-gray-200 outline-none focus:border-gray-500"
          />
          <button
            onClick={callGet}
            className="rounded-md bg-blue-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-blue-500"
          >
            Send GET
          </button>
        </div>
        {getRes && (
          <pre className="overflow-x-auto rounded bg-gray-950/60 p-3 font-mono text-xs text-green-300">
            {getRes}
          </pre>
        )}
      </div>

      <div className="flex flex-col gap-2 rounded-lg border border-violet-900/50 bg-violet-950/20 p-4">
        <span className="font-mono text-xs font-semibold text-violet-400">
          POST /route-handlers/api/echo (JSON body)
        </span>
        <textarea
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={2}
          className="rounded-md border border-gray-700 bg-gray-900 px-3 py-1.5 font-mono text-xs text-gray-200 outline-none focus:border-gray-500"
        />
        <button
          onClick={callPost}
          className="self-start rounded-md bg-violet-600 px-3 py-1.5 text-sm font-semibold text-white hover:bg-violet-500"
        >
          Send POST
        </button>
        {postRes && (
          <pre className="overflow-x-auto rounded bg-gray-950/60 p-3 font-mono text-xs text-green-300">
            {postRes}
          </pre>
        )}
      </div>
    </div>
  );
}
