import { Boundary } from '#/ui/boundary';
import Link from 'next/link';

const SERVER_USES = [
  'Fetch data from databases or APIs close to the source',
  'Use API keys, tokens, and secrets without exposing them to the client',
  'Reduce the amount of JavaScript sent to the browser',
  'Improve First Contentful Paint (FCP) and stream content progressively',
];

const CLIENT_USES = [
  'State and event handlers — e.g. onClick, onChange',
  'Lifecycle logic — e.g. useEffect',
  'Browser-only APIs — e.g. localStorage, window, geolocation',
  'Custom hooks that depend on the above',
];

export default function Page() {
  return (
    <Boundary label="page.tsx (Server Environment)">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="text-sm leading-7 text-gray-300">
            By default, layouts and pages are{' '}
            <strong className="text-gray-100">Server Components</strong>, which
            lets you fetch data and render UI on the server, optionally cache
            the result, and stream it to the client. When you need
            interactivity or browser APIs, you use{' '}
            <strong className="text-gray-100">Client Components</strong> to
            layer in functionality.
          </p>
          <p className="text-sm leading-7 text-gray-300">
            The two environments have different capabilities. Choose based on
            what each piece of UI needs to do.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-lg border border-gray-700 bg-gray-900/50 p-5">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-gray-300">
                Server Components
              </span>
              <span className="text-xs text-gray-500">
                The default. No directive needed.
              </span>
            </div>
            <ul className="flex flex-col gap-2">
              {SERVER_USES.map((use) => (
                <li
                  key={use}
                  className="flex gap-2 text-sm leading-6 text-gray-400"
                >
                  <span className="text-gray-600">—</span>
                  {use}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-3 rounded-lg border border-blue-900/50 bg-blue-950/20 p-5">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400">
                Client Components
              </span>
              <span className="text-xs text-gray-500">
                Opt in with the{' '}
                <code className="font-mono text-blue-400">&apos;use client&apos;</code>{' '}
                directive.
              </span>
            </div>
            <ul className="flex flex-col gap-2">
              {CLIENT_USES.map((use) => (
                <li
                  key={use}
                  className="flex gap-2 text-sm leading-6 text-gray-400"
                >
                  <span className="text-blue-700">—</span>
                  {use}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Showcases
          </p>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            {[
              {
                href: '/server-client-components/use-client',
                title: "'use client' boundary →",
                desc: 'How the directive marks a Server/Client boundary and what ends up in the bundle.',
              },
              {
                href: '/server-client-components/passing-data',
                title: 'Passing data →',
                desc: 'A Server Component fetches data and passes it to a Client Component via props.',
              },
              {
                href: '/server-client-components/interleaving',
                title: 'Interleaving →',
                desc: 'Pass a Server Component as children of a Client Component.',
              },
              {
                href: '/server-client-components/context',
                title: 'Context providers →',
                desc: 'Share global state with a Client Component provider rendered from a Server Component.',
              },
              {
                href: '/server-client-components/environment-poisoning',
                title: 'Environment poisoning →',
                desc: 'Keep secrets off the client with NEXT_PUBLIC_ rules and the server-only package.',
              },
            ].map((card) => (
              <Link
                key={card.href}
                href={card.href}
                className="flex flex-col gap-1 rounded-lg border border-gray-800 bg-gray-900/50 p-4 transition hover:border-gray-600"
              >
                <span className="font-mono text-sm font-semibold text-gray-200">
                  {card.title}
                </span>
                <span className="text-xs text-gray-500">{card.desc}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </Boundary>
  );
}
