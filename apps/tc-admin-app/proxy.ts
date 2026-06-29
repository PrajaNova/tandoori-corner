import { type NextRequest, NextResponse } from "next/server";

import { ADMIN_SESSION_COOKIE, adminSessionValue } from "./lib/admin-session";

const PUBLIC_PATHS = ["/login", "/api/login", "/favicon.ico", "/tc-logo.png"];

export async function proxy(request: NextRequest) {
  const { pathname, search } = request.nextUrl;
  if (PUBLIC_PATHS.includes(pathname) || pathname.startsWith("/_next/")) {
    return NextResponse.next();
  }

  const token = process.env.ADMIN_API_TOKEN;
  if (token) {
    const expected = await adminSessionValue(token);
    if (request.cookies.get(ADMIN_SESSION_COOKIE)?.value === expected) {
      return NextResponse.next();
    }
  }

  const url = new URL("/login", request.url);
  url.searchParams.set("next", `${pathname}${search}`);
  return NextResponse.redirect(url);
}
