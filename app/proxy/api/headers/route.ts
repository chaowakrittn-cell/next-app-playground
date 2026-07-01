import { headers } from 'next/headers';

// Reads the header the proxy injected into the request. If you call this route
// directly (matched by the proxy), x-proxy-demo will be present.
export async function GET() {
  const h = await headers();
  return Response.json({
    'x-proxy-demo': h.get('x-proxy-demo') ?? '(not set)',
  });
}
