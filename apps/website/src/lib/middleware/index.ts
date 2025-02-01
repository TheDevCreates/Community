import type { Session, SupabaseClient, User } from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";

import authHandler from "./auth";

const middlewares = [authHandler, bypassDevelopment];

export interface MiddlewareSupabaseClient {
  supabase: SupabaseClient;
  session: Session | null;
  user: User | null;
}

export default async function middleware(
  req: NextRequest,
  res: NextResponse,
  supabase: SupabaseClient
) {
  // fetch session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // fetch user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Extend supabase with session and user
  const data: MiddlewareSupabaseClient = {
    supabase,
    session,
    user,
  };

  // Load individuals middleware
  for (const func of middlewares) {
    const response = await func(req, res, data);
    if (response) return response;
  }

  return res;
}

async function bypassDevelopment(
  req: NextRequest,
  res: NextResponse,
  supabase: MiddlewareSupabaseClient
) {
  // Bypass /auth/popup if in development
  if (process.env.NODE_ENV === "development") {
    if (req.nextUrl.pathname === "/auth/popup") {
      const nextUrl = req.nextUrl.clone();
      nextUrl.pathname = "/auth/popup/login";
      return NextResponse.redirect(nextUrl);
    }
  }
}
