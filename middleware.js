export function middleware(req) {
  if (req.nextUrl.pathname.startsWith("/cms")) {
    return new Response("Not Found", { status: 404 });
  }
}

export const config = {
  matcher: ["/cms/:path*"],
};
