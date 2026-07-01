// Dynamic: Math.random() is non-deterministic, so prerendering stops and this
// GET runs at request time — a fresh number on every call.
export async function GET() {
  return Response.json({ randomNumber: Math.random(), kind: 'dynamic' });
}
