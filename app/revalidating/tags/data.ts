import 'server-only';

import { cacheLife, cacheTag } from 'next/cache';

// Stand-in for data in a database.
let count = 0;

export function getActualCount(): number {
  return count;
}

export function bumpCount(): void {
  count += 1;
}

// A cached read tagged 'reval-count'. cacheLife('max') keeps it from
// time-revalidating during the demo, so ONLY tag invalidation refreshes it.
export async function getTaggedCount(): Promise<{ count: number; at: string }> {
  'use cache';
  cacheTag('reval-count');
  cacheLife('max');
  return { count, at: new Date().toISOString() };
}
