'use server';

import { revalidateTag, updateTag } from 'next/cache';
import { bumpCount } from './data';

// Mutate only — the tagged cache is NOT invalidated, so it goes stale.
export async function bumpOnly() {
  bumpCount();
}

// revalidateTag — stale-while-revalidate. Serves stale, refreshes in the
// background. Works in Server Actions and Route Handlers.
export async function bumpWithRevalidateTag() {
  bumpCount();
  // Second arg = how long stale content may be served while fresh generates.
  revalidateTag('reval-count', 'max');
}

// updateTag — immediately expires the tag so the user sees their write right
// away (read-your-own-writes). Server Actions only.
export async function bumpWithUpdateTag() {
  bumpCount();
  updateTag('reval-count');
}
