'use client';

import { useState } from 'react';

export function TestInput() {
  const [value, setValue] = useState('');

  return (
    <div className="flex flex-col gap-4">
      <textarea
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type anything here..."
        rows={6}
        className="w-full rounded-lg border border-gray-700 bg-gray-900 px-4 py-3 font-mono text-sm text-gray-200 placeholder-gray-600 outline-none focus:border-gray-500 focus:ring-1 focus:ring-gray-500 resize-y"
      />
      {value && (
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 px-4 py-3">
          <p className="mb-1 text-xs font-medium uppercase tracking-wider text-gray-500">
            Input
          </p>
          <pre className="whitespace-pre-wrap break-all font-mono text-sm text-gray-300">
            {value}
          </pre>
        </div>
      )}
    </div>
  );
}
