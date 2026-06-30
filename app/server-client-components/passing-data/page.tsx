import { Boundary } from '#/ui/boundary';
import db from '#/lib/db';
import { LikeButton } from './like-button';

export default function Page() {
  // Data is fetched on the server, close to the source.
  const product = db.product.find({ where: { id: '1' } });
  const likes = Math.round((product?.price ?? 0) * 3);

  return (
    <Boundary label="passing-data/page.tsx (Server Environment)">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <p className="text-sm leading-7 text-gray-300">
            A Server Component fetches data close to the source, then passes it
            to a Client Component using <strong className="text-gray-100">props</strong>.
            The fetching and any secrets stay on the server; only the resulting
            data crosses the boundary.
          </p>
          <p className="rounded-lg border border-gray-800 bg-gray-900/50 px-4 py-3 text-sm text-gray-500">
            <span className="font-semibold text-gray-400">Good to know:</span>{' '}
            Props passed to Client Components must be{' '}
            <strong className="text-gray-300">serializable</strong> by React —
            you can&apos;t pass functions, class instances, or Dates that
            aren&apos;t serialized.
          </p>
        </div>

        <Boundary
          label="like-button.tsx (Client Environment)"
          color="blue"
          animateRerendering={false}
        >
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-gray-200">
                  {product?.name}
                </span>
                <span className="font-mono text-xs text-gray-500">
                  likes fetched on the server: {likes}
                </span>
              </div>
              <LikeButton likes={likes} />
            </div>
            <p className="text-xs text-gray-500">
              The initial count came from the server as a prop. Clicking is
              handled entirely on the client.
            </p>
          </div>
        </Boundary>
      </div>
    </Boundary>
  );
}
