'use server';

import { revalidatePath } from 'next/cache';
import { bumpCount } from './data';

// Mutates the data but does NOT revalidate — the cached read stays stale.
export async function bumpWithoutRevalidate() {
  bumpCount();
}

// Mutates the data AND revalidates the path — the cache is busted and the
// cached read recomputes, so the UI reflects the new value.
export async function bumpWithRevalidate() {
  bumpCount();
  revalidatePath('/mutating-data/revalidate');
}
