import { Boundary } from '#/ui/boundary';
import { Cart } from './cart';
import { ClientCart } from './client-cart';
import { Modal } from './modal';

export default function Page() {
  return (
    <Boundary label="interleaving/page.tsx (Server Environment)">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <p className="text-sm leading-7 text-gray-300">
            You can pass a Server Component as a prop (commonly{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
              children
            </code>
            ) to a Client Component. The two carts below are both rendered
            inside the same Client{' '}
            <code className="rounded bg-gray-800 px-1 py-0.5 font-mono text-xs text-gray-200">
              &lt;Modal&gt;
            </code>
            , but one is a Server Component and one is a Client Component — and
            they reach the data in completely different ways.
          </p>
          <p className="text-sm leading-7 text-gray-300">
            The data lives in an{' '}
            <strong className="text-gray-100">external service</strong> that
            needs a secret API key. That key must never reach the browser.
          </p>
          <pre className="overflow-x-auto rounded-lg border border-gray-800 bg-gray-950/60 p-4 font-mono text-xs leading-6 text-gray-400">
{`External service (needs secret API key)   `}<span className="text-gray-600">{`// server-only`}</span>{`
        ▲                       ▲
   `}<span className="text-gray-300">{`Server Cart`}</span>{`              `}<span className="text-gray-300">{`/api/cart`}</span>{`  `}<span className="text-gray-600">{`// proxy / BFF`}</span>{`
   calls it directly            ▲
   on the server           `}<span className="text-blue-400">{`Client Cart`}</span>{`  `}<span className="text-gray-600">{`// fetch() from browser`}</span>
          </pre>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Case 1: Server Component cart passed as children */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs font-semibold text-gray-300">
                Cart is a Server Component
              </span>
              <ul className="flex flex-col gap-1 pl-3 text-xs text-gray-500">
                <li>Calls the external service directly with the secret key</li>
                <li>No API route, no browser request; data ready at render</li>
                <li>Ships zero JavaScript; not interactive</li>
              </ul>
            </div>
            <Boundary
              label="modal.tsx (Client Environment)"
              color="blue"
              animateRerendering={false}
            >
              <Modal>
                {/* Rendered on the server, handed to Modal as output */}
                <Cart />
              </Modal>
            </Boundary>
          </div>

          {/* Case 2: Client Component cart */}
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <span className="font-mono text-xs font-semibold text-blue-400">
                Cart is a Client Component
              </span>
              <ul className="flex flex-col gap-1 pl-3 text-xs text-gray-500">
                <li>Can&apos;t see the secret — calls our /api/cart proxy</li>
                <li>Fetches in the browser after mount; shows a loader</li>
                <li>Ships JS; interactive quantity steppers</li>
              </ul>
            </div>
            <Boundary
              label="modal.tsx (Client Environment)"
              color="blue"
              animateRerendering={false}
            >
              <Modal>
                {/* Client Component — fetches its own data from /api/cart */}
                <ClientCart />
              </Modal>
            </Boundary>
          </div>
        </div>

        <div className="flex flex-col gap-3 rounded-lg border border-gray-800 bg-gray-900/50 p-4">
          <p className="text-sm leading-6 text-gray-500">
            <span className="font-semibold text-gray-400">Takeaway:</span> Both
            carts ultimately read from the same external service, but the
            browser only ever talks to{' '}
            <code className="font-mono text-gray-300">/api/cart</code>. The
            secret API key is used on the server in both paths and never reaches
            the client — that&apos;s why the Client Cart needs a proxy instead
            of calling the service itself.
          </p>
          <p className="font-mono text-xs leading-6 text-gray-500">
            <span className="text-gray-400">Watch it happen:</span> open your{' '}
            <strong className="text-gray-300">terminal</strong>, the{' '}
            <strong className="text-gray-300">browser console</strong>, and the{' '}
            <strong className="text-gray-300">Network tab</strong>, then open
            each cart.
          </p>
          <ul className="flex flex-col gap-2 pl-3 font-mono text-xs text-gray-500">
            <li>
              <span className="text-gray-300">Server Cart</span> → terminal logs{' '}
              <code className="text-gray-300">[server cart]</code> then{' '}
              <code className="text-gray-300">[external service]</code>. Nothing
              in the browser console or Network tab.
            </li>
            <li>
              <span className="text-blue-400">Client Cart</span> → browser
              console logs{' '}
              <code className="text-blue-400">[client cart]</code>; Network tab
              shows a <code className="text-gray-300">/api/cart</code> request
              (no API key in it); terminal logs{' '}
              <code className="text-gray-300">[api/cart]</code> then{' '}
              <code className="text-gray-300">[external service]</code>.
            </li>
          </ul>
        </div>
      </div>
    </Boundary>
  );
}
