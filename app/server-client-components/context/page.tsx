import { Boundary } from '#/ui/boundary';
import { ThemeProvider } from './theme-provider';
import { ThemedBox } from './themed-box';

// This page is a Server Component. It renders a Client Component provider
// directly, and any Client Components inside can consume the context.
export default function Page() {
  return (
    <Boundary label="context/page.tsx (Server Environment)">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <p className="text-sm leading-7 text-gray-300">
            React context is commonly used to share global state like the
            current theme — but it is{' '}
            <strong className="text-gray-100">not supported in Server Components</strong>.
            To use context, create a Client Component provider that accepts{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
              children
            </code>
            .
          </p>
          <p className="text-sm leading-7 text-gray-300">
            A Server Component (like this page or a layout) can then render the
            provider directly, and all Client Components inside can consume the
            context.
          </p>
          <p className="rounded-lg border border-gray-800 bg-gray-900/50 px-4 py-3 text-sm text-gray-500">
            <span className="font-semibold text-gray-400">Good to know:</span>{' '}
            Render providers as deep as possible in the tree — wrap only the
            children that need the context, not the entire document, so Next.js
            can keep more of your Server Components static.
          </p>
        </div>

        <Boundary
          label="theme-provider.tsx (Client Environment)"
          color="blue"
          animateRerendering={false}
        >
          {/* Client Component provider rendered from a Server Component */}
          <ThemeProvider>
            <div className="flex flex-col gap-3">
              <p className="text-xs text-gray-500">
                The box below is a separate Client Component consuming the
                provider&apos;s context.
              </p>
              <ThemedBox />
            </div>
          </ThemeProvider>
        </Boundary>
      </div>
    </Boundary>
  );
}
