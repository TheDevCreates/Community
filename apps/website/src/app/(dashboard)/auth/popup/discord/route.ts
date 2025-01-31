import { createClient } from "@/lib/supabase/server";

import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const auth = await supabase.auth.signInWithOAuth({
    provider: "discord",
    options: {
      redirectTo: `${process.env.ORIGIN_URL ?? "http://localhost:3000"}/auth/callback`,
      scopes: "guilds.join role_connections.write",
    },
  });

  return Response.redirect(auth.data.url!);
}
