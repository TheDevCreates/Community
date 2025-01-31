import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { type CookieOptions, createServerClient } from "@supabase/ssr";

import { createClient } from "@/lib/supabase/server";

// import Client from "@devcreaes/discord";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/auth/popup/success";

  if (!code)
    return Response.json({ success: false, message: "Code not found" });

  const cookieStore = cookies();
  const supabase = createClient(cookieStore);
  const session = await supabase.auth.exchangeCodeForSession(code);

  if (session.error)
    return Response.json({
      success: false,
      message: session.error,
      type: "session",
    });

  // debug
  if (process.env.NODE_ENV === "development") {
    const { data: session_data } = await supabase.auth.getSession();
    console.log(
      "New user logged in!\nToken: ",
      session_data.session?.provider_token,
      "\nRefresh Token: ",
      session_data.session?.refresh_token,
      "\n"
    );
  }

  // # DevCreates & DC Community haven't done inviting the bot to the server yet
  // try {
  //   const discordClient = new Client(process.env.DISCORD_TOKEN!);
  //
  //   await discordClient.joinUserToGuild(
  //     "1278856079144390798",
  //     session.data.user.user_metadata.provider_id,
  //     session.data.session.provider_token!
  //   );
  // } catch (e) {}

  return Response.redirect(
    `${process.env.ORIGIN_URL ?? "http://localhost:3000"}${next}`
  );
}
