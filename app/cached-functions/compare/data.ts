import 'server-only';

// The shared work. The console.log fires every time this body actually runs,
// so you can watch — in your terminal — how often each version executes.
async function loadValue(tag: string) {
  console.log(`[${tag}] function body executed`);
  await new Promise((r) => setTimeout(r, 500));
  return { value: 42 };
}

// Cached: 'use cache' memoizes the result. Calling it repeatedly runs the body
// once and returns the same result — the log fires once (per cache miss).
export async function getCachedValue() {
  'use cache';
  return loadValue('cached');
}

// Not cached: every call runs the body again — the log fires every time.
export async function getUncachedValue() {
  return loadValue('uncached');
}
