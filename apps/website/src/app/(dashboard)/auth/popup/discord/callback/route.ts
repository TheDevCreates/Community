import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { type CookieOptions } from "@supabase/ssr";

import { createClient } from "@/lib/supabase/server";
import { AuthTokenResponse, User } from "@supabase/supabase-js";
import { createServiceServer } from "@/lib/supabase/service-server";

// import Client from "@devcreaes/discord";

export const dynamic = "force-dynamic";

export async function GET(request: Request) {
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
    `${process.env.ORIGIN_URL ?? "http://localhost:3000"}`
  );
}
