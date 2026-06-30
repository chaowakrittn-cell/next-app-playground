import { Boundary } from '#/ui/boundary';
import {
  LinkWithDebounce,
  LinkWithStatus,
  PlainLink,
} from './link-variants';

export default function Page() {
  return (
    <Boundary label="link-status/page.tsx">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="text-sm leading-7 text-gray-300">
            On slow or unstable networks, prefetching may not finish before the
            user clicks a link. In these cases, the{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
              loading.tsx
            </code>{' '}
            fallback may not appear immediately because it hasn&apos;t been
            prefetched yet.
          </p>
          <p className="text-sm leading-7 text-gray-300">
            Use the{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
              useLinkStatus
            </code>{' '}
            hook to show immediate feedback on the link itself while the
            transition is in progress.
          </p>
          <p className="text-sm leading-7 text-gray-300">
            You can <strong className="text-gray-200">debounce</strong> the
            indicator with a CSS animation delay (e.g. 150ms) so it only
            appears if the navigation takes longer than expected — avoiding
            unnecessary flicker on fast connections.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <div className="flex flex-col gap-3 rounded-lg border border-gray-800 bg-gray-900/50 p-5">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs font-semibold text-gray-300">
                Plain &lt;Link&gt;
              </span>
              <p className="text-xs text-gray-500">
                No feedback on click. If prefetch hasn&apos;t finished, the UI
                appears frozen until the server responds.
              </p>
            </div>
            <PlainLink />
          </div>

          <div className="flex flex-col gap-3 rounded-lg border border-blue-900/50 bg-blue-950/20 p-5">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs font-semibold text-blue-400">
                useLinkStatus
              </span>
              <p className="text-xs text-gray-500">
                Spinner appears immediately on click regardless of prefetch
                state. Always gives feedback.
              </p>
            </div>
            <LinkWithStatus />
          </div>

          <div className="flex flex-col gap-3 rounded-lg border border-violet-900/50 bg-violet-950/20 p-5">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs font-semibold text-violet-400">
                useLinkStatus + debounce
              </span>
              <p className="text-xs text-gray-500">
                Spinner only appears after 150ms. Fast navigations show no
                spinner — no unnecessary flicker.
              </p>
            </div>
            <LinkWithDebounce />
          </div>
        </div>

        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-xs text-gray-500">
            <span className="font-semibold text-gray-400">How to observe:</span>{' '}
            Open DevTools → Network → set throttling to{' '}
            <strong className="text-gray-300">Slow 3G</strong>, then click each
            button. The plain link appears frozen; the other two give immediate
            feedback.
          </p>
        </div>
      </div>
    </Boundary>
  );
}
