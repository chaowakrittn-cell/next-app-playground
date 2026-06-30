import { Boundary } from '#/ui/boundary';
import db from '#/lib/db';

// A Server Component is an async function — you await your data directly.
// This one uses the project's mock ORM (db), but the fetch API works the
// same way: `const res = await fetch(...)`.
export default async function Page() {
  const products = db.product.findMany({ limit: 5 });

  return (
    <Boundary label="page.tsx (Server Environment)">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="text-sm leading-7 text-gray-300">
            You can fetch data in Server Components using any asynchronous I/O —
            the <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">fetch</code>{' '}
            API or an ORM / database client. Turn the component into an{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">async</code>{' '}
            function and await the call.
          </p>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs font-semibold text-gray-400">
                With the fetch API
              </span>
              <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-3 font-mono text-xs leading-6 text-gray-400">
{`export default async function Page() {
  const res = await fetch('https://…/blog')
  const posts = await res.json()
  return <ul>{/* … */}</ul>
}`}
              </pre>
            </div>
            <div className="flex flex-col gap-2">
              <span className="font-mono text-xs font-semibold text-gray-400">
                With an ORM / database
              </span>
              <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-3 font-mono text-xs leading-6 text-gray-400">
{`import db from '#/lib/db'

export default async function Page() {
  const products = db.product.findMany()
  return <ul>{/* … */}</ul>
}`}
              </pre>
            </div>
          </div>

          <ul className="flex flex-col gap-2 rounded-lg border border-gray-800 bg-gray-900/50 p-4 text-xs leading-6 text-gray-500">
            <li>
              <span className="text-gray-400">Credentials stay server-side</span>{' '}
              — query logic and secrets never reach the client bundle.
            </li>
            <li>
              <span className="text-gray-400">Identical fetches are memoized</span>{' '}
              — fetch where the data is needed instead of prop-drilling.
            </li>
            <li>
              <span className="text-gray-400">Uncached fetches block render</span>{' '}
              — wrap slow ones in{' '}
              <code className="font-mono text-gray-400">&lt;Suspense&gt;</code>{' '}
              to stream (see the Streaming item).
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <span className="font-mono text-xs font-semibold uppercase tracking-wider text-gray-400">
            Live: fetched from the db on the server
          </span>
          <ul className="flex flex-col gap-2">
            {products.map((product) => (
              <li
                key={product.id}
                className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-900/30 px-4 py-3 text-sm"
              >
                <span className="text-gray-300">{product.name}</span>
                <span className="font-mono tabular-nums text-gray-500">
                  ${product.price.toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Boundary>
  );
}
