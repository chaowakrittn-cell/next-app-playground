import { Boundary } from '#/ui/boundary';

// We hit the /_next/image optimizer endpoint directly with plain <img> so we
// can control the exact width and show the resized result. This is the same
// endpoint <Image> uses under the hood — it just picks the width for you.
const SRC = '%2Fshop%2Flaptop.png'; // encoded /shop/laptop.png
const opt = (w: number, q = 75) => `/_next/image?url=${SRC}&w=${w}&q=${q}`;

// Widths must be in the default imageSizes list (16,32,48,64,96,128,256,384).
const WIDTHS = [64, 128, 256];

export default function Page() {
  return (
    <Boundary label="optimization/page.tsx (Server Environment)">
      <div className="flex flex-col gap-6">
        <p className="text-sm leading-7 text-gray-300">
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            &lt;Image&gt;
          </code>{' '}
          doesn&apos;t serve your original file. It routes through the{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            /_next/image
          </code>{' '}
          optimizer, which <strong className="text-gray-100">resizes</strong> the
          image to the width the device needs, re-encodes it to a{' '}
          <strong className="text-gray-100">modern format</strong> (WebP/AVIF),
          and applies a quality setting.
        </p>

        <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-xs leading-6 text-gray-400">
{`/_next/image?url=%2Fshop%2Flaptop.png&w=256&q=75
                └ source ─────────┘  └ width └ quality`}
        </pre>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Same source, resized to each width
          </span>
          <div className="flex flex-wrap items-end gap-6">
            {WIDTHS.map((w) => (
              <div key={w} className="flex flex-col items-center gap-2">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={opt(w)}
                  alt={`Laptop optimized to ${w}px`}
                  width={w}
                  height={w}
                  className="rounded-lg border border-gray-800 bg-gray-900/40"
                />
                <span className="font-mono text-xs text-gray-400">
                  w={w}
                </span>
              </div>
            ))}
          </div>
          <p className="text-xs text-gray-500">
            Each is the <em>same</em> source PNG, resized server-side to that
            pixel width. Open the{' '}
            <strong className="text-gray-300">Network tab</strong> and click one
            — the response is a small{' '}
            <strong className="text-gray-300">WebP</strong>, not the full PNG.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="flex flex-col gap-2 rounded-lg border border-red-900/50 bg-red-950/20 p-4">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-red-400">
              Raw &lt;img&gt; — no optimization
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/shop/laptop.png"
              alt="Laptop (original)"
              width={128}
              height={128}
              className="rounded-lg border border-gray-800 bg-gray-900/40"
            />
            <span className="text-xs text-gray-500">
              Downloads the <strong className="text-gray-300">full-size PNG</strong>{' '}
              regardless of how small it&apos;s displayed.
            </span>
          </div>
          <div className="flex flex-col gap-2 rounded-lg border border-blue-900/50 bg-blue-950/20 p-4">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400">
              Optimized (w=128)
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={opt(128)}
              alt="Laptop (optimized)"
              width={128}
              height={128}
              className="rounded-lg border border-gray-800 bg-gray-900/40"
            />
            <span className="text-xs text-gray-500">
              Downloads a <strong className="text-gray-300">128px WebP</strong> —
              a fraction of the bytes for the same visible result.
            </span>
          </div>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-xs leading-6 text-gray-500">
            <span className="font-semibold text-gray-400">In practice:</span> you
            never write these URLs — <code className="font-mono text-gray-400">&lt;Image&gt;</code>{' '}
            builds a <code className="font-mono text-gray-400">srcset</code> of
            these widths so the browser picks the right one per device and screen
            density, and negotiates WebP/AVIF from the{' '}
            <code className="font-mono text-gray-400">Accept</code> header
            automatically.
          </p>
        </div>
      </div>
    </Boundary>
  );
}
