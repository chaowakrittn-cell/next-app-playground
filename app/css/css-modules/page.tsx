import { Boundary } from '#/ui/boundary';
import styles from './demo.module.css';

export default function Page() {
  return (
    <Boundary label="css-modules/page.tsx (Server Environment)">
      <div className="flex flex-col gap-6">
        <p className="text-sm leading-7 text-gray-300">
          CSS Modules locally scope CSS by generating{' '}
          <strong className="text-gray-100">unique class names</strong>. Create
          a{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            .module.css
          </code>{' '}
          file and import it — you can reuse the same class name in different
          files without collisions.
        </p>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-xs leading-6 text-gray-400">
{`/* demo.module.css */
.card  { padding: 20px; /* … */ }
.title { font-weight: 600; }
.badge { border-radius: 9999px; }`}
          </pre>
          <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-xs leading-6 text-gray-400">
{`// page.tsx
import styles from './demo.module.css'

<div className={styles.card}>
  <span className={styles.badge}>…</span>
  <span className={styles.title}>…</span>
</div>`}
          </pre>
        </div>

        {/* Live: rendered with the CSS Module classes */}
        <div className={styles.card}>
          <span className={styles.badge}>CSS Module</span>
          <span className={styles.title}>Scoped card component</span>
          <span className="text-xs text-gray-500">
            This box is styled entirely by demo.module.css — no Tailwind.
          </span>
        </div>

        <div className="flex flex-col gap-2 rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
            The generated (scoped) class names
          </span>
          <dl className="flex flex-col gap-1 font-mono text-xs">
            <div className="flex justify-between gap-4">
              <dt className="text-gray-500">styles.card</dt>
              <dd className="break-all text-blue-300">{styles.card}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-gray-500">styles.title</dt>
              <dd className="break-all text-blue-300">{styles.title}</dd>
            </div>
            <div className="flex justify-between gap-4">
              <dt className="text-gray-500">styles.badge</dt>
              <dd className="break-all text-blue-300">{styles.badge}</dd>
            </div>
          </dl>
          <p className="text-xs leading-6 text-gray-500">
            Next.js rewrote your plain{' '}
            <code className="font-mono text-gray-400">.card</code> into a unique
            hashed name — that&apos;s the scoping. Another file&apos;s{' '}
            <code className="font-mono text-gray-400">.card</code> would get a
            different hash, so they never clash.
          </p>
        </div>
      </div>
    </Boundary>
  );
}
