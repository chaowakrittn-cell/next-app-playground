'use client';

import { useState, useTransition } from 'react';
import { likePost } from '../actions';

// A Client Component invokes a Server Function from an event handler, then uses
// the returned value to update local state.
export function LikeButton({ initialLikes }: { initialLikes: number }) {
  const [likes, setLikes] = useState(initialLikes);
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex items-center gap-4">
      <span className="font-mono text-sm tabular-nums text-gray-300">
        {likes} likes
      </span>
      <button
        onClick={() =>
          startTransition(async () => {
            const updated = await likePost();
            setLikes(updated);
          })
        }
        disabled={isPending}
        className="inline-flex items-center gap-2 rounded-md bg-violet-600 px-3 py-1.5 text-sm font-semibold text-white transition hover:bg-violet-500 disabled:opacity-50"
      >
        {isPending ? 'Liking…' : '♥ Like'}
      </button>
    </div>
  );
}
