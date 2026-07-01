import db from '#/lib/db';
import { Boundary } from '#/ui/boundary';
import { ProductCard, ProductCardSkeleton } from '#/ui/product-card';
import { connection } from 'next/server';
import { Suspense } from 'react';

// Same code as the cached page — but WITHOUT the 'use cache' directive.
// Because there's no cache, this must render at request time, so the 1s delay
// happens on EVERY visit. It's wrapped in <Suspense> so the shell can stream.
export default function Page() {
  return (
    <Boundary label="uncached/page.tsx (Not Cacheable)" color="pink">
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList />
      </Suspense>
    </Boundary>
  );
}

async function ProductList() {
  // connection() defers this to request time, so it isn't baked into the
  // static shell — it re-runs (delay included) on every request.
  await connection();

  // DEMO: the same 1s delay as the cached page.
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const products = db.product.findMany({ limit: 9 });
  // Fresh on every request — nothing is cached.
  const renderedAt = new Date().toISOString();

  return (
    <Boundary label="<ProductList>" size="small" color="pink">
      <div className="flex flex-col gap-4">
        <div className="flex items-baseline justify-between gap-4">
          <h1 className="text-xl font-semibold text-gray-300">
            All{' '}
            <span className="font-mono tracking-tighter text-gray-600">
              ({products.length})
            </span>
          </h1>
          <span className="font-mono text-xs text-pink-300">
            rendered {renderedAt}
          </span>
        </div>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} animateEnter={true} />
          ))}
        </div>
      </div>
    </Boundary>
  );
}

function ProductListSkeleton() {
  return (
    <Boundary label="<ProductList>" size="small" color="pink">
      <div className="flex flex-col gap-4">
        <h1 className="text-xl font-semibold text-gray-600">All</h1>
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <ProductCardSkeleton />
          <ProductCardSkeleton />
          <ProductCardSkeleton />
        </div>
      </div>
    </Boundary>
  );
}
