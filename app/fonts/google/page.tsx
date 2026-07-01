import { Boundary } from '#/ui/boundary';
import { Pacifico, Playfair_Display, Roboto } from 'next/font/google';

// Font loaders must be called at module scope. These are downloaded at build
// time and self-hosted — no request to Google when the page loads.

// Variable font → no weight needed.
const playfair = Playfair_Display({ subsets: ['latin'] });

// Non-variable / single-weight fonts → specify a weight.
const roboto = Roboto({ weight: '400', subsets: ['latin'] });
const pacifico = Pacifico({ weight: '400', subsets: ['latin'] });

const SAMPLE = 'The quick brown fox jumps over the lazy dog';

export default function Page() {
  return (
    <Boundary label="google/page.tsx (Server Environment)">
      <div className="flex flex-col gap-6">
        <p className="text-sm leading-7 text-gray-300">
          Import a font from{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            next/font/google
          </code>
          , call it at module scope, and apply its{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            className
          </code>
          . Each sample below is rendered in an actual self-hosted Google font —
          check the Network tab: no request goes to{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            fonts.googleapis.com
          </code>
          .
        </p>

        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1 rounded-lg border border-gray-800 bg-gray-900/40 p-5">
            <span className="font-mono text-xs text-gray-500">
              Playfair_Display({'{'} subsets: [&apos;latin&apos;] {'}'}) — variable, no weight
            </span>
            <p className={`${playfair.className} text-2xl text-gray-100`}>
              {SAMPLE}
            </p>
          </div>

          <div className="flex flex-col gap-1 rounded-lg border border-gray-800 bg-gray-900/40 p-5">
            <span className="font-mono text-xs text-gray-500">
              Roboto({'{'} weight: &apos;400&apos;, subsets: [&apos;latin&apos;] {'}'})
            </span>
            <p className={`${roboto.className} text-2xl text-gray-100`}>
              {SAMPLE}
            </p>
          </div>

          <div className="flex flex-col gap-1 rounded-lg border border-gray-800 bg-gray-900/40 p-5">
            <span className="font-mono text-xs text-gray-500">
              Pacifico({'{'} weight: &apos;400&apos;, subsets: [&apos;latin&apos;] {'}'})
            </span>
            <p className={`${pacifico.className} text-2xl text-gray-100`}>
              {SAMPLE}
            </p>
          </div>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-xs leading-6 text-gray-500">
            <span className="font-semibold text-gray-400">Variable vs weight:</span>{' '}
            prefer <strong className="text-gray-300">variable fonts</strong>{' '}
            (like Playfair Display) — one file covers all weights, best for
            performance and flexibility. For non-variable fonts you must pass a{' '}
            <code className="font-mono text-gray-400">weight</code>. Loading
            several fonts is just several loader calls with different classNames.
          </p>
        </div>
      </div>
    </Boundary>
  );
}
