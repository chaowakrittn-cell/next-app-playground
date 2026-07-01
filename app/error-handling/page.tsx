import { Boundary } from '#/ui/boundary';
import Link from 'next/link';

export default function Page() {
  return (
    <Boundary label="page.tsx (Server Environment)">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="text-sm leading-7 text-gray-300">
            Errors fall into two categories, and each is handled differently:
          </p>
          <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
            <div className="flex flex-col gap-2 rounded-lg border border-blue-900/50 bg-blue-950/20 p-5">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400">
                Expected errors
              </span>
              <p className="text-xs leading-6 text-gray-400">
                Normal-operation failures: form validation, a failed request.
                Don&apos;t throw — <strong className="text-gray-300">model
                them as return values</strong> and show them to the user.
              </p>
              <p className="text-xs text-gray-500">
                Tools: return a value +{' '}
                <code className="font-mono text-gray-400">useActionState</code>,
                conditional render / <code className="font-mono text-gray-400">redirect</code>,{' '}
                <code className="font-mono text-gray-400">notFound()</code>.
              </p>
            </div>
            <div className="flex flex-col gap-2 rounded-lg border border-red-900/50 bg-red-950/20 p-5">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-red-400">
                Uncaught exceptions
              </span>
              <p className="text-xs leading-6 text-gray-400">
                Unexpected bugs that shouldn&apos;t happen normally.{' '}
                <strong className="text-gray-300">Throw them</strong> — an error
                boundary catches them and shows a fallback UI.
              </p>
              <p className="text-xs text-gray-500">
                Tools:{' '}
                <code className="font-mono text-gray-400">error.tsx</code>,{' '}
                <code className="font-mono text-gray-400">global-error.tsx</code>,{' '}
                <code className="font-mono text-gray-400">unstable_catchError</code>.
              </p>
            </div>
          </div>
          <p className="rounded-lg border border-gray-800 bg-gray-900/50 px-4 py-3 text-sm text-gray-500">
            <span className="font-semibold text-gray-400">Key rule:</span> error
            boundaries only catch errors thrown{' '}
            <strong className="text-gray-300">during rendering</strong> — not
            errors inside event handlers or async callbacks. Those you catch
            manually.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Explore
          </span>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            <Link
              href="/error-handling/expected"
              className="flex flex-col gap-1 rounded-lg border border-blue-900/50 bg-blue-950/20 p-4 transition hover:border-blue-700"
            >
              <span className="font-mono text-sm font-semibold text-blue-400">
                Expected →
              </span>
              <span className="text-xs text-gray-500">
                Server Action returns an error; useActionState shows it.
              </span>
            </Link>
            <Link
              href="/error-handling/uncaught"
              className="flex flex-col gap-1 rounded-lg border border-red-900/50 bg-red-950/20 p-4 transition hover:border-red-700"
            >
              <span className="font-mono text-sm font-semibold text-red-400">
                Uncaught →
              </span>
              <span className="text-xs text-gray-500">
                A render error caught by error.tsx, with a Try again button.
              </span>
            </Link>
            <Link
              href="/error-handling/event-handler"
              className="flex flex-col gap-1 rounded-lg border border-orange-900/50 bg-orange-950/20 p-4 transition hover:border-orange-700"
            >
              <span className="font-mono text-sm font-semibold text-orange-400">
                Event Handler →
              </span>
              <span className="text-xs text-gray-500">
                Why boundaries miss onClick errors, and how to catch them.
              </span>
            </Link>
          </div>
        </div>
      </div>
    </Boundary>
  );
}
