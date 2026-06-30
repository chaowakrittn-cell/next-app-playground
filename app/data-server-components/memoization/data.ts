import 'server-only';

import { cache } from 'react';

type User = { id: string; name: string };

async function loadUser(tag: string): Promise<User> {
  // This log fires every time the function BODY actually runs.
  console.log(`[${tag}] fetch body executed`);
  await new Promise((r) => setTimeout(r, 300));
  return { id: '1', name: 'Ada Lovelace' };
}

// Wrapped in React.cache → memoized per request. Calling it many times in the
// same request runs the body once and returns the same result reference.
export const getUserCached = cache(() => loadUser('cached'));

// Not memoized → every call runs the body again and returns a new object.
export const getUserUncached = () => loadUser('uncached');
