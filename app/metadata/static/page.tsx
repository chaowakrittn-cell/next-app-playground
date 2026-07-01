import { Boundary } from '#/ui/boundary';
import { type Metadata } from 'next';

// Static metadata: exported from a page/layout, known at build time.
// The root layout's title template turns this into
// "Static Metadata Demo | Next.js Playground".
export const metadata: Metadata = {
  title: 'Static Metadata Demo',
  description: 'A page whose title and description come from a static export.',
};

export default function Page() {
  return (
    <Boundary label="static/page.tsx (Server Environment)">
      <div className="flex flex-col gap-6">
        <p className="text-sm leading-7 text-gray-300">
          This page exports a static{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            metadata
          </code>{' '}
          object. Next.js turned it into{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            &lt;title&gt;
          </code>{' '}
          and{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            &lt;meta name=&quot;description&quot;&gt;
          </code>{' '}
          tags.
        </p>

        <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-xs leading-6 text-gray-400">
{`import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Static Metadata Demo',
  description: 'A page whose title comes from a static export.',
}`}
        </pre>

        <div className="rounded-lg border border-blue-900/50 bg-blue-950/20 p-4">
          <p className="text-sm text-gray-300">
            👀 Look at this <strong className="text-gray-100">browser tab</strong> — it reads{' '}
            <code className="font-mono text-blue-300">
              Static Metadata Demo | Next.js Playground
            </code>
            . The <code className="font-mono text-gray-400">| Next.js Playground</code>{' '}
            suffix comes from a title{' '}
            <strong className="text-gray-300">template</strong>.
          </p>
          <p className="mt-2 text-xs leading-6 text-gray-400">
            <span className="font-semibold text-gray-300">Gotcha:</span> a title
            template applies only to the <strong className="text-gray-300">immediate child</strong>{' '}
            segment. This page is a <em>grandchild</em> of the root, so the
            root&apos;s template doesn&apos;t reach it directly — the{' '}
            <code className="font-mono text-gray-400">metadata/layout.tsx</code>{' '}
            re-declares the template (via{' '}
            <code className="font-mono text-gray-400">title.default</code> +{' '}
            <code className="font-mono text-gray-400">title.template</code>) so
            its pages get the suffix.
          </p>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-xs leading-6 text-gray-500">
            <span className="font-semibold text-gray-400">Tip:</span> View Page
            Source (or the Elements panel&apos;s{' '}
            <code className="font-mono text-gray-400">&lt;head&gt;</code>) to see
            the generated tags. Metadata exports work only in{' '}
            <strong className="text-gray-300">Server Components</strong>.
          </p>
        </div>
      </div>
    </Boundary>
  );
}
