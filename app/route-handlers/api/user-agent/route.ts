import { headers } from 'next/headers';

// Runtime data: reading headers() is request-specific, so this GET always runs
// at request time and reflects the caller's own request.
export async function GET() {
  const headersList = await headers();
  return Response.json({
    userAgent: headersList.get('user-agent'),
    kind: 'runtime',
  });
}
