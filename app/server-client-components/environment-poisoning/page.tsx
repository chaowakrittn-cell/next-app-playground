import { Boundary } from '#/ui/boundary';
import { ClientEnv } from './client-env';

export default function Page() {
  // On the server, both env vars are fully available.
  const serverSecret = process.env.SECRET_SERVER_VALUE ?? '(not set)';
  const serverPublic = process.env.NEXT_PUBLIC_DEMO_VALUE ?? '(not set)';

  return (
    <Boundary label="environment-poisoning/page.tsx (Server Environment)">
      <div className="flex flex-col gap-8">
        <div className="flex flex-col gap-4">
          <p className="text-sm leading-7 text-gray-300">
            JavaScript modules can be shared between Server and Client
            Components. This means it&apos;s possible to{' '}
            <strong className="text-gray-100">accidentally import
            server-only code into the client</strong> — for example, a data
            function that uses a secret API key.
          </p>
          <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-xs leading-6 text-gray-400">
{`export async function getData() {
  const res = await fetch('https://external-service.com/data', {
    headers: { authorization: `}<span className="text-pink-400">{`process.env.API_KEY`}</span>{` },
  })
  return res.json()
}`}
          </pre>
          <p className="text-sm leading-7 text-gray-300">
            In Next.js, only env vars prefixed with{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
              NEXT_PUBLIC_
            </code>{' '}
            are included in the client bundle. Anything else is replaced with an
            empty string on the client. So even if the function above is
            imported into a Client Component, the key would be empty — but the
            code would still run and fail confusingly.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Boundary
            label="read on the server"
            kind="solid"
            animateRerendering={false}
          >
            <div className="flex flex-col gap-3">
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-gray-400">
                Server Environment
              </span>
              <dl className="flex flex-col gap-2 text-sm">
                <div className="flex items-center justify-between gap-4">
                  <dt className="font-mono text-xs text-gray-400">
                    SECRET_SERVER_VALUE
                  </dt>
                  <dd className="font-mono text-xs text-green-400">
                    {serverSecret}
                  </dd>
                </div>
                <div className="flex items-center justify-between gap-4">
                  <dt className="font-mono text-xs text-gray-400">
                    NEXT_PUBLIC_DEMO_VALUE
                  </dt>
                  <dd className="font-mono text-xs text-green-400">
                    {serverPublic}
                  </dd>
                </div>
              </dl>
              <p className="text-xs text-gray-500">
                On the server, both values are available — secrets included.
              </p>
            </div>
          </Boundary>

          <Boundary color="blue" animateRerendering={false}>
            <ClientEnv />
          </Boundary>
        </div>

        <div className="flex flex-col gap-4">
          <h2 className="text-sm font-semibold text-gray-200">
            The{' '}
            <code className="rounded bg-gray-800 px-1.5 py-0.5 font-mono text-xs text-gray-100">
              server-only
            </code>{' '}
            guard
          </h2>
          <p className="text-sm leading-7 text-gray-300">
            Stripping the value isn&apos;t enough — you want to prevent the
            import entirely. Add the{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
              server-only
            </code>{' '}
            package at the top of any module that must never run in the browser.
            If a Client Component tries to import it, you get a{' '}
            <strong className="text-gray-100">build-time error</strong> instead
            of a silent runtime bug.
          </p>
          <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-xs leading-6 text-gray-400">
<span className="text-blue-400">{`import 'server-only'`}</span>{`

export async function getData() {
  // uses process.env.API_KEY safely — server only
}`}
          </pre>
          <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-4">
            <p className="text-sm leading-6 text-gray-500">
              <span className="font-semibold text-gray-400">
                Already in this demo:
              </span>{' '}
              <code className="font-mono text-xs text-gray-300">
                lib/products-service.ts
              </code>{' '}
              (used by the Interleaving tab) starts with{' '}
              <code className="font-mono text-xs text-blue-400">
                import &apos;server-only&apos;
              </code>
              . Try importing{' '}
              <code className="font-mono text-xs text-gray-300">
                fetchProductsFromService
              </code>{' '}
              into a{' '}
              <code className="font-mono text-xs text-gray-300">
                &apos;use client&apos;
              </code>{' '}
              component and the build will fail — that&apos;s the guard working.
            </p>
          </div>
          <p className="text-sm leading-7 text-gray-300">
            The matching{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
              client-only
            </code>{' '}
            package does the reverse — it marks modules that depend on
            browser-only APIs (like{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
              window
            </code>
            ) so they can never be imported into a Server Component.
          </p>
        </div>
      </div>
    </Boundary>
  );
}
