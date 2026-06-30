import { Boundary } from '#/ui/boundary';
import Link from 'next/link';

const ITEMS = Array.from({ length: 20 }, (_, i) => ({
  id: i + 1,
  label: `Item #${i + 1}`,
}));

export default function Page() {
  return (
    <Boundary label="scroll-restore/page.tsx">
      <div className="flex flex-col gap-4">
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-sm text-gray-400">
            <span className="font-semibold text-gray-200">How to observe:</span>{' '}
            Scroll down and click any item. On the detail page, use the{' '}
            <strong className="text-gray-300">browser back button</strong> — you
            will land back at the exact scroll position you left.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {ITEMS.map((item) => (
            <Link
              key={item.id}
              href={`/client-side-transitions/scroll-restore/${item.id}`}
              className="flex items-center justify-between rounded-lg border border-gray-800 bg-gray-900/30 px-4 py-3 transition hover:border-gray-600 hover:bg-gray-900"
            >
              <div className="flex items-center gap-3">
                <span className="font-mono text-xs text-gray-600">
                  #{item.id}
                </span>
                <span className="text-sm text-gray-400">{item.label}</span>
              </div>
              <span className="text-xs text-gray-600">→</span>
            </Link>
          ))}
        </div>
      </div>
    </Boundary>
  );
}
