import { fetchProductsFromService } from '#/lib/products-service';

// A proxy / BFF (Backend For Frontend) endpoint.
//
// The Client Cart can't reach the external service directly — that would leak
// the secret API key into the browser. So it calls this route instead. This
// route runs on the server, talks to the external service with the secret, and
// returns only the safe data to the browser.
export async function GET() {
  console.log(
    `[api/cart] GET called from the browser — proxying to the external service`,
  );

  const items = await fetchProductsFromService('api/cart (browser request)');

  return Response.json({ items });
}
