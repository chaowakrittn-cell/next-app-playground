import { Boundary } from '#/ui/boundary';
import { SwrPosts } from './swr-posts';

export default function Page() {
  return (
    <Boundary label="use-swr/page.tsx (Server Environment)">
      <div className="flex flex-col gap-6">
        <p className="text-sm leading-7 text-gray-300">
          Community libraries like <strong className="text-gray-100">SWR</strong>{' '}
          and React Query wrap client-side fetching with their own caching and
          revalidation. SWR gives you{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            data
          </code>
          ,{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            error
          </code>
          , and{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            isLoading
          </code>{' '}
          out of the box — no manual{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            useState
          </code>{' '}
          /{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            useEffect
          </code>{' '}
          plumbing.
        </p>

        <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-xs leading-6 text-gray-400">
{`'use client'
import useSWR from 'swr'

const fetcher = (url) => fetch(url).then((r) => r.json())

const { data, error, isLoading } = useSWR('/api/posts', fetcher)`}
        </pre>

        <Boundary color="blue" animateRerendering={false}>
          <SwrPosts />
        </Boundary>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-xs leading-6 text-gray-500">
            <span className="font-semibold text-gray-400">Try it:</span> hit{' '}
            <code className="font-mono text-gray-400">Refresh</code> to
            revalidate (
            <code className="font-mono text-gray-400">mutate()</code>), or switch
            to another tab and back — SWR shows the{' '}
            <strong className="text-gray-300">cached</strong> data instantly,
            then revalidates in the background. It also refetches automatically
            on window focus and network reconnect. Watch{' '}
            <code className="font-mono text-gray-400">[api/posts]</code> in the
            terminal and the requests in the Network tab.
          </p>
        </div>
      </div>
    </Boundary>
  );
}
