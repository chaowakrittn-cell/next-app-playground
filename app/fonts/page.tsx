import { Boundary } from '#/ui/boundary';
import Link from 'next/link';

const BENEFITS = [
  {
    title: 'Built-in self-hosting',
    desc: 'Font files are downloaded at build time and served from your own domain.',
  },
  {
    title: 'No external requests',
    desc: 'The browser never calls Google — better privacy and performance.',
  },
  {
    title: 'No layout shift',
    desc: 'Next.js sizes a fallback font to match, preventing CLS as the font loads.',
  },
];

export default function Page() {
  return (
    <Boundary label="page.tsx (Server Environment)">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="text-sm leading-7 text-gray-300">
            The <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
              next/font
            </code>{' '}
            module optimizes fonts and removes external network requests. You
            import a loader from{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
              next/font/google
            </code>{' '}
            or{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
              next/font/local
            </code>
            , call it at module scope, and apply its{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
              className
            </code>
            . This playground&apos;s root layout already loads{' '}
            <strong className="text-gray-100">Geist</strong> this way.
          </p>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            {BENEFITS.map((b) => (
              <div
                key={b.title}
                className="flex flex-col gap-1 rounded-lg border border-gray-800 bg-gray-900/40 p-4"
              >
                <span className="text-sm font-semibold text-gray-200">
                  {b.title}
                </span>
                <span className="text-xs text-gray-500">{b.desc}</span>
              </div>
            ))}
          </div>

          <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-xs leading-6 text-gray-400">
{`import { Geist } from 'next/font/google'

const geist = Geist({ subsets: ['latin'] })

<html className={geist.className}>…</html>`}
          </pre>
          <p className="text-xs text-gray-500">
            Fonts are scoped to where they&apos;re used — apply one in the Root
            Layout to cover the whole app.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Explore
          </span>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            <Link
              href="/fonts/google"
              className="flex flex-col gap-1 rounded-lg border border-blue-900/50 bg-blue-950/20 p-4 transition hover:border-blue-700"
            >
              <span className="font-mono text-sm font-semibold text-blue-400">
                Google Fonts →
              </span>
              <span className="text-xs text-gray-500">
                Self-hosted Google fonts, live. Variable vs weight.
              </span>
            </Link>
            <Link
              href="/fonts/variables"
              className="flex flex-col gap-1 rounded-lg border border-violet-900/50 bg-violet-950/20 p-4 transition hover:border-violet-700"
            >
              <span className="font-mono text-sm font-semibold text-violet-400">
                CSS Variables →
              </span>
              <span className="text-xs text-gray-500">
                Apply fonts via a CSS variable (how this repo does it).
              </span>
            </Link>
            <Link
              href="/fonts/local"
              className="flex flex-col gap-1 rounded-lg border border-cyan-900/50 bg-cyan-950/20 p-4 transition hover:border-cyan-700"
            >
              <span className="font-mono text-sm font-semibold text-cyan-400">
                Local Fonts →
              </span>
              <span className="text-xs text-gray-500">
                Load a font file from your project with next/font/local.
              </span>
            </Link>
          </div>
        </div>
      </div>
    </Boundary>
  );
}
