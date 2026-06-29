import { NextResponse } from "next/server";

import {
  ADMIN_SESSION_COOKIE,
  adminSessionValue,
  safeNextPath,
} from "@/lib/admin-session";

export async function POST(request: Request) {
  const form = await request.formData();
  const password = String(form.get("password") ?? "");
  const token = process.env.ADMIN_API_TOKEN;
  const next = safeNextPath(form.get("next"));

  if (!token || password !== token) {
    const url = new URL("/login", request.url);
    url.searchParams.set("error", "1");
    url.searchParams.set("next", next);
    return NextResponse.redirect(url, 303);
  }

  const response = NextResponse.redirect(new URL(next, request.url), 303);
  response.cookies.set(ADMIN_SESSION_COOKIE, await adminSessionValue(token), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 8,
  });
  return response;
}
