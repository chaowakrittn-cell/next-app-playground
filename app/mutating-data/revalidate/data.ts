import 'server-only';

import { cacheTag } from 'next/cache';

// A counter standing in for data in a database.
let count = 0;

// Read the live value straight from the store (uncached).
export function getActualCount(): number {
  return count;
}

export function bumpCount(): void {
  count += 1;
}

// A cached read. Because of 'use cache', the result is memoized and reused on
// every render until the cache is invalidated. The captured timestamp shows
// when the cache entry was last (re)computed.
export async function getCachedCount(): Promise<{ count: number; at: string }> {
  'use cache';
  cacheTag('revalidate-demo');
  return { count, at: new Date().toISOString() };
}
