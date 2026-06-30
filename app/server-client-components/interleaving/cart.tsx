import { fetchProductsFromService } from '#/lib/products-service';

// A Server Component — no 'use client'. It calls the external service DIRECTLY
// on the server, with the secret API key. No browser request, no API route in
// between. Even though it's rendered inside the <Modal> Client Component, it
// runs on the server because it's passed as children (rendered output), not
// imported into the Modal's module graph.
export async function Cart() {
  console.log('[server cart] calling the external service directly');
  const products = await fetchProductsFromService('server cart');
  const total = products.reduce((sum, p) => sum + p.price, 0);

  return (
    <div className="flex flex-col gap-3">
      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-gray-400">
        cart.tsx (Server Environment)
      </span>
      <ul className="flex flex-col gap-2">
        {products.map((product) => (
          <li
            key={product.id}
            className="flex items-center justify-between text-sm text-gray-400"
          >
            <span>{product.name}</span>
            <span className="font-mono tabular-nums text-gray-500">
              ${product.price.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
      <div className="flex items-center justify-between border-t border-gray-800 pt-2 text-sm">
        <span className="text-gray-300">Total</span>
        <span className="font-mono font-semibold tabular-nums text-gray-200">
          ${total.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
