// Static: no runtime or non-deterministic data, so with Cache Components this
// GET is prerendered at build time. The response is always identical.
export async function GET() {
  return Response.json({ projectName: 'Next.js', kind: 'static' });
}
