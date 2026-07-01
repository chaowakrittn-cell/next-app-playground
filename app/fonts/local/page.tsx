import { Boundary } from '#/ui/boundary';
import localFont from 'next/font/local';

// A real local font file already in this repo (used for OG images). The path
// is resolved relative to THIS file. next/font/local self-hosts it just like a
// Google font — same benefits, no network request.
const inter = localFont({ src: '../../api/og/Inter-SemiBold.ttf' });

const SAMPLE = 'The quick brown fox jumps over the lazy dog';

export default function Page() {
  return (
    <Boundary label="local/page.tsx (Server Environment)">
      <div className="flex flex-col gap-6">
        <p className="text-sm leading-7 text-gray-300">
          For fonts you ship yourself, import{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            localFont
          </code>{' '}
          from{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            next/font/local
          </code>{' '}
          and point{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            src
          </code>{' '}
          at the file (resolved relative to the calling file). You get the same
          self-hosting and no-layout-shift benefits.
        </p>

        <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-xs leading-6 text-gray-400">
{`import localFont from 'next/font/local'

const inter = localFont({ src: './Inter-SemiBold.ttf' })

<p className={inter.className}>…</p>`}
        </pre>

        {/* Live: rendered in the local Inter-SemiBold font */}
        <div className="flex flex-col gap-1 rounded-lg border border-cyan-900/50 bg-cyan-950/20 p-5">
          <span className="font-mono text-xs text-gray-500">
            localFont({'{'} src: &apos;…/Inter-SemiBold.ttf&apos; {'}'}) — a real file in this repo
          </span>
          <p className={`${inter.className} text-2xl text-gray-100`}>{SAMPLE}</p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Multiple files for one family
          </span>
          <p className="text-xs leading-6 text-gray-500">
            Pass an array to <code className="font-mono text-gray-400">src</code>{' '}
            to map weights and styles to different files:
          </p>
          <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-xs leading-6 text-gray-400">
{`const roboto = localFont({
  src: [
    { path: './Roboto-Regular.woff2', weight: '400', style: 'normal' },
    { path: './Roboto-Italic.woff2',  weight: '400', style: 'italic' },
    { path: './Roboto-Bold.woff2',    weight: '700', style: 'normal' },
  ],
})`}
          </pre>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-xs leading-6 text-gray-500">
            Font files can live anywhere in the project — co-located in{' '}
            <code className="font-mono text-gray-400">app/</code> or in{' '}
            <code className="font-mono text-gray-400">public/</code>. Prefer{' '}
            <code className="font-mono text-gray-400">.woff2</code> for the
            smallest size when you have the choice.
          </p>
        </div>
      </div>
    </Boundary>
  );
}
