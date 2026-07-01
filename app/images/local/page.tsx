import { Boundary } from '#/ui/boundary';
// A static import gives Next.js the image's intrinsic width/height at build
// time (and a generated blurDataURL) — no manual dimensions needed.
import laptopImg from '#/public/shop/laptop.png';
import Image from 'next/image';

export default function Page() {
  return (
    <Boundary label="local/page.tsx (Server Environment)">
      <div className="flex flex-col gap-6">
        <p className="text-sm leading-7 text-gray-300">
          Local images live in the{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            public
          </code>{' '}
          folder. There are two ways to reference them:
        </p>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="flex flex-col gap-3 rounded-lg border border-gray-800 bg-gray-900/40 p-5">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-gray-400">
              1. Public path (manual width/height)
            </span>
            <pre className="overflow-x-auto rounded bg-gray-950/60 p-3 font-mono text-[11px] leading-5 text-gray-400">
{`<Image
  src="/shop/phone.png"
  alt="Phone"
  width={180}
  height={180}
/>`}
            </pre>
            <Image src="/shop/phone.png" alt="Phone" width={180} height={180} />
            <span className="text-xs text-gray-500">
              You pass <code className="font-mono text-gray-400">width</code>/
              <code className="font-mono text-gray-400">height</code> so the
              space is reserved and layout doesn&apos;t shift.
            </span>
          </div>

          <div className="flex flex-col gap-3 rounded-lg border border-blue-900/50 bg-blue-950/20 p-5">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400">
              2. Static import (auto size + blur)
            </span>
            <pre className="overflow-x-auto rounded bg-gray-950/60 p-3 font-mono text-[11px] leading-5 text-gray-400">
{`import laptop from '#/public/shop/laptop.png'

<Image
  src={laptop}
  alt="Laptop"
  placeholder="blur"   // auto blurDataURL
  // width/height auto
/>`}
            </pre>
            <Image
              src={laptopImg}
              alt="Laptop"
              placeholder="blur"
              className="h-auto w-[180px]"
            />
            <span className="text-xs text-gray-500">
              Next.js reads the intrinsic size{' '}
              <span className="font-mono text-blue-400">
                ({laptopImg.width}×{laptopImg.height})
              </span>{' '}
              and generates a blur placeholder automatically.
            </span>
          </div>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-xs leading-6 text-gray-500">
            <span className="font-semibold text-gray-400">Can&apos;t static-import?</span>{' '}
            Use a dynamic{' '}
            <code className="font-mono text-gray-400">import()</code> in a Server
            Component (with a static path prefix) to still get automatic
            width/height and blurDataURL.
          </p>
        </div>
      </div>
    </Boundary>
  );
}
