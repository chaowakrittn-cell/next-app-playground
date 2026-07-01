import { Boundary } from '#/ui/boundary';
import Image from 'next/image';
import Link from 'next/link';

const BENEFITS = [
  {
    title: 'Size optimization',
    desc: 'Serves correctly-sized images per device in modern formats like WebP.',
  },
  {
    title: 'Visual stability',
    desc: 'Reserves space from width/height to prevent layout shift (CLS).',
  },
  {
    title: 'Faster loads',
    desc: 'Lazy-loads images as they enter the viewport, with optional blur-up.',
  },
  {
    title: 'Asset flexibility',
    desc: 'Resizes on demand — even images stored on remote servers.',
  },
];

export default function Page() {
  return (
    <Boundary label="page.tsx (Server Environment)">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="text-sm leading-7 text-gray-300">
            The <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
              &lt;Image&gt;
            </code>{' '}
            component from{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
              next/image
            </code>{' '}
            extends the HTML <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">&lt;img&gt;</code>{' '}
            with automatic optimization. This playground already uses it for
            every product image.
          </p>

          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
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
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            Basic usage
          </span>
          <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-xs leading-6 text-gray-400">
{`import Image from 'next/image'

<Image src="/shop/shoes.png" alt="Shoes" width={200} height={200} />`}
          </pre>
          <div className="self-start rounded-lg border border-gray-800 bg-gray-900/40 p-4">
            <Image
              src="/shop/shoes.png"
              alt="Shoes"
              width={160}
              height={160}
            />
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Explore
          </span>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            <Link
              href="/images/local"
              className="flex flex-col gap-1 rounded-lg border border-blue-900/50 bg-blue-950/20 p-4 transition hover:border-blue-700"
            >
              <span className="font-mono text-sm font-semibold text-blue-400">
                Local →
              </span>
              <span className="text-xs text-gray-500">
                Public path vs static import (auto size + blur).
              </span>
            </Link>
            <Link
              href="/images/fill"
              className="flex flex-col gap-1 rounded-lg border border-violet-900/50 bg-violet-950/20 p-4 transition hover:border-violet-700"
            >
              <span className="font-mono text-sm font-semibold text-violet-400">
                fill &amp; sizes →
              </span>
              <span className="text-xs text-gray-500">
                Let an image fill its parent container.
              </span>
            </Link>
            <Link
              href="/images/remote"
              className="flex flex-col gap-1 rounded-lg border border-orange-900/50 bg-orange-950/20 p-4 transition hover:border-orange-700"
            >
              <span className="font-mono text-sm font-semibold text-orange-400">
                Remote →
              </span>
              <span className="text-xs text-gray-500">
                remotePatterns config for external URLs.
              </span>
            </Link>
          </div>
        </div>
      </div>
    </Boundary>
  );
}
