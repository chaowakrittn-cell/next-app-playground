import { Boundary } from '#/ui/boundary';
import { connection } from 'next/server';
import { getPosts } from '../posts';

export const instant = false;

// The whole page awaits its data. Because a loading.tsx sits next to it,
// Next.js shows that fallback for the entire route while this renders.
export default async function Page() {
  await connection();
  const posts = await getPosts(1500);

  return (
    <Boundary label="with-loading/page.tsx (Server Environment)" color="blue">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400">
            Blog (streamed via loading.js)
          </span>
          <p className="text-xs text-gray-500">
            The page awaited all posts (~1.5s). You saw the full-page skeleton
            from <code className="font-mono text-blue-400">loading.tsx</code>{' '}
            until everything was ready, then it swapped in at once.
          </p>
        </div>
        <ul className="flex flex-col gap-2">
          {posts.map((post) => (
            <li
              key={post.id}
              className="rounded-lg border border-gray-800 bg-gray-900/30 px-4 py-3"
            >
              <p className="text-sm font-semibold text-gray-200">{post.title}</p>
              <p className="text-xs text-gray-500">{post.excerpt}</p>
            </li>
          ))}
        </ul>
      </div>
    </Boundary>
  );
}
