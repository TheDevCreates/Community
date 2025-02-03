import { nanoid } from "nanoid";

import { createClient } from "@/lib/supabase/server";
import { createServiceServer } from "@/lib/supabase/service-server";
import { Database } from "@devcreates/types/schema/private/database";

import { cookies } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);

  const githubLogin = `https://github.com/login/oauth/authorize?client_id=${process.env.GITHUB_CLIENT_ID}&redirect_uri=${encodeURI(`${process.env.ORIGIN_URL ?? "http://localhost:3000"}/auth/popup/github/callback`)}&scope=user`;

  return Response.redirect(githubLogin);
}
