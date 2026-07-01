import { Boundary } from '#/ui/boundary';
import Link from 'next/link';

const OPTIONS = [
  {
    name: 'Tailwind CSS',
    desc: 'Utility-first classes. Recommended for most styling.',
  },
  {
    name: 'CSS Modules',
    desc: 'Locally-scoped classes via .module.css. For component styles Tailwind can’t cover.',
  },
  {
    name: 'Global CSS',
    desc: 'App-wide styles imported in the root layout. Best for truly global rules.',
  },
  {
    name: 'External stylesheets',
    desc: 'Import a package’s CSS (e.g. bootstrap) anywhere in app/.',
  },
  { name: 'Sass', desc: 'Compile .scss/.sass with built-in support.' },
  { name: 'CSS-in-JS', desc: 'Runtime styling libraries (styled-components, etc.).' },
];

export default function Page() {
  return (
    <Boundary label="page.tsx (Server Environment)">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="text-sm leading-7 text-gray-300">
            Next.js supports several ways to style your app. This playground
            itself uses <strong className="text-gray-100">Tailwind</strong> plus
            a global stylesheet imported in the root layout.
          </p>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {OPTIONS.map((o) => (
              <div
                key={o.name}
                className="flex flex-col gap-1 rounded-lg border border-gray-800 bg-gray-900/40 p-4"
              >
                <span className="text-sm font-semibold text-gray-200">
                  {o.name}
                </span>
                <span className="text-xs text-gray-500">{o.desc}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2 rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Recommended split
          </span>
          <ul className="flex flex-col gap-1.5 pl-4 text-xs leading-6 text-gray-500">
            <li>
              <span className="mr-2 text-gray-600">—</span>
              <strong className="text-gray-400">Tailwind</strong> for most
              component styling.
            </li>
            <li>
              <span className="mr-2 text-gray-600">—</span>
              <strong className="text-gray-400">CSS Modules</strong> for scoped
              custom CSS when utilities aren&apos;t enough.
            </li>
            <li>
              <span className="mr-2 text-gray-600">—</span>
              <strong className="text-gray-400">Global CSS</strong> only for
              truly global rules (Tailwind base, resets).
            </li>
          </ul>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-xs leading-6 text-gray-500">
            <span className="font-semibold text-gray-400">Dev vs production:</span>{' '}
            in <code className="font-mono text-gray-400">next dev</code>, CSS
            updates instantly via Fast Refresh. In{' '}
            <code className="font-mono text-gray-400">next build</code>, CSS is
            concatenated into minified, code-split files so each route loads the
            minimum. CSS ordering can differ in dev — always verify with a
            production build.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Explore
          </span>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            <Link
              href="/css/css-modules"
              className="flex flex-col gap-1 rounded-lg border border-blue-900/50 bg-blue-950/20 p-4 transition hover:border-blue-700"
            >
              <span className="font-mono text-sm font-semibold text-blue-400">
                CSS Modules →
              </span>
              <span className="text-xs text-gray-500">
                Locally-scoped classes with a live hashed class name.
              </span>
            </Link>
            <Link
              href="/css/tailwind"
              className="flex flex-col gap-1 rounded-lg border border-cyan-900/50 bg-cyan-950/20 p-4 transition hover:border-cyan-700"
            >
              <span className="font-mono text-sm font-semibold text-cyan-400">
                Tailwind →
              </span>
              <span className="text-xs text-gray-500">
                Utility classes and setup.
              </span>
            </Link>
            <Link
              href="/css/ordering"
              className="flex flex-col gap-1 rounded-lg border border-violet-900/50 bg-violet-950/20 p-4 transition hover:border-violet-700"
            >
              <span className="font-mono text-sm font-semibold text-violet-400">
                Ordering &amp; Global →
              </span>
              <span className="text-xs text-gray-500">
                How import order decides CSS order.
              </span>
            </Link>
          </div>
        </div>
      </div>
    </Boundary>
  );
}
