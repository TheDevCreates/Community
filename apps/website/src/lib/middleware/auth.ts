import { type NextRequest, NextResponse } from "next/server";
import type { MiddlewareSupabaseClient } from ".";

export default async function authHandler(
  req: NextRequest,
  res: NextResponse,
  supa_data: MiddlewareSupabaseClient
) {
  const { user, account } = supa_data;

  if (!user) {
    // rewrite to /home if "/" is requested
    if (req.nextUrl.pathname === "/") {
      const nextUrl = req.nextUrl.clone();
      nextUrl.pathname = "/home";
      return NextResponse.rewrite(nextUrl);
    }
  }

  // Restrict logged in users to access auth pages
  if (
    user &&
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

  // Restrict logged in users that already have a Github connection
  if (
    account?.github &&
    req.nextUrl.pathname.startsWith("/auth/popup/github")
  ) {
    const nextUrl = req.nextUrl.clone();
    nextUrl.pathname = "/";
    return NextResponse.redirect(nextUrl);
  }
}
