'use client';

import { useEffect, useState } from 'react';

type CartItem = { id: string; name: string; price: number };

// A Client Component version of the cart.
// It CANNOT query the server-only `db`, so it fetches data over HTTP from the
// /api/cart endpoint — in the browser, after mount. That means: a network
// round-trip, a loading state, and a request you can see in the Network tab.
export function ClientCart() {
  const [items, setItems] = useState<CartItem[] | null>(null);
  const [quantities, setQuantities] = useState<Record<string, number>>({});

  useEffect(() => {
    console.log('[client cart] calling /api/cart from the browser…');
    fetch('/api/cart')
      .then((res) => res.json())
      .then((data: { items: CartItem[] }) => {
        console.log('[client cart] received data from /api/cart');
        setItems(data.items);
        setQuantities(Object.fromEntries(data.items.map((i) => [i.id, 1])));
      });
  }, []);

  if (!items) {
    return (
      <div className="flex flex-col gap-3">
        <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400">
          client-cart.tsx (Client Environment)
        </span>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <span className="inline-block size-3 animate-spin rounded-full border border-gray-600 border-t-transparent" />
          Fetching from /api/cart…
        </div>
      </div>
    );
  }

  const total = items.reduce(
    (sum, item) => sum + item.price * (quantities[item.id] ?? 0),
    0,
  );

  const setQty = (id: string, delta: number) =>
    setQuantities((q) => ({
      ...q,
      [id]: Math.max(0, (q[id] ?? 0) + delta),
    }));

  return (
    <div className="flex flex-col gap-3">
      <span className="font-mono text-xs font-semibold uppercase tracking-wider text-blue-400">
        client-cart.tsx (Client Environment)
      </span>
      <ul className="flex flex-col gap-2">
        {items.map((item) => (
          <li
            key={item.id}
            className="flex items-center justify-between text-sm text-gray-400"
          >
            <span>{item.name}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQty(item.id, -1)}
                className="size-5 rounded bg-gray-700 text-xs font-semibold text-gray-200 hover:bg-gray-600"
              >
                −
              </button>
              <span className="w-4 text-center font-mono tabular-nums text-gray-300">
                {quantities[item.id]}
              </span>
              <button
                onClick={() => setQty(item.id, 1)}
                className="size-5 rounded bg-gray-700 text-xs font-semibold text-gray-200 hover:bg-gray-600"
              >
                +
              </button>
              <span className="w-16 text-right font-mono tabular-nums text-gray-500">
                ${(item.price * (quantities[item.id] ?? 0)).toFixed(2)}
              </span>
            </div>
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
