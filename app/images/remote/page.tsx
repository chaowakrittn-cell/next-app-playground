import { Boundary } from '#/ui/boundary';

export default function Page() {
  return (
    <Boundary label="remote/page.tsx (Server Environment)">
      <div className="flex flex-col gap-6">
        <p className="text-sm leading-7 text-gray-300">
          For an image on another server, pass a URL string as{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            src
          </code>
          . Since Next.js can&apos;t read remote files at build time, you must
          provide <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">width</code>{' '}
          and <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">height</code>{' '}
          yourself (or use <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">fill</code>).
        </p>

        <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-xs leading-6 text-gray-400">
{`<Image
  src="https://s3.amazonaws.com/my-bucket/profile.png"
  alt="Picture of the author"
  width={500}
  height={500}
/>`}
        </pre>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Allow the host in next.config
          </span>
          <p className="text-xs leading-6 text-gray-500">
            To prevent abuse, remote images only load from hosts you explicitly
            allow via <code className="font-mono text-gray-400">images.remotePatterns</code>.
            Be as specific as possible.
          </p>
          <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-xs leading-6 text-gray-400">
{`// next.config.ts
const config = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 's3.amazonaws.com',
        port: '',
        pathname: '/my-bucket/**',
        search: '',
      },
    ],
  },
}`}
          </pre>
        </div>

        <div className="rounded-lg border border-amber-800/50 bg-amber-950/20 p-4">
          <p className="text-xs leading-6 text-gray-400">
            <span className="font-semibold text-amber-400">Why no live example here:</span>{' '}
            rendering a remote image would require adding its host to{' '}
            <code className="font-mono text-gray-400">remotePatterns</code> in
            this project&apos;s <code className="font-mono text-gray-400">next.config</code>{' '}
            — a global change. Without a matching pattern, Next.js throws{' '}
            <code className="font-mono text-gray-400">
              &quot;hostname is not configured under images&quot;
            </code>
            . That guard is the point: it&apos;s opt-in per host.
          </p>
        </div>
      </div>
    </Boundary>
  );
}
