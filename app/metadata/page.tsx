import { Boundary } from '#/ui/boundary';
import Link from 'next/link';

export default function Page() {
  return (
    <Boundary label="page.tsx (Server Environment)">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="text-sm leading-7 text-gray-300">
            The Metadata APIs generate the <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">&lt;head&gt;</code>{' '}
            tags for your pages — titles, descriptions, Open Graph, icons — for
            SEO and shareability. There are three ways in:
          </p>
          <ul className="flex flex-col gap-3 pl-4">
            <li className="flex flex-col gap-1">
              <span className="font-mono text-xs font-semibold text-blue-400">
                Static metadata object
              </span>
              <span className="text-sm leading-6 text-gray-400">
                Export a{' '}
                <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-300">
                  const metadata
                </code>{' '}
                from a layout or page — for values known at build time.
              </span>
            </li>
            <li className="flex flex-col gap-1">
              <span className="font-mono text-xs font-semibold text-violet-400">
                generateMetadata function
              </span>
              <span className="text-sm leading-6 text-gray-400">
                An async function that builds metadata from data (params, fetch)
                — for dynamic values.
              </span>
            </li>
            <li className="flex flex-col gap-1">
              <span className="font-mono text-xs font-semibold text-cyan-400">
                File conventions
              </span>
              <span className="text-sm leading-6 text-gray-400">
                Drop in{' '}
                <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-300">
                  favicon.ico
                </code>
                ,{' '}
                <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-300">
                  opengraph-image
                </code>
                ,{' '}
                <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-300">
                  robots.txt
                </code>
                ,{' '}
                <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-300">
                  sitemap.xml
                </code>{' '}
                — static files or code-generated.
              </span>
            </li>
          </ul>
          <p className="rounded-lg border border-gray-800 bg-gray-900/50 px-4 py-3 text-sm text-gray-500">
            <span className="font-semibold text-gray-400">In this repo:</span>{' '}
            the root layout defines a title{' '}
            <strong className="text-gray-300">template</strong>{' '}
            (<code className="font-mono text-xs">%s | Next.js Playground</code>),
            so every page&apos;s title is suffixed automatically. Check this
            browser tab.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Explore
          </span>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            <Link
              href="/metadata/static"
              className="flex flex-col gap-1 rounded-lg border border-blue-900/50 bg-blue-950/20 p-4 transition hover:border-blue-700"
            >
              <span className="font-mono text-sm font-semibold text-blue-400">
                Static →
              </span>
              <span className="text-xs text-gray-500">
                export const metadata — see the tab title change.
              </span>
            </Link>
            <Link
              href="/metadata/generate"
              className="flex flex-col gap-1 rounded-lg border border-violet-900/50 bg-violet-950/20 p-4 transition hover:border-violet-700"
            >
              <span className="font-mono text-sm font-semibold text-violet-400">
                generateMetadata →
              </span>
              <span className="text-xs text-gray-500">
                Title built from the route param, per page.
              </span>
            </Link>
            <Link
              href="/metadata/og"
              className="flex flex-col gap-1 rounded-lg border border-cyan-900/50 bg-cyan-950/20 p-4 transition hover:border-cyan-700"
            >
              <span className="font-mono text-sm font-semibold text-cyan-400">
                OG Image →
              </span>
              <span className="text-xs text-gray-500">
                Dynamic images generated with ImageResponse.
              </span>
            </Link>
          </div>
        </div>
      </div>
    </Boundary>
  );
}
