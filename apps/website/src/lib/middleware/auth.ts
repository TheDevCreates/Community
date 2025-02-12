import { type NextRequest, NextResponse } from "next/server";
import type { MiddlewareChild } from ".";

export default async function authHandler(
  req: NextRequest,
  res: NextResponse,
  supa_data: MiddlewareChild
) {
  const { nextauth } = supa_data;

  if (!nextauth) {
    // rewrite to /home if "/" is requested
    if (req.nextUrl.pathname === "/") {
      const nextUrl = req.nextUrl.clone();
      nextUrl.pathname = "/home";
      return NextResponse.rewrite(nextUrl);
    }
  }

  // Restrict logged in users to access auth pages
  if (
    nextauth &&
    (req.nextUrl.pathname == "/auth" ||
      req.nextUrl.pathname.startsWith("/auth/")) &&
    !req.nextUrl.pathname.startsWith("/auth/popup/github") &&
    req.nextUrl.pathname !== "/auth/popup/success" &&
    req.nextUrl.pathname !== "/auth/logout"
  ) {
    if (req.nextUrl.searchParams.get("required") === "true") {
      return NextResponse.next();
    }

    const nextUrl = req.nextUrl.clone();
    nextUrl.pathname = "/";
    return NextResponse.redirect(nextUrl);
  }
}
