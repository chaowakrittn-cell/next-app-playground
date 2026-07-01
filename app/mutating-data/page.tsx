import { Boundary } from '#/ui/boundary';
import Link from 'next/link';

export default function Page() {
  return (
    <Boundary label="page.tsx (Server Environment)">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="text-sm leading-7 text-gray-300">
            A <strong className="text-gray-100">Server Function</strong> is an
            async function that runs on the server and can be called from the
            client through a network request. When used to handle form
            submissions or mutations, it&apos;s called a{' '}
            <strong className="text-gray-100">Server Action</strong>. Behind the
            scenes actions use a <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">POST</code>{' '}
            request.
          </p>

          <div className="flex flex-col gap-2">
            <span className="font-mono text-xs font-semibold text-gray-400">
              Define with the &apos;use server&apos; directive
            </span>
            <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-xs leading-6 text-gray-400">
{`// app/actions.ts — every export becomes a Server Function
'use server'

export async function createPost(formData: FormData) {
  const title = formData.get('title')
  // authenticate → mutate data → revalidate cache
}`}
            </pre>
          </div>

          <ul className="flex flex-col gap-2 rounded-lg border border-gray-800 bg-gray-900/50 p-4 text-xs leading-6 text-gray-500">
            <li>
              <span className="text-gray-400">Must be async</span> — the client
              calls them over the network.
            </li>
            <li>
              <span className="text-gray-400">Can&apos;t be defined in Client Components</span>{' '}
              — but you can import and invoke them from one.
            </li>
            <li>
              <span className="text-amber-400/80">Always authenticate</span> —
              they&apos;re reachable via direct POST requests, not just your UI.
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-3">
          <span className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Ways to invoke a Server Function
          </span>
          <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
            <Link
              href="/mutating-data/form"
              className="flex flex-col gap-1 rounded-lg border border-blue-900/50 bg-blue-950/20 p-4 transition hover:border-blue-700"
            >
              <span className="font-mono text-sm font-semibold text-blue-400">
                Form →
              </span>
              <span className="text-xs text-gray-500">
                {'<form action={createMessage}>'} receives FormData
                automatically.
              </span>
            </Link>
            <Link
              href="/mutating-data/event-handler"
              className="flex flex-col gap-1 rounded-lg border border-violet-900/50 bg-violet-950/20 p-4 transition hover:border-violet-700"
            >
              <span className="font-mono text-sm font-semibold text-violet-400">
                Event Handler →
              </span>
              <span className="text-xs text-gray-500">
                Call it from onClick and use the returned value.
              </span>
            </Link>
            <Link
              href="/mutating-data/pending"
              className="flex flex-col gap-1 rounded-lg border border-green-900/50 bg-green-950/20 p-4 transition hover:border-green-700"
            >
              <span className="font-mono text-sm font-semibold text-green-400">
                Pending State →
              </span>
              <span className="text-xs text-gray-500">
                useActionState gives you a pending flag for loading UI.
              </span>
            </Link>
            <Link
              href="/mutating-data/revalidate"
              className="flex flex-col gap-1 rounded-lg border border-amber-900/50 bg-amber-950/20 p-4 transition hover:border-amber-700"
            >
              <span className="font-mono text-sm font-semibold text-amber-400">
                revalidatePath →
              </span>
              <span className="text-xs text-gray-500">
                See cached data go stale without it, and sync with it.
              </span>
            </Link>
          </div>
        </div>
      </div>
    </Boundary>
  );
}
