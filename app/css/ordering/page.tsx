import { Boundary } from '#/ui/boundary';
// Import order matters: `first` is imported before `second`, so in the merged
// stylesheet `first`'s .fill rule comes first and `second`'s comes after.
import first from './first.module.css';
import second from './second.module.css';

export default function Page() {
  return (
    <Boundary label="ordering/page.tsx (Server Environment)">
      <div className="flex flex-col gap-6">
        <p className="text-sm leading-7 text-gray-300">
          In production, Next.js chunks and merges stylesheets. The{' '}
          <strong className="text-gray-100">order of your CSS follows the
          order you import it</strong>. A child imported before a local
          stylesheet has its CSS ordered first.
        </p>

        <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-xs leading-6 text-gray-400">
{`// page.tsx
import { BaseButton } from './base-button'  // its CSS comes first
import styles from './page.module.css'      // then this

// base-button.tsx
import styles from './base-button.module.css'`}
        </pre>
        <p className="text-xs text-gray-500">
          Here{' '}
          <code className="font-mono text-gray-400">base-button.module.css</code>{' '}
          is ordered before{' '}
          <code className="font-mono text-gray-400">page.module.css</code>{' '}
          because <code className="font-mono text-gray-400">&lt;BaseButton&gt;</code>{' '}
          is imported first.
        </p>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Live: which rule wins?
          </span>
          <p className="text-xs leading-6 text-gray-500">
            Both{' '}
            <code className="font-mono text-gray-400">first.module.css</code> and{' '}
            <code className="font-mono text-gray-400">second.module.css</code>{' '}
            define a <code className="font-mono text-gray-400">.fill</code> class
            that sets a different{' '}
            <code className="font-mono text-gray-400">background-color</code>. The
            box below has <strong className="text-gray-300">both</strong> classes
            applied.
          </p>

          <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-xs leading-6 text-gray-400">
{`import first from './first.module.css'   // .fill → blue
import second from './second.module.css'  // .fill → orange

<div className={`}<span className="text-gray-300">{'`${first.fill} ${second.fill}`'}</span>{`} />`}
          </pre>

          <div className="flex flex-col gap-3 rounded-lg border border-gray-800 bg-gray-900/40 p-4">
            <div
              className={`${first.fill} ${second.fill} flex h-20 items-center justify-center rounded-lg text-sm font-semibold text-white`}
            >
              background-color from the winning rule
            </div>
            <p className="text-xs leading-6 text-gray-500">
              The box is <strong className="text-orange-400">orange</strong>, not
              blue — <code className="font-mono text-gray-400">second.module.css</code>{' '}
              was imported <strong className="text-gray-300">last</strong>, so its{' '}
              <code className="font-mono text-gray-400">.fill</code> rule comes
              later in the merged CSS and wins the cascade (both classes have
              equal specificity). Swap the two import lines and the box turns
              blue.
            </p>
            <dl className="flex flex-col gap-1 font-mono text-xs">
              <div className="flex justify-between gap-4">
                <dt className="text-gray-500">first.fill (blue, imported 1st)</dt>
                <dd className="break-all text-gray-400">{first.fill}</dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt className="text-orange-400">second.fill (orange, imported 2nd) ✓</dt>
                <dd className="break-all text-orange-300">{second.fill}</dd>
              </div>
            </dl>
          </div>

          <p className="rounded-lg border border-amber-800/50 bg-amber-950/20 px-4 py-3 text-xs leading-6 text-gray-400">
            <span className="font-semibold text-amber-400">Verify in a build:</span>{' '}
            dev and production can order CSS differently. This "last import wins"
            result is guaranteed by{' '}
            <code className="font-mono text-gray-400">next build</code> — check
            there if it looks off in <code className="font-mono text-gray-400">next dev</code>.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Keep ordering predictable
          </span>
          <ul className="flex flex-col gap-1.5 pl-4 text-xs leading-6 text-gray-500">
            {[
              'Contain CSS imports to a single entry file where possible.',
              'Import global styles and Tailwind at the root of the app.',
              'Use Tailwind for most styling; CSS Modules for scoped custom CSS.',
              'Use a consistent naming convention like <name>.module.css.',
              'Extract shared styles into shared components to avoid duplicate imports.',
              'Turn off import auto-sorters (e.g. ESLint sort-imports) that reorder CSS imports.',
              'Tune the cssChunking option in next.config.js if you need control.',
            ].map((tip) => (
              <li key={tip}>
                <span className="mr-2 text-gray-600">—</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-amber-800/50 bg-amber-950/20 p-4">
          <p className="text-xs leading-6 text-gray-400">
            <span className="font-semibold text-amber-400">Global CSS caveat:</span>{' '}
            because Next.js integrates stylesheets with Suspense, global styles
            are <strong className="text-gray-300">not removed</strong> as you
            navigate between routes, which can cause conflicts. Reserve global
            CSS for <em>truly</em> global rules; prefer Tailwind and CSS Modules
            for component styling.
          </p>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-xs leading-6 text-gray-500">
            CSS ordering can behave differently in{' '}
            <code className="font-mono text-gray-400">next dev</code> than in
            production — always verify the final order with{' '}
            <code className="font-mono text-gray-400">next build</code>.
          </p>
        </div>
      </div>
    </Boundary>
  );
}
