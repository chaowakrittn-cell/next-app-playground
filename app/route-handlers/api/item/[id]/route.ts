import { type NextRequest } from 'next/server';

// A dynamic segment [id]. The second argument carries the route params.
// (You can also type it with the global RouteContext<'/path/[id]'> helper.)
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  return Response.json({ id, message: `You requested item ${id}` });
}
