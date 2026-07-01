import { NextResponse, type NextRequest } from 'next/server';

// Proxy (formerly Middleware) runs before a request is completed. Only ONE
// proxy file is allowed per project, at the root. The `matcher` below scopes it
// to the /proxy demo routes so the rest of the app is unaffected.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Redirect: send /proxy/go to a landing page.
  if (pathname === '/proxy/go') {
    return NextResponse.redirect(new URL('/proxy/redirected', request.url));
  }

  // Rewrite: serve /proxy/rewritten while keeping the URL as /proxy/masked.
  if (pathname === '/proxy/masked') {
    return NextResponse.rewrite(new URL('/proxy/rewritten', request.url));
  }

  // Otherwise continue, but inject a request header the app can read back.
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-proxy-demo', 'hello-from-proxy');
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  // Only run on the Proxy demo routes.
  matcher: ['/proxy/:path*'],
};
