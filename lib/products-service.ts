// Simulates a third-party data service that requires a secret API key.
//
// `import 'server-only'` guarantees this module can never be bundled into a
// Client Component — if you try, you get a build-time error. That keeps the
// API key on the server, where it belongs.
import 'server-only';

import db from './db';

// In a real app this would be a secret from your environment. Anything not
// prefixed with NEXT_PUBLIC_ is stripped from the client bundle by Next.js.
const API_KEY = process.env.PRODUCTS_API_KEY ?? 'sk_demo_super_secret_key';

export type ServiceItem = { id: string; name: string; price: number };

export async function fetchProductsFromService(
  caller: string,
): Promise<ServiceItem[]> {
  console.log(
    `[external service] called by "${caller}" using API key "${API_KEY.slice(
      0,
      7,
    )}…" — runs on the server only`,
  );

  // Simulate latency talking to the external service.
  await new Promise((resolve) => setTimeout(resolve, 600));

  return db.product.findMany({ limit: 3 }).map((p) => ({
    id: p.id,
    name: p.name,
    price: p.price,
  }));
}
