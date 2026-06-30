import { Boundary } from '#/ui/boundary';
import { Counter } from './counter';

export default function Page() {
  return (
    <Boundary label="use-client/page.tsx (Server Environment)">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <p className="text-sm leading-7 text-gray-300">
            Create a Client Component by adding the{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
              &apos;use client&apos;
            </code>{' '}
            directive at the top of the file, above your imports. It declares a{' '}
            <strong className="text-gray-100">boundary</strong> between the
            Server and Client module graphs.
          </p>
          <p className="text-sm leading-7 text-gray-300">
            Once a file is marked{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
              &apos;use client&apos;
            </code>
            , all of its imports and the components it directly renders are
            included in the client bundle — so you don&apos;t need to add the
            directive to every child component.
          </p>
          <p className="rounded-lg border border-gray-800 bg-gray-900/50 px-4 py-3 text-sm text-gray-500">
            <span className="font-semibold text-gray-400">Tip:</span> To reduce
            JS bundle size, add{' '}
            <code className="font-mono text-xs text-gray-300">
              &apos;use client&apos;
            </code>{' '}
            to the smallest interactive leaf components rather than marking large
            layout trees as client.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            This page is a Server Component
          </p>
          <Boundary
            label="counter.tsx (Client Environment)"
            color="blue"
            animateRerendering={false}
          >
            <div className="flex flex-col gap-3">
              <p className="text-xs text-gray-500">
                The button below is interactive because{' '}
                <code className="font-mono text-blue-400">counter.tsx</code>{' '}
                starts with{' '}
                <code className="font-mono text-blue-400">
                  &apos;use client&apos;
                </code>
                . The page rendering it stays a Server Component.
              </p>
              <Counter />
            </div>
          </Boundary>
        </div>
      </div>
    </Boundary>
  );
}
