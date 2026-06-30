'use client';

import { useTheme } from './theme-provider';

// A Client Component that consumes the context.
export function ThemedBox() {
  const { theme, toggle } = useTheme();
  const isDark = theme === 'dark';

  return (
    <div
      className={`flex items-center justify-between rounded-lg border p-4 transition ${
        isDark
          ? 'border-gray-700 bg-gray-950 text-gray-200'
          : 'border-gray-300 bg-gray-100 text-gray-900'
      }`}
    >
      <span className="text-sm font-semibold">
        Current theme:{' '}
        <code className="font-mono">{theme}</code>
      </span>
      <button
        onClick={toggle}
        className={`rounded-md px-3 py-1.5 text-sm font-semibold transition ${
          isDark
            ? 'bg-gray-700 text-gray-100 hover:bg-gray-600'
            : 'bg-gray-900 text-white hover:bg-gray-700'
        }`}
      >
        Toggle theme
      </button>
    </div>
  );
}
