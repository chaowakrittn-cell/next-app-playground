'use client';

import { useState } from 'react';

const TEXT =
  'Web fonts change text metrics as they load. If the fallback font takes up a different amount of space, everything below it jumps when the real font arrives.';

function Panel({
  title,
  loadingFont,
  loadedFont,
  loaded,
  warn,
}: {
  title: string;
  loadingFont: string;
  loadedFont: string;
  loaded: boolean;
  warn?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <span
        className={`font-mono text-xs font-semibold ${
          warn ? 'text-red-400' : 'text-green-400'
        }`}
      >
        {title}
      </span>
      <div className="w-full max-w-[260px] rounded-lg border border-gray-800 bg-gray-900/40 p-3">
        <p
          className="text-sm text-gray-200"
          style={{ fontFamily: loaded ? loadedFont : loadingFont }}
        >
          {TEXT}
        </p>
        {/* Marker sits directly below the text — watch it move (or not). */}
        <div
          className={`mt-2 flex items-center gap-2 rounded px-2 py-1 text-[10px] font-semibold ${
            warn ? 'bg-red-900/40 text-red-300' : 'bg-green-900/40 text-green-300'
          }`}
        >
          ▲ content below the text starts here
        </div>
      </div>
      <span className="font-mono text-[11px] text-gray-500">
        {loaded ? loadedFont : `${loadingFont} (fallback)`}
      </span>
    </div>
  );
}

export function LayoutShiftDemo() {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className="flex flex-col gap-4">
      <button
        onClick={() => setLoaded((v) => !v)}
        className="self-start rounded-md bg-blue-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-blue-500"
      >
        {loaded ? '↩ Reset (font loading)' : '▶ Simulate font loaded'}
      </button>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Fallback metrics differ from the target → the marker jumps. */}
        <Panel
          title="Mismatched fallback → layout shift"
          loadingFont="monospace"
          loadedFont="Georgia, serif"
          loaded={loaded}
          warn
        />
        {/* Fallback metrics match the target → the marker stays put. */}
        <Panel
          title="Matched metrics → no shift (what next/font does)"
          loadingFont="Arial, sans-serif"
          loadedFont="Helvetica, Arial, sans-serif"
          loaded={loaded}
        />
      </div>

      <p className="text-xs leading-6 text-gray-500">
        Click the button to simulate the web font arriving. On the left, the
        fallback (<code className="font-mono text-gray-400">monospace</code>)
        has very different metrics from the target, so the text reflows and the
        marker <strong className="text-red-300">jumps</strong>. On the right the
        metrics match, so nothing moves. next/font generates a metric-matched
        fallback for you automatically — that&apos;s how it guarantees the
        right-hand behavior.
      </p>
    </div>
  );
}
