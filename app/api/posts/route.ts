// A simple API endpoint the Client Component can call over HTTP from the
// browser (Client Components can't read the db directly).
export async function GET() {
  console.log('[api/posts] GET called from the browser');

  // Simulate latency so the client-side loading state is visible.
  await new Promise((r) => setTimeout(r, 900));

  const posts = [
    { id: '1', title: 'Fetching in Client Components' },
    { id: '2', title: 'The use API' },
    { id: '3', title: 'When to fetch on the client' },
  ];

  return Response.json({ posts });
}
