'use client';

import { useState } from 'react';

// Receives `likes` as a prop from a Server Component.
// Props passed to Client Components must be serializable by React.
export function LikeButton({ likes }: { likes: number }) {
  const [liked, setLiked] = useState(false);
  const total = likes + (liked ? 1 : 0);

  return (
    <button
      onClick={() => setLiked((v) => !v)}
      className={`inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-semibold transition ${
        liked
          ? 'bg-pink-600 text-white hover:bg-pink-500'
          : 'bg-gray-700 text-gray-200 hover:bg-gray-600'
      }`}
    >
      <span>{liked ? '♥' : '♡'}</span>
      <span className="tabular-nums">{total}</span>
    </button>
  );
}
