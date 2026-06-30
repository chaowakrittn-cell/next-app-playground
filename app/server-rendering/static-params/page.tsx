import { Boundary } from '#/ui/boundary';
import Link from 'next/link';

const KNOWN_IDS = ['1', '2', '3'];
const UNKNOWN_IDS = ['99', '100', '101'];

export default function Page() {
  return (
    <Boundary label="static-params/page.tsx">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="text-sm leading-7 text-gray-300">
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
              generateStaticParams
            </code>{' '}
            lets you prerender dynamic route segments at build time. Next.js
            renders the pages you return and caches the result — no server work
            at request time.
          </p>
          <p className="text-sm leading-7 text-gray-300">
            Without it, Next.js does not know the pages exist at build time and
            renders them on the first request instead, then caches the result.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs font-semibold text-blue-400">
                With generateStaticParams
              </span>
              <span className="text-xs text-gray-500">
                Prerendered at build time. Terminal logs during{' '}
                <code className="font-mono text-gray-400">next build</code>,
                never at request time.
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {KNOWN_IDS.map((id) => (
                <Link
                  key={id}
                  href={`/server-rendering/static-params/known/${id}`}
                  className="flex items-center justify-between rounded-lg border border-blue-900/50 bg-blue-950/20 px-4 py-3 transition hover:border-blue-700"
                >
                  <span className="text-sm text-gray-300">Item {id}</span>
                  <span className="font-mono text-xs text-blue-500">
                    prerendered →
                  </span>
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs font-semibold text-orange-400">
                Without generateStaticParams
              </span>
              <span className="text-xs text-gray-500">
                Rendered and cached on first request. Terminal logs once per id
                on first visit, never again.
              </span>
            </div>
            <div className="flex flex-col gap-2">
              {UNKNOWN_IDS.map((id) => (
                <Link
                  key={id}
                  href={`/server-rendering/static-params/unknown/${id}`}
                  className="flex items-center justify-between rounded-lg border border-orange-900/50 bg-orange-950/20 px-4 py-3 transition hover:border-orange-700"
                >
                  <span className="text-sm text-gray-300">Item {id}</span>
                  <span className="font-mono text-xs text-orange-500">
                    first request →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </Boundary>
  );
}
