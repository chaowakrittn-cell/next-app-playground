import { Boundary } from '#/ui/boundary';
import Link from 'next/link';

const SAMPLES = ['hello-world', 'next-js-rocks', 'dynamic-title'];

export default function Page() {
  return (
    <Boundary label="generate/page.tsx (Server Environment)">
      <div className="flex flex-col gap-6">
        <p className="text-sm leading-7 text-gray-300">
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            generateMetadata
          </code>{' '}
          is an async function that builds metadata from data — here, from the
          route param. Open a sample below and watch the{' '}
          <strong className="text-gray-100">browser tab title</strong> change
          per page.
        </p>

        <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-xs leading-6 text-gray-400">
{`// [slug]/page.tsx
export async function generateMetadata({ params }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)  // or any async data
  return { title: post.title, description: post.description }
}`}
        </pre>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Sample pages
          </span>
          <div className="flex flex-col gap-2">
            {SAMPLES.map((slug) => (
              <Link
                key={slug}
                href={`/metadata/generate/${slug}`}
                className="flex items-center justify-between rounded-lg border border-violet-900/50 bg-violet-950/20 px-4 py-3 transition hover:border-violet-700"
              >
                <span className="font-mono text-sm text-gray-300">/{slug}</span>
                <span className="font-mono text-xs text-violet-400">
                  open →
                </span>
              </Link>
            ))}
          </div>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-xs leading-6 text-gray-500">
            <span className="font-semibold text-gray-400">Avoid double fetching:</span>{' '}
            if both{' '}
            <code className="font-mono text-gray-400">generateMetadata</code> and
            the page need the same data, wrap the fetch in React&apos;s{' '}
            <code className="font-mono text-gray-400">cache()</code> so it runs
            once per request.
          </p>
        </div>
      </div>
    </Boundary>
  );
}
