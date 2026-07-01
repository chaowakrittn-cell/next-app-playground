import { Boundary } from '#/ui/boundary';
import Image from 'next/image';

export default function Page() {
  return (
    <Boundary label="fill/page.tsx (Server Environment)">
      <div className="flex flex-col gap-6">
        <p className="text-sm leading-7 text-gray-300">
          When you don&apos;t know the dimensions ahead of time, use{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            fill
          </code>{' '}
          to make the image fill its parent. The parent must be{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            position: relative
          </code>{' '}
          with a set size, and you pair it with{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            object-fit
          </code>{' '}
          and{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            sizes
          </code>
          .
        </p>

        <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-xs leading-6 text-gray-400">
{`<div className="relative h-48 w-48">
  <Image
    src="/shop/tablet.png"
    alt="Tablet"
    fill
    sizes="192px"
    style={{ objectFit: 'contain' }}
  />
</div>`}
        </pre>

        <div className="flex flex-wrap gap-6">
          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs text-gray-500">
              objectFit: contain
            </span>
            <div className="relative h-48 w-48 overflow-hidden rounded-lg border border-gray-800 bg-gray-900/40">
              <Image
                src="/shop/tablet.png"
                alt="Tablet"
                fill
                sizes="192px"
                style={{ objectFit: 'contain' }}
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs text-gray-500">
              objectFit: cover
            </span>
            <div className="relative h-48 w-48 overflow-hidden rounded-lg border border-gray-800 bg-gray-900/40">
              <Image
                src="/shop/tablet.png"
                alt="Tablet"
                fill
                sizes="192px"
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-xs leading-6 text-gray-500">
            <span className="font-semibold text-gray-400">sizes</span> tells the
            browser how wide the image will render at different breakpoints so it
            can pick the smallest sufficient source — important for responsive
            <code className="font-mono text-gray-400"> fill</code> images.
          </p>
        </div>
      </div>
    </Boundary>
  );
}
