import { Database } from "@devcreates/types/database";
import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import middleware from "@/lib/middleware";

import { auth } from "@/lib/auth";

export const createClient = async (request: NextRequest) => {
  // Create an unmodified response
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabase = createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          // Set the domain available to all devcreates.lol domain and subdomains
          cookiesToSet = cookiesToSet.map((cookie) => {
            cookie.options.domain = "devcreates.lol";
            return cookie;
          });

          cookiesToSet.forEach(({ name, value, options }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({
            request,
          });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Next Auth

  const nextauth = await auth();

  return middleware(request, supabaseResponse, supabase, nextauth);
};
