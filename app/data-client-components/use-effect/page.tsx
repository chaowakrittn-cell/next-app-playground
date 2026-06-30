import { Boundary } from '#/ui/boundary';
import { BlogList } from './blog-list';

export default function Page() {
  return (
    <Boundary label="use-effect/page.tsx (Server Environment)">
      <div className="flex flex-col gap-6">
        <p className="text-sm leading-7 text-gray-300">
          A Client Component can&apos;t read the database directly, so it
          fetches from an API endpoint in the browser. With{' '}
          <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
            useEffect
          </code>{' '}
          you manage the loading and error states yourself. Open the{' '}
          <strong className="text-gray-100">Network tab</strong> and the{' '}
          <strong className="text-gray-100">browser console</strong> — the
          request fires from the client after the component mounts.
        </p>

        <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-xs leading-6 text-gray-400">
{`'use client'
const [posts, setPosts] = useState(null)
useEffect(() => {
  fetch('/api/posts').then(r => r.json()).then(setPosts)
}, [])`}
        </pre>

        <Boundary
          label="blog-list.tsx (Client Environment)"
          color="blue"
          animateRerendering={false}
        >
          <BlogList />
        </Boundary>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-xs leading-6 text-gray-500">
            <span className="font-semibold text-gray-400">Compare with the use API tab:</span>{' '}
            there the server starts the fetch and the data streams in with the
            page. Here, nothing is fetched until the browser has downloaded,
            parsed, and run the JS — then it makes a second round-trip to{' '}
            <code className="font-mono text-gray-400">/api/posts</code>. For
            interactive or real-time data that&apos;s the right trade-off; for
            initial page data, prefer the server.
          </p>
        </div>
      </div>
    </Boundary>
  );
}
