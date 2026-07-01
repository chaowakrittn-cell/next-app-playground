import { Boundary } from '#/ui/boundary';
import { Lobster } from 'next/font/google';
import { LayoutShiftDemo } from './layout-shift-demo';

// Downloaded at build time and self-hosted — served from your own origin.
const lobster = Lobster({ weight: '400', subsets: ['latin'] });

export default function Page() {
  return (
    <Boundary label="optimization/page.tsx (Server Environment)">
      <div className="flex flex-col gap-8">
        {/* ── No external requests ─────────────────────────────── */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            1. No external requests
          </span>
          <p className="text-sm leading-7 text-gray-300">
            The font file is downloaded <strong className="text-gray-100">at build time</strong>{' '}
            and served from your own domain, so the browser never contacts
            Google. The text below is a live Google font (Lobster) — yet no
            request goes to <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">fonts.gstatic.com</code>.
          </p>

          <div className="rounded-lg border border-gray-800 bg-gray-900/40 p-5">
            <p className={`${lobster.className} text-3xl text-gray-100`}>
              Served from your own origin
            </p>
          </div>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs text-red-400">
                ✗ Traditional — hits Google
              </span>
              <pre className="overflow-x-auto rounded-lg border border-red-900/40 bg-red-950/10 p-3 font-mono text-[11px] leading-5 text-gray-400">
{`<link
  href="https://fonts.googleapis.com/css2?family=Lobster"
  rel="stylesheet"
/>
// browser → fonts.googleapis.com + fonts.gstatic.com`}
              </pre>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs text-green-400">
                ✓ next/font — self-hosted
              </span>
              <pre className="overflow-x-auto rounded-lg border border-green-900/40 bg-green-950/10 p-3 font-mono text-[11px] leading-5 text-gray-400">
{`import { Lobster } from 'next/font/google'
const lobster = Lobster({ weight: '400', subsets: ['latin'] })
// browser → /_next/static/media/…woff2 (your origin)`}
              </pre>
            </div>
          </div>

          <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
            <p className="text-xs leading-6 text-gray-500">
              <span className="font-semibold text-gray-400">Verify:</span> open
              the <strong className="text-gray-300">Network tab</strong>, filter
              by <code className="font-mono text-gray-400">Font</code>, and
              reload. Every font request is to your own origin (
              <code className="font-mono text-gray-400">/_next/static/media/</code>
              ) — nothing to Google. Next.js also injects a{' '}
              <code className="font-mono text-gray-400">
                &lt;link rel=&quot;preload&quot; as=&quot;font&quot;&gt;
              </code>{' '}
              so the file starts loading early.
            </p>
          </div>
        </div>

        {/* ── No layout shift ──────────────────────────────────── */}
        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            2. No layout shift
          </span>
          <p className="text-sm leading-7 text-gray-300">
            Before a web font loads, the browser shows a fallback. If that
            fallback&apos;s letter sizing differs from the real font, text
            reflows when the font arrives — a{' '}
            <strong className="text-gray-100">Cumulative Layout Shift</strong>.
            next/font measures the web font and generates a fallback with
            matching metrics (via{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
              size-adjust
            </code>
            /<code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
              ascent-override
            </code>
            ), so the swap is invisible.
          </p>

          <LayoutShiftDemo />
        </div>
      </div>
    </Boundary>
  );
}
