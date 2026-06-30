import { Boundary } from '#/ui/boundary';
import Link from 'next/link';

export default function Page() {
  return (
    <Boundary label="page.tsx">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="text-sm leading-7 text-gray-300">
            Traditionally, navigation to a server-rendered page triggers a full
            page load. This clears state, resets scroll position, and blocks
            interactivity.
          </p>

          <p className="text-sm leading-7 text-gray-300">
            Next.js avoids this with client-side transitions using the{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
              &lt;Link&gt;
            </code>{' '}
            component. Instead of reloading the page, it updates the content
            dynamically by:
          </p>

          <ul className="flex flex-col gap-1.5 pl-4">
            {[
              'Keeping any shared layouts and UI.',
              'Replacing the current page with the prefetched loading state or a new page if available.',
            ].map((item) => (
              <li key={item} className="text-sm leading-6 text-gray-400">
                <span className="mr-2 text-gray-600">—</span>
                {item}
              </li>
            ))}
          </ul>

          <p className="text-sm leading-7 text-gray-300">
            Client-side transitions are what makes server-rendered apps feel
            like client-rendered apps. And when paired with prefetching and
            streaming, it enables fast transitions even for dynamic routes.
          </p>

          <p className="text-sm leading-7 text-gray-300">
            Next.js also handles scrolling to the top of the page during
            client-side transitions. If content scrolls behind a sticky or
            fixed header after navigation, you can fix this with CSS{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
              scroll-padding-top
            </code>
            .
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500">
            Showcase
          </p>
          <Link
            href="/client-side-transitions/compare"
            className="flex flex-col gap-2 rounded-lg border border-gray-800 bg-gray-900/50 p-4 transition hover:border-gray-600"
          >
            <span className="font-mono text-sm font-semibold text-gray-200">
              Compare &lt;Link&gt; vs &lt;a&gt; →
            </span>
            <span className="text-xs text-gray-500">
              Increment the counter in the top-right, then navigate with each
              method to see the difference.
            </span>
          </Link>
        </div>
      </div>
    </Boundary>
  );
}
