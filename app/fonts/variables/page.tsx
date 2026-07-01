import { Boundary } from '#/ui/boundary';
import { Roboto_Slab } from 'next/font/google';

// Instead of (or as well as) `className`, a font can expose a CSS variable.
// You apply the variable to a wrapper, then reference it wherever you want.
const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  variable: '--font-demo',
});

const SAMPLE = 'The quick brown fox jumps over the lazy dog';

export default function Page() {
  return (
    <Boundary label="variables/page.tsx (Server Environment)">
      <div className="flex flex-col gap-6">
        <p className="text-sm leading-7 text-gray-300">
          Passing a{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            variable
          </code>{' '}
          option gives you a CSS custom property instead of a fixed class. Apply
          the variable class to a container, then use{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            var(--font-demo)
          </code>{' '}
          in your styles. This is how the playground wires up{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            --font-geist-sans
          </code>{' '}
          and{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            --font-geist-mono
          </code>{' '}
          in its root layout.
        </p>

        <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-xs leading-6 text-gray-400">
{`const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  variable: '--font-demo',
})

// apply the variable, then reference it
<div className={robotoSlab.variable}>
  <p style={{ fontFamily: 'var(--font-demo)' }}>…</p>
</div>`}
        </pre>

        {/* The variable is defined on this wrapper… */}
        <div
          className={`${robotoSlab.variable} flex flex-col gap-1 rounded-lg border border-violet-900/50 bg-violet-950/20 p-5`}
        >
          <span className="font-mono text-xs text-gray-500">
            fontFamily: var(--font-demo) → Roboto Slab
          </span>
          {/* …and consumed here via the CSS variable */}
          <p
            style={{ fontFamily: 'var(--font-demo)' }}
            className="text-2xl text-gray-100"
          >
            {SAMPLE}
          </p>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-xs leading-6 text-gray-500">
            <span className="font-semibold text-gray-400">Why variables:</span>{' '}
            they compose well with utility CSS and let you map a font into a
            design token (e.g. Tailwind&apos;s{' '}
            <code className="font-mono text-gray-400">--font-sans</code>) so all
            your <code className="font-mono text-gray-400">font-sans</code>{' '}
            usage picks it up.
          </p>
        </div>
      </div>
    </Boundary>
  );
}
