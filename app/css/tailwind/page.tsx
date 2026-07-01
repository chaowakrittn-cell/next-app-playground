import { Boundary } from '#/ui/boundary';

export default function Page() {
  return (
    <Boundary label="tailwind/page.tsx (Server Environment)">
      <div className="flex flex-col gap-6">
        <p className="text-sm leading-7 text-gray-300">
          Tailwind is a utility-first framework — you compose low-level classes
          directly in your markup. It&apos;s the recommended default for most
          styling, and it&apos;s what this entire playground is built with.
        </p>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Setup (three steps)
          </span>
          <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-xs leading-6 text-gray-400">
{`# 1. install
pnpm add -D tailwindcss @tailwindcss/postcss

// 2. postcss.config.mjs
export default { plugins: { '@tailwindcss/postcss': {} } }

/* 3. app/globals.css */
@import 'tailwindcss';   // then import globals.css in the root layout`}
          </pre>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Live examples
          </span>

          <div className="flex flex-col gap-2 rounded-lg border border-gray-800 bg-gray-900/40 p-4">
            <code className="font-mono text-xs text-gray-500">
              className=&quot;flex items-center gap-3&quot;
            </code>
            <div className="flex items-center gap-3">
              <span className="size-8 rounded-full bg-cyan-500" />
              <span className="size-8 rounded-full bg-blue-500" />
              <span className="size-8 rounded-full bg-violet-500" />
            </div>
          </div>

          <div className="flex flex-col gap-2 rounded-lg border border-gray-800 bg-gray-900/40 p-4">
            <code className="font-mono text-xs text-gray-500">
              className=&quot;text-2xl font-bold text-cyan-300&quot;
            </code>
            <p className="text-2xl font-bold text-cyan-300">
              Welcome to Next.js!
            </p>
          </div>

          <div className="flex flex-col gap-2 rounded-lg border border-gray-800 bg-gray-900/40 p-4">
            <code className="font-mono text-xs text-gray-500">
              className=&quot;rounded-md bg-cyan-600 px-4 py-2 … hover:bg-cyan-500&quot;
            </code>
            <button className="self-start rounded-md bg-cyan-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-cyan-500">
              Hover me
            </button>
          </div>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-xs leading-6 text-gray-500">
            Import Tailwind and other global stylesheets at the{' '}
            <strong className="text-gray-400">root of the app</strong> so they
            load first and consistently.
          </p>
        </div>
      </div>
    </Boundary>
  );
}
