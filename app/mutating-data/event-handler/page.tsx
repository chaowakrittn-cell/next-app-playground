import { Boundary } from '#/ui/boundary';
import { connection } from 'next/server';
import { getLikes } from '../store';
import { LikeButton } from './like-button';

export const instant = false;

export default async function Page() {
  await connection();
  const likes = getLikes();

  return (
    <Boundary label="event-handler/page.tsx (Server Environment)">
      <div className="flex flex-col gap-6">
        <p className="text-sm leading-7 text-gray-300">
          Outside of a form, you can invoke a Server Function from an event
          handler like{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            onClick
          </code>
          . The function runs on the server; here it returns the new like count,
          which the Client Component uses to update state. Wrapping it in{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            useTransition
          </code>{' '}
          gives a pending flag.
        </p>

        <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-xs leading-6 text-gray-400">
{`'use client'
import { likePost } from '../actions'

<button onClick={() =>
  startTransition(async () => {
    const updated = await likePost()  // Server Function
    setLikes(updated)
  })
}>Like</button>`}
        </pre>

        <Boundary
          label="like-button.tsx (Client Environment)"
          color="violet"
          animateRerendering={false}
        >
          <LikeButton initialLikes={likes} />
        </Boundary>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-xs leading-6 text-gray-500">
            The initial count is read on the server and passed as a prop. Each
            click POSTs to the Server Function and updates from its return value.
            Reload the page — the count persists (it lives in the server store).
          </p>
        </div>
      </div>
    </Boundary>
  );
}
