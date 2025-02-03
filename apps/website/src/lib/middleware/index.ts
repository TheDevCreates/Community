import type {
  Session,
  SupabaseClient,
  User as SupabaseUser,
} from "@supabase/supabase-js";
import { type NextRequest, NextResponse } from "next/server";
import User from "@devcreates/types/schema/public/users";

import authHandler from "./auth";
import { ExtendedUser } from "../types/user";
import { Database } from "@devcreates/types/database";

const middlewares = [authHandler, bypassDevelopment];

export interface MiddlewareSupabaseClient {
  supabase: SupabaseClient;
  session: Session | null;
  user: SupabaseUser | null;
  account: User | null;
}

export default async function middleware(
  req: NextRequest,
  res: NextResponse,
  supabase: SupabaseClient<Database>
) {
  // fetch session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // fetch user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // fetch account
  const { data: account } = user
    ? await supabase.from("users").select("*").eq("id", user.id).single()
    : { data: null };

  // Extend supabase with session and user
  const data: MiddlewareSupabaseClient = {
    supabase,
    session,
    user,
    account,
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
