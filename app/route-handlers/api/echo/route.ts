import { type NextRequest, NextResponse } from 'next/server';

// GET reads query params from the request URL.
export async function GET(request: NextRequest) {
  const msg = request.nextUrl.searchParams.get('msg') ?? '(no msg param)';
  return NextResponse.json({ method: 'GET', msg });
}

// POST reads the JSON body.
export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => ({}));
  return NextResponse.json({ method: 'POST', received: body });
}
