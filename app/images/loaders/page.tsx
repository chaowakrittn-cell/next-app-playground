import { Boundary } from '#/ui/boundary';

export default function Page() {
  return (
    <Boundary label="loaders/page.tsx (Server Environment)">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-3">
          <p className="text-sm leading-7 text-gray-300">
            By default, <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">&lt;Image&gt;</code>{' '}
            resizes and re-encodes images{' '}
            <strong className="text-gray-100">on the server at request time</strong>{' '}
            (the <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">/_next/image</code>{' '}
            optimizer). It&apos;s cache-backed, so the steady-state cost is low —
            but the pipeline can lag or fail in some environments.
          </p>

          <div className="rounded-lg border border-amber-800/50 bg-amber-950/20 p-4">
            <span className="font-mono text-xs font-semibold uppercase tracking-wider text-amber-400">
              The concern
            </span>
            <ul className="mt-2 flex flex-col gap-1.5 pl-4 text-xs leading-6 text-gray-400">
              <li>
                <span className="mr-2 text-amber-600">—</span>
                CPU-heavy work (esp. AVIF); a cold-cache traffic spike can
                overload a self-hosted server.
              </li>
              <li>
                <span className="mr-2 text-amber-600">—</span>
                Serverless caches may not persist across instances → images get
                re-optimized → lag.
              </li>
              <li>
                <span className="mr-2 text-amber-600">—</span>
                <code className="font-mono text-gray-400">sharp</code> native
                binaries can fail on Alpine/Docker or arch mismatches.
              </li>
              <li>
                <span className="mr-2 text-amber-600">—</span>
                Static export (<code className="font-mono text-gray-400">output: &apos;export&apos;</code>)
                has no server, so the built-in optimizer can&apos;t run at all.
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Solution 1 — Offload to an external image service (custom loader)
          </span>
          <p className="text-sm leading-6 text-gray-400">
            A <strong className="text-gray-300">loader</strong> is a function
            that builds the image URL. Point it at a dedicated image CDN
            (Cloudinary, imgix, Vercel, etc.) so resizing happens on{' '}
            <strong className="text-gray-300">their</strong> infrastructure, not
            your server — your app just hands out URLs.
          </p>
          <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-xs leading-6 text-gray-400">
{`// A per-image loader
'use client'
import Image from 'next/image'

const cloudinaryLoader = ({ src, width, quality }) =>
  \`https://res.cloudinary.com/demo/image/upload/w_\${width},q_\${quality || 75}/\${src}\`

<Image loader={cloudinaryLoader} src="laptop.png" alt="Laptop"
       width={256} height={256} />`}
          </pre>
          <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-xs leading-6 text-gray-400">
{`// …or app-wide via next.config
const config = {
  images: {
    loader: 'custom',
    loaderFile: './image-loader.ts',
  },
}`}
          </pre>
          <p className="text-xs text-gray-500">
            Your server never touches the pixels — no{' '}
            <code className="font-mono text-gray-400">/_next/image</code>, no{' '}
            <code className="font-mono text-gray-400">sharp</code>, no CPU spikes.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Solution 2 — Turn optimization off (unoptimized)
          </span>
          <p className="text-sm leading-6 text-gray-400">
            When optimization isn&apos;t worth the operational cost (or there&apos;s
            no server to run it, like static export), serve the original file.
            You still keep <code className="font-mono text-gray-400">&lt;Image&gt;</code>&apos;s
            layout-shift protection and lazy loading — just not resizing/format
            conversion.
          </p>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-2">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs text-gray-500">Per image</span>
              <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-3 font-mono text-[11px] leading-5 text-gray-400">
{`<Image
  src="/shop/laptop.png"
  alt="Laptop"
  width={256}
  height={256}
  unoptimized
/>`}
              </pre>
            </div>
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs text-gray-500">App-wide</span>
              <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-3 font-mono text-[11px] leading-5 text-gray-400">
{`// next.config
const config = {
  images: { unoptimized: true },
}`}
              </pre>
            </div>
          </div>
          <p className="text-xs text-gray-500">
            Trade-off: the browser downloads the full-size original, so bytes
            aren&apos;t reduced — but there&apos;s zero server work and it runs
            anywhere.
          </p>
        </div>

        <div className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <table className="w-full border-collapse text-left text-xs">
            <thead>
              <tr className="border-b border-gray-800 text-gray-400">
                <th className="py-2 pr-4 font-semibold">Approach</th>
                <th className="py-2 pr-4 font-semibold">Who resizes</th>
                <th className="py-2 pr-4 font-semibold">Server load</th>
                <th className="py-2 font-semibold">Bytes optimized</th>
              </tr>
            </thead>
            <tbody className="text-gray-400">
              <tr className="border-b border-gray-800/60">
                <td className="py-2 pr-4">Default optimizer</td>
                <td className="py-2 pr-4">your server</td>
                <td className="py-2 pr-4 text-amber-400">some (cached)</td>
                <td className="py-2 text-green-400">yes</td>
              </tr>
              <tr className="border-b border-gray-800/60">
                <td className="py-2 pr-4">Custom loader (image CDN)</td>
                <td className="py-2 pr-4">the CDN</td>
                <td className="py-2 pr-4 text-green-400">none</td>
                <td className="py-2 text-green-400">yes</td>
              </tr>
              <tr>
                <td className="py-2 pr-4">unoptimized</td>
                <td className="py-2 pr-4">no one</td>
                <td className="py-2 pr-4 text-green-400">none</td>
                <td className="py-2 text-red-400">no</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </Boundary>
  );
}
